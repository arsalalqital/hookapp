import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState(""); // Untuk input pencarian
  const [articles, setArticles] = useState([]); // Untuk menyimpan data artikel
  const [loading, setLoading] = useState(false); // Status loading
  const [error, setError] = useState(null); // Status error

  const API_KEY = "https://newsapi.org/v2/everything?apiKey=5d8c9716e2b648958bafb593a1a90ef2&q=${this.state.searchTerm}"; // Ganti dengan API key Anda
  const API_URL = `https://newsapi.org/v2/everything`;

  // Fetch data dari API saat tombol Search diklik
  const fetchArticles = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&pageSize=10`
      );

      if (!response.ok) {
        throw new Error("Gagal memuat data, periksa API key atau koneksi Anda.");
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>News Search App</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari berita..."
          style={{ padding: "10px", marginRight: "10px", width: "300px" }}
        />
        <button onClick={fetchArticles} style={{ padding: "10px" }}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </td>
              <td>{article.description || "No description available"}</td>
              <td>{article.source.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
