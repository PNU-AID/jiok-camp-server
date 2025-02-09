import torch
import re
from transformers import BertTokenizer, BertForSequenceClassification
import lightning as L
from transformers import AdamW

# 클린업 함수

class ReviewModel(L.LightningModule):
    def __init__(self, model_name, lr=2e-5, num_labels=5):
        super().__init__()
        self.model = BertForSequenceClassification.from_pretrained(model_name, num_labels=num_labels)
        self.lr = lr

    def forward(self, input_ids, attention_mask, labels=None):
        output = self.model(input_ids, attention_mask=attention_mask, labels=labels)
        return output

    def training_step(self, batch, batch_idx):
        output = self.forward(batch['input_ids'], batch['attention_mask'], labels=batch['labels'])
        loss = output.loss
        self.log('train_loss', loss)
        return loss

    def validation_step(self, batch, batch_idx):
        output = self.forward(batch['input_ids'], batch['attention_mask'], labels=batch['labels'])
        loss = output.loss
        self.log('val_loss', loss)
        return loss

    def configure_optimizers(self):
        optimizer = AdamW(self.parameters(), lr=self.lr)
        return optimizer

# 모델 및 토크나이저 초기화 (모델은 한 번만 로드됨)
class ReviewService:
    def __init__(self, model_path = './model.pth', model_name='bert-base-uncased'):

        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = ReviewModel(model_name)
        self.model.load_state_dict(torch.load(model_path))
        self.model.eval()  # 평가 모드로 설정

    def predict_review_score(self, text):
        def clean_corrupted(text):
            return re.sub(r'[^\x00-\x7F]+', '', text)
        # 텍스트 클린업
        cleaned_text = clean_corrupted(text)

        # 입력 텍스트 토큰화
        encoding = self.tokenizer.encode_plus(
            cleaned_text,
            add_special_tokens=True,
            max_length=128,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )

        # 모델 예측 수행
        with torch.no_grad():
            input_ids = encoding['input_ids']
            attention_mask = encoding['attention_mask']
            output = self.model(input_ids=input_ids, attention_mask=attention_mask)

        # 로짓을 점수(1~5)로 변환
        logits = output.logits
        predicted_score = torch.argmax(logits, dim=1).item() + 1  # 0부터 시작하므로 1을 더함
        return predicted_score



# 예제 사용
if __name__ == "__main__":
    # 서비스 초기화
    review_service = ReviewService()
    while(True):
        text = input("Enter review text: ")
        if text == "stop":
            exit()
        predicted_score = review_service.predict_review_score(text)
        print(f"Predicted Score: {predicted_score}")
  