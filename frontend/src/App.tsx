import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import apiClient from "./services/apiClient";
import { useState } from "react";

function App() {
  const [recipeData, setRecipeData] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const importRecipe = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await apiClient.importRecipe(url);
      setRecipeData(response.recipe as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import recipe");
      setRecipeData("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Recipe App</h1>
      <div className="card">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter recipe URL..."
          disabled={loading}
        />
        <button onClick={importRecipe} disabled={loading}>
          {loading ? "Importing..." : "Import Recipe"}
        </button>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {recipeData && (
          <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
            {recipeData}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
