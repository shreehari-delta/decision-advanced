# app.py
import os
import json
import joblib
import torch
import torch.nn as nn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
from google import genai
from google.genai import types # type: ignore

from dataset import DOMAIN_MAP

# 1. Environment & API Initialization
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("CRITICAL ERROR: GEMINI_API_KEY is missing from your .env file!")

client = genai.Client(api_key=api_key)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "online", "message": "Decision Hybrid AI Engine is running"}

# 2. PyTorch Architecture Definition
class QueryNeuralNet(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(QueryNeuralNet, self).__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        return out

# 3. Model Loading
print("Loading semantic embedder...")
embedder = SentenceTransformer('all-MiniLM-L6-v2')

print("Loading ML models...")
log_reg = joblib.load('logistic_regression.pkl')
linear_reg = joblib.load('linear_regression.pkl')

print("Loading PyTorch Neural Network...")
input_size = 384
hidden_size = 64
num_classes = 4

nn_model = QueryNeuralNet(input_dim=input_size, hidden_dim=hidden_size, output_dim=num_classes)
nn_model.load_state_dict(torch.load('neural_net.pt', weights_only=True))
nn_model.eval()

# 4. Request Schemas
class QueryRequest(BaseModel):
    query: str

class AnalysisRequest(BaseModel):
    query: str
    answers: dict = {}

# 5. Endpoints
@app.post("/api/triage")
async def triage_query(request: QueryRequest):
    vector = embedder.encode([request.query])
    
    # Logistic Regression classifies ambiguity (0 = factual/direct, 1 = ambiguous/needs clarification)
    needs_clarification_pred = log_reg.predict(vector)[0]
    needs_clarification = bool(needs_clarification_pred == 1)

    questions = []
    if needs_clarification:
        prompt = f"""
        The user submitted a thoughtful query requiring exploration: "{request.query}".
        Provide exactly 2 short, open reflection questions to help frame their thoughts.
        Return strictly a JSON array of strings: ["Question 1?", "Question 2?"]
        """
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        try:
            questions = json.loads(response.text)
        except Exception:
            questions = [
                "What specific aspect of this situation matters most to you right now?",
                "What core outcome or clarity are you seeking from this exploration?"
            ]

    return {
        "needs_clarification": needs_clarification,
        "questions": questions
    }

@app.post("/api/analyze")
async def analyze_query(request: AnalysisRequest):
    # Vectorize input query
    vector = embedder.encode([request.query])
    
    # -------------------------------------------------------------------
    # ROUTING VIA PYTORCH NEURAL NETWORK
    # Evaluates holistic 384-dimensional dense semantic weights
    # -------------------------------------------------------------------
    with torch.no_grad():
        tensor_input = torch.tensor(vector, dtype=torch.float32)
        logits = nn_model(tensor_input)
        predicted_class_idx = int(torch.argmax(logits, dim=1).item())
        
    domain_str = DOMAIN_MAP.get(predicted_class_idx, "reflective")
    
    # Complexity prediction via Linear Regression
    complexity_score = linear_reg.predict(vector)[0]
    complexity_formatted = round(max(0.0, min(10.0, float(complexity_score))), 1)

    prompt = f"""
    User query: "{request.query}"
    Context/Clarifications: {json.dumps(request.answers)}
    
    Domain Classification: {domain_str.upper()} (determined by PyTorch Neural Network)
    Estimated Complexity: {complexity_formatted}/10.0 (calculated via Linear Regression)
    
    Synthesize an analysis tailored specifically to the {domain_str.upper()} domain.
    If reflective: focus on philosophical nuance, psychological tradeoffs, and personal perspective. Do NOT frame it around monetary or business metrics unless requested.
    
    Return strictly a JSON object with this structure:
    {{
      "domain": "{domain_str}",
      "title": "Short Descriptive Title",
      "description": "Comprehensive perspective and balanced trade-off analysis...",
      "dataPoints": ["Perspective/Trade-off 1", "Perspective/Trade-off 2"]
    }}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        analysis_data = json.loads(response.text)
        analysis_data["dataPoints"].append(f"Model Complexity Score: {complexity_formatted}/10.0")
        analysis_data["dataPoints"].append(f"Classified by PyTorch Neural Network ({domain_str.upper()})")
        return analysis_data
        
    except Exception as e:
        print("Generation error:", e)
        return {
            "domain": domain_str,
            "title": "Analysis Result",
            "description": "Analysis generated via local ML classification.",
            "dataPoints": [
                f"Model Complexity Score: {complexity_formatted}/10.0",
                f"Classified by PyTorch Neural Network ({domain_str.upper()})"
            ]
        }