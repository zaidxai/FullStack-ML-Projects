import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "zaidxai/spam-email-detector"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

model.eval()
# ======================
# PREDICTION FUNCTION
# ======================
def predict_message(message: str):

    inputs = tokenizer(
        message,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=256
    )

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)

    spam_prob = probs[0][0].item()
    ham_prob = probs[0][1].item()

    if spam_prob > ham_prob:
        return {
            "result": "Spam Message",
            "confidence": round(spam_prob * 100, 2)
        }
    else:
        return {
            "result": "Ham (Normal Message)",
            "confidence": round(ham_prob * 100, 2)
        }

# ======================
# TEST MODE
# ======================
if __name__ == "__main__":
    msg = input("Enter message: ")
    print(predict_message(msg))