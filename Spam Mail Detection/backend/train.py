import os
import pandas as pd
from sklearn.model_selection import train_test_split
from datasets import Dataset

from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments,
    DataCollatorWithPadding
)

# ======================
# LOAD DATA
# ======================
current_dir = os.path.dirname(__file__)
file_path = os.path.join(current_dir, "mail_data.csv")

df = pd.read_csv(file_path).fillna("")
df["label"] = df["Category"].map({"spam": 0, "ham": 1})

# ======================
# SPLIT DATA
# ======================
train_texts, test_texts, train_labels, test_labels = train_test_split(
    df["Message"],
    df["label"],
    test_size=0.2,
    stratify=df["label"],
    random_state=42
)
# ======================
# TOKENIZER
# ======================
model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)

def tokenize(batch):
    return tokenizer(
        batch["text"],
        truncation=True,
        max_length=256
    )

train_dataset = Dataset.from_dict({
    "text": train_texts.tolist(),
    "label": train_labels.tolist()
}).map(tokenize, batched=True)

test_dataset = Dataset.from_dict({
    "text": test_texts.tolist(),
    "label": test_labels.tolist()
}).map(tokenize, batched=True)

# IMPORTANT: format dataset
train_dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])
test_dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])

# ======================
# MODEL
# ======================
model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=2
)

# ======================
# FIX FOR YOUR ERROR (VERY IMPORTANT)
# ======================
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# ======================
# TRAINING CONFIG
# ======================
training_args = TrainingArguments(
    output_dir="./bert_model",
    num_train_epochs=2,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    save_strategy="epoch",
    logging_dir="./logs",
    report_to="none"   # disables extra logging warnings
)

# ======================
# TRAINER
# ======================
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    data_collator=data_collator
)

trainer.train()
# ======================
# SAVE MODEL
# ======================
model.save_pretrained(os.path.join(current_dir, "bert_model"))
tokenizer.save_pretrained(os.path.join(current_dir, "bert_model"))

print("BERT model trained successfully!")