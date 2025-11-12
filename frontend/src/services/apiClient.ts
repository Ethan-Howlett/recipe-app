const apiClient = {
  importRecipe: async (url: string) => {
    // Use query parameter instead of path parameter to handle full URLs
    const encodedUrl = encodeURIComponent(url);
    const response = await fetch(
      `http://localhost:8000/import-recipe?url=${encodedUrl}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};

export default apiClient;
