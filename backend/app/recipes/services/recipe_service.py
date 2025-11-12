from recipe_scrapers import scrape_me

# Factory Pattern? 

class RecipeFromURL:
    def __init__(self, url: str):
        self.scraped_data = scrape_me(url)

    def __str__(self):
        return f"Title: {self.scraped_data.title()}\nIngredients: {self.scraped_data.ingredients()}\nInstructions: {self.scraped_data.instructions()}\nAuthor: {self.scraped_data.author()}\nTotal Time: {self.scraped_data.total_time()}\nYields: {self.scraped_data.yields()}\nNutrients: {self.scraped_data.nutrients()}\nCuisine: {self.scraped_data.cuisine()}\nCategory: {self.scraped_data.category()}\nKeywords: {self.scraped_data.keywords()}\nDescription: {self.scraped_data.description()}"
