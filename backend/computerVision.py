# upload image to s3 bucket (upload-ingredients route)
# pull from s3 (might not beed to pull image from s3)
# run image through detr-restnet-50 computer vision model
# add detected objects with confidence > 0.9 to array
# pass array to InstaFood named entity recognition model (NLP) to extract only foods
# this becomes the ingredients that are passed to generate-recipe endpoint

# DETR (End-to-End Object Detection) model with ResNet-50 backbone Imports
from transformers import DetrImageProcessor, DetrForObjectDetection
import torch
from PIL import Image
import requests

# InstaFoodRoBERTa-NER Imports
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

class ComputerVision:
    def __init__(self):
        self.detr_processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50", revision="no_timm")
        self.detr_model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50", revision="no_timm")

        self.ner_tokenizer = AutoTokenizer.from_pretrained("Dizex/InstaFoodRoBERTa-NER")
        self.ner_model = AutoModelForTokenClassification.from_pretrained("Dizex/InstaFoodRoBERTa-NER")

    def detr(self, image):
        detected_objects = []

        inputs = self.detr_processor(images=image, return_tensors="pt")
        outputs = self.detr_model(**inputs)

        target_sizes = torch.tensor([image.size[::-1]])
        results = self.detr_processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.9)[0]

        for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
            box = [round(i, 2) for i in box.tolist()]

            detected_object = self.detr_model.config.id2label[label.item()]
            confidence = round(score.item(), 3)

            if confidence > 0.9 and detected_object not in detected_objects:
                detected_objects.append(detected_object)

        detected_objects = (", ").join(detected_objects)
        detected_objects = "I've got " + detected_objects + " in the fridge."
        # detected_objects = "I've got oranges, table, broccoli, forks, strawberries, chair in the fridge."
        return detected_objects
    
    def ner(self, text):
        pipe = pipeline("ner", model=self.ner_model, tokenizer=self.ner_tokenizer)

        ner_entity_results = pipe(text, aggregation_strategy="simple")

        detected_ingredients = self.convert_entities_to_list(text, ner_entity_results)

        return detected_ingredients

    def convert_entities_to_list(self, text, entities: list[dict]) -> list[str]:
            ents = []
            for ent in entities:
                e = {"start": ent["start"], "end": ent["end"], "label": ent["entity_group"]}
                if ents and -1 <= ent["start"] - ents[-1]["end"] <= 1 and ents[-1]["label"] == e["label"]:
                    ents[-1]["end"] = e["end"]
                    continue
                ents.append(e)

            ingredients = [text[e["start"]:e["end"]] for e in ents]

            return ingredients

# if __name__ == '__main__':
#     cv = ComputerVision()
#     detected_objects = cv.detr()
#     detected_ingredients = cv.ner(detected_objects)
#     print(f"detected the following ingredients: {detected_ingredients}")