from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

tokenizer = AutoTokenizer.from_pretrained("Dizex/InstaFoodRoBERTa-NER")
model = AutoModelForTokenClassification.from_pretrained("Dizex/InstaFoodRoBERTa-NER")

pipe = pipeline("ner", model=model, tokenizer=tokenizer)
# example = "Today's meal: Fresh olive poké bowl topped with chia seeds. Very delicious!"
example = "I've got yogurt, blueberries, cucumbers, chair, bowl, strawberries, table, oranges, forks in the fridge."

ner_entity_results = pipe(example, aggregation_strategy="simple")
print(ner_entity_results)

def convert_entities_to_list(text, entities: list[dict]) -> list[str]:
        ents = []
        for ent in entities:
            e = {"start": ent["start"], "end": ent["end"], "label": ent["entity_group"]}
            if ents and -1 <= ent["start"] - ents[-1]["end"] <= 1 and ents[-1]["label"] == e["label"]:
                ents[-1]["end"] = e["end"]
                continue
            ents.append(e)

        return [text[e["start"]:e["end"]] for e in ents]

print(convert_entities_to_list(example, ner_entity_results))