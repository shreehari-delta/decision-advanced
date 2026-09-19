# Decision Advanced - Hybrid AI Query Engine

A full-stack, hybrid artificial intelligence architecture that intelligently categorizes, evaluates, and synthesizes complex user queries.

Unlike standard LLM wrappers, this engine utilizes a custom-trained local Machine Learning pipeline to pre-process and route queries before delegating the final synthesis to Google's Gemini 2.5 Flash. This hybrid approach ensures deterministic domain boundaries, prevents LLM hallucinations, and drastically improves response formatting based on query intent.

## ✨ Key Features

- **Semantic Vectorization**: Converts user queries into rich 384-dimensional embeddings using local, free Hugging Face transformers.
- **Intelligent Clarification Triage**: A Logistic Regression model detects ambiguous queries and prompts the LLM to generate targeted follow-up questions instead of guessing.
- **PyTorch Domain Routing**: A custom Neural Network evaluates the dense semantic vectors to strictly classify queries into one of four distinct domains (Knowledge, Reflective, Quantitative, Health).
- **Complexity Scoring**: A Linear Regression model calculates a structural depth score (0.0 to 10.0) to dynamically adjust the tone and detail of the final output.
- **Animated UI**: A React/Vite frontend featuring a responsive "Reasoning Orb" that visualizes the AI's internal state machine during processing.

## 🛠️ Tech Stack

### Frontend
- React 18, Vite, TypeScript
- Tailwind CSS (Styling & Animations)

### Backend & Machine Learning
- Python 3 & FastAPI
- PyTorch (Neural Network classification)
- Scikit-learn (Logistic & Linear Regression)
- Sentence-Transformers (`all-MiniLM-L6-v2`)
- Google GenAI SDK (Gemini 2.5 Flash)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- A Gemini API Key from Google AI Studio
