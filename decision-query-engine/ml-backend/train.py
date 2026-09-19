# train.py
import joblib
import torch
import torch.nn as nn
import torch.optim as optim
from sentence_transformers import SentenceTransformer
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier

from dataset import TRAINING_DATA

# 1. Prepare Data
texts = [item[0] for item in TRAINING_DATA]
y_clarification = [item[1] for item in TRAINING_DATA]   # Binary
y_domain = [item[2] for item in TRAINING_DATA]          # Multi-class
y_complexity = [item[3] for item in TRAINING_DATA]      # Continuous float

print("Downloading and loading pre-trained embedding model (this takes a moment the first time)...")
# Load a completely free, pre-trained semantic embedding model
embedder = SentenceTransformer('all-MiniLM-L6-v2')

# 2. Feature Extraction (Create rich 384-dimensional vectors)
print("Generating contextual embeddings...")
# model.encode() converts the text list into a numpy array of vectors
X = embedder.encode(texts)

# -------------------------------------------------------------
# ALGORITHM 1: Logistic Regression (Clarification Triage)
# -------------------------------------------------------------
print("Training Logistic Regression...")
log_reg = LogisticRegression(solver='lbfgs', max_iter=500)
log_reg.fit(X, y_clarification)

# -------------------------------------------------------------
# ALGORITHM 2: Decision Tree Classifier (Domain Routing)
# -------------------------------------------------------------
print("Training Decision Tree...")
decision_tree = DecisionTreeClassifier(criterion='gini', max_depth=5, random_state=42)
decision_tree.fit(X, y_domain)

# -------------------------------------------------------------
# ALGORITHM 3: Linear Regression (Query Complexity Scoring)
# -------------------------------------------------------------
print("Training Linear Regression...")
linear_reg = LinearRegression()
linear_reg.fit(X, y_complexity)

# -------------------------------------------------------------
# ALGORITHM 4 & 5: Neural Network & Gradient Descent
# -------------------------------------------------------------
print("Training Neural Network...")
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

# Convert inputs to PyTorch Tensors
X_tensor = torch.tensor(X, dtype=torch.float32)
y_domain_tensor = torch.tensor(y_domain, dtype=torch.long)

# The input size is now exactly 384 because of the all-MiniLM-L6-v2 model
input_size = 384 
hidden_size = 64
num_classes = 4

nn_model = QueryNeuralNet(input_dim=input_size, hidden_dim=hidden_size, output_dim=num_classes)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(nn_model.parameters(), lr=0.01)

# Training loop using Gradient Descent / Backpropagation
epochs = 120
for epoch in range(epochs):
    optimizer.zero_grad()               # Reset gradients
    outputs = nn_model(X_tensor)        # Forward pass
    loss = criterion(outputs, y_domain_tensor)  # Compute loss
    loss.backward()                     # Backpropagation: Compute dL/dW
    optimizer.step()                    # Gradient Descent step: Update weights

print(f"Neural Network trained. Final Loss: {loss.item():.4f}")

# 3. Serialize Trained Models & Artifacts
joblib.dump(log_reg, 'logistic_regression.pkl')
joblib.dump(decision_tree, 'decision_tree.pkl')
joblib.dump(linear_reg, 'linear_regression.pkl')
torch.save(nn_model.state_dict(), 'neural_net.pt')

print("All ML models successfully trained and exported!")