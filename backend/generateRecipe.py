from transformers import FlaxAutoModelForSeq2SeqLM
from transformers import AutoTokenizer

class GenerateRecipe:
    def __init__(self):
        self.MODEL_NAME_OR_PATH = "flax-community/t5-recipe-generation"
        self.tokenizer = AutoTokenizer.from_pretrained(self.MODEL_NAME_OR_PATH, use_fast=True)
        self.model = FlaxAutoModelForSeq2SeqLM.from_pretrained(self.MODEL_NAME_OR_PATH)
        self.prefix = "items: "

        self.generation_kwargs = {
            "max_length": 512,
            "min_length": 64,
            "no_repeat_ngram_size": 3,
            "do_sample": True,
            "top_k": 60,
            "top_p": 0.95
        }

        self.special_tokens = self.tokenizer.all_special_tokens

        self.tokens_map = {
            "<sep>": "--",
            "<section>": "\n"
        }

        self.generated_recipe = None

    def skip_special_tokens(self, text, special_tokens):
        for token in special_tokens:
            text = text.replace(token, "")

        return text

    def target_postprocessing(self, texts, special_tokens):
        if not isinstance(texts, list):
            texts = [texts]
        
        new_texts = []
        for text in texts:
            text = self.skip_special_tokens(text, special_tokens)

            for k, v in self.tokens_map.items():
                text = text.replace(k, v)

            new_texts.append(text)

        return new_texts

    def generation_function(self, texts):
        _inputs = texts if isinstance(texts, list) else [texts]
        inputs = [self.prefix + inp for inp in _inputs]
        inputs = self.tokenizer(
            inputs, 
            max_length=256, 
            padding="max_length", 
            truncation=True, 
            return_tensors="jax"
        )

        input_ids = inputs.input_ids
        attention_mask = inputs.attention_mask

        output_ids = self.model.generate(
            input_ids=input_ids, 
            attention_mask=attention_mask,
            **self.generation_kwargs
        )
        generated = output_ids.sequences
        generated_recipe = self.target_postprocessing(
            self.tokenizer.batch_decode(generated, skip_special_tokens=False),
            self.special_tokens
        )

        self.generated_recipe = generated_recipe
        self.generated_recipe = self.parse_generated_recipe()

        return self.generated_recipe
    
    def parse_generated_recipe(self):
        recipes = []
        recipe = {}

        for text in self.generated_recipe:
            title_idx = text.find("title:")
            ingredients_idx = text.find("ingredients:")
            directions_idx = text.find("directions:")

            if title_idx != -1:
                if ingredients_idx != -1:
                    title = text[title_idx + len("title:") : ingredients_idx].strip()
                    recipe["title"] = title

            if ingredients_idx != -1:
                if directions_idx != -1:
                    ingredients = text[ingredients_idx + len("ingredients:") : directions_idx].strip()
                    recipe["ingredients"] = [ingredient.strip() for ingredient in ingredients.split("--")]

            if directions_idx != -1:
                    directions = text[directions_idx + len("directions:") : -1].strip()
                    recipe["directions"] = [direction.strip() for direction in directions.split("--")]

            recipes.append(recipe)

        # print(recipes)
        return recipes

    def print_recipe(self):
        for text in self.generated_recipe:
            sections = text.split("\n")
            for section in sections:
                section = section.strip()
                if section.startswith("title:"):
                    section = section.replace("title:", "")
                    headline = "TITLE"
                elif section.startswith("ingredients:"):
                    section = section.replace("ingredients:", "")
                    headline = "INGREDIENTS"
                elif section.startswith("directions:"):
                    section = section.replace("directions:", "")
                    headline = "DIRECTIONS"
                
                if headline == "TITLE":
                    print(f"[{headline}]: {section.strip().capitalize()}")
                else:
                    section_info = [f"  - {i+1}: {info.strip().capitalize()}" for i, info in enumerate(section.split("--"))]
                    print(f"[{headline}]:")
                    print("\n".join(section_info))

            print("-" * 130)