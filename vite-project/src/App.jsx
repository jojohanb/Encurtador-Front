import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [legenda, setLegenda] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:3333/api";

    // Carrega os links do backend
  const fetchLinks = async () => {
    try {
      const res = await fetch(`${API_BASE}/links`);
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error("Erro ao buscar links:", err);
    }
  };

  // Executa ao carregar a página
  useEffect(() => {
    fetchLinks();
  }, []);

  // Cria uma nova URL encurtada
  const handleCreate = async () => {
    setLoading(true);
    setError("");

    if (!originalUrl || !legenda) {
      setError("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl, legenda }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao criar link");

      setLegenda("");
      setOriginalUrl("");
      fetchLinks(); // recarrega lista
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Copia a URL curta
  const copiarLink = (shortCode) => {
    const linkCurto = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(linkCurto);
    alert("Link copiado!");
  };

  return (
    <>
    <div>
      <h1>Encurtador de Links</h1>
      <p>Transforme links longos em URLs curtas e fáceis de compartilhar</p>
    </div>

    <div>
      <label htmlFor=""> Legenda do link *</label>
      <input type="text" value={legenda} placeholder='Ex:Meu portfólio, Site da empresa...' onChange={(e) => setLegenda(e.target.value)}/>
      <div>
        <label htmlFor="">URL para encurtar*</label>
        <input type="text" value={originalUrl} placeholder='https://exemplo.com/sua-url-muito-longa...' onChange={(e) => setOriginalUrl(e.target.value)} />
        <button onClick={handleCreate} disabled={loading}>{loading ? "Encurtando..." : "Encurtar"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      
    </div>
    <div>
      <h2>Meus Links</h2>
        {links.length === 0 ? (
          <p>Nenhum link criado ainda.</p>
        ) : (
          links.map((link) => (
            <div key={link.id} className="link-card">
              <h4>{link.legenda}</h4>
              <a href={link.originalUrl} target="_blank">
                {link.originalUrl}
              </a>
              <p>URL curta: {link.shortCode}</p>
              <p>
                Cliques: <strong>{link.clicks}</strong>
              </p>
              <button onClick={() => copiarLink(link.shortCode)}>Copiar</button>
            </div>
          ))
        )}

      {/* <div>
        <h2>Meus Links</h2>
        <p>link</p>
      </div>
      <div>
        <h4>Exame Seleção Técnico 2026</h4>
        <a href="https://utfpr-cm.notion.site/encurtador-url">https://utfpr-cm.notion.site/encurtador-url</a>
        <p>https://utfpr-cm.notion.site/encurtador-url</p>
        <p>Criado em 01/10/2025, 09:06</p>
      </div>
      <button>Copiar</button> */}
    </div>
    
    </>
  )
}

export default App
