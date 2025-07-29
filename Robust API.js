class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
  }

  async request(endpoint, options = {}) {
    const cacheKey = JSON.stringify({ endpoint, options });
    
    try {
      // Cache-first strategy
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
      });

      if (!response.ok) {
        throw new ApiError(
          endpoint, 
          response.status, 
          await response.text()
        );
      }

      const data = await response.json();
      this.cache.set(cacheKey, data); // Cache response
      return data;

    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`);
      } else {
        console.error(`Network Error: ${error.message}`);
      }
      throw error;
    }
  }
}
