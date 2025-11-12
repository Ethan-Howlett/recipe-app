import uvicorn
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from app.services.recipe_service import RecipeFromURL

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Recipe API is running", "endpoints": ["/import-recipe"]}

@app.get("/import-recipe")
def import_recipe(url: str = Query(..., description="The URL of the recipe to import")):
    recipe = RecipeFromURL(url)
    return {"recipe": str(recipe)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)