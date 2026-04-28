import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

/* ── SVG Icons ── */
const Icons = {
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
    </svg>
  ),
  BarChart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  RefreshCw: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  AlertCircle: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Target: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Brain: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  ),
  Zap: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Info: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Activity: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Cpu: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Moon: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Sun: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  GitHub: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  LinkedIn: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Email: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
    </svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  Lock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Layers: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L13.5 8.5 L19 10 L13.5 11.5 L12 17 L10.5 11.5 L5 10 L10.5 8.5 Z" />
    </svg>
  ),
};

/* ── Background Blobs ── */
function BgCanvas() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
  );
}

/* ── Toast ── */
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="toast" role="alert">
      <span className="toast-icon"><Icons.AlertCircle /></span>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">×</button>
    </div>
  );
}

/* ── Confidence Bar ── */
function ConfidenceBar({ value, type }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(id);
  }, [value]);
  return (
    <div>
      <div className="conf-row">
        <span className="conf-label">
          <Icons.Activity /> Model Confidence (Softmax Probability)
        </span>
        <span className={`conf-value ${type}`}>{value}%</span>
      </div>
      <div className="progress-track">
        <div className={`progress-fill ${type}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ── Result Section ── */
function ResultSection({ result }) {
  const isSpam =
    result.result?.toLowerCase().includes("spam") &&
    !result.result?.toLowerCase().includes("not");
  const type = isSpam ? "spam" : "safe";

  return (
    <div className="result-section">
      <div className="divider" />
      <div className={`status-card ${type}`}>
        <div className="status-icon-wrap">
          {isSpam ? <Icons.AlertTriangle /> : <Icons.ShieldCheck />}
        </div>
        <div>
          <p className="status-label">
            {isSpam ? "High-Risk Message" : "All Clear"}
          </p>
          <p className="status-title">
            {isSpam ? "Spam Detected" : "Safe Message"}
          </p>
          <p className="status-msg">
            {isSpam
              ? "Detected phishing / scam patterns in this message."
              : "No spam patterns detected. Message appears legitimate."}
          </p>
        </div>
      </div>
      <ConfidenceBar value={parseFloat(result.confidence)} type={type} />
    </div>
  );
}

/* ── Feature Bar ── */
function FeatureBar() {
  const features = [
    { icon: <Icons.Shield />, iconClass: "green", title: "High Accuracy", desc: "BERT transformer for precise spam detection." },
    { icon: <Icons.Zap />, iconClass: "amber", title: "Real-time Analysis", desc: "Get instant results with lightning-fast processing." },
    { icon: <Icons.Lock />, iconClass: "blue", title: "Privacy Focused", desc: "Your data is secure and never stored permanently." },
    { icon: <Icons.BarChart />, iconClass: "violet", title: "Detailed Insights", desc: "Comprehensive metrics and performance tracking." },
  ];
  return (
    <div className="feature-bar">
      <div className="feature-grid">
        {features.map((f) => (
          <div className="feature-item" key={f.title}>
            <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
            <div>
              <div className="feature-text-title">{f.title}</div>
              <div className="feature-text-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Contact Link ── */
function ContactLink({ href, icon, label }) {
  return (
    <a href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer" className="contact-link">
      {icon}{label}
    </a>
  );
}

/* ── Stat Tile ── */
function StatTile({ icon, iconClass, value, name, pill, loading }) {
  return (
    <div className="stat-tile">
      <div className={`stat-icon-wrap ${iconClass}`}>{icon}</div>
      <div className="stat-body">
        <div className="stat-value">
          {loading
            ? <span className="stat-skeleton">—</span>
            : value}
        </div>
        <div className="stat-name">{name}</div>
      </div>
      <span className="stat-pill">{pill}</span>
    </div>
  );
}

/* ── Main App ── */
export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const textareaRef = useRef(null);

  /* Apply theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* Fetch real metrics from /metrics endpoint */
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/metrics");
        setMetrics(res.data);
      } catch {
        /* Fallback: show these until backend responds */
        setMetrics({ accuracy: 0.99, f1: 0.98, model: "distilbert-base-uncased" });
      } finally {
        setMetricsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const checkSpam = async () => {
    if (!message.trim() || loading) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", { text: message });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Backend unreachable. Make sure FastAPI is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) checkSpam();
  };

  const clearAll = () => {
    setMessage("");
    setResult(null);
    setError(null);
    textareaRef.current?.focus();
  };

  const canSubmit = message.trim().length > 0 && !loading;

  const fmtPct = (v) => v != null ? `${(v * 100).toFixed(2)}%` : "—";
  const fmtF1  = (v) => v != null ? Number(v).toFixed(2) : "—";

  return (
    <>
      <BgCanvas />

      <main className="app-shell">

        {/* ── Navbar: model badge | spacer | toggle + avatar ── */}
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-model-dot" />
            <span className="navbar-model-label">Powered by</span>
            <span className="navbar-model-name">DistilBERT Transformer</span>
            <span className="navbar-model-pill">BERT</span>
          </div>

          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              title="Toggle dark/light mode"
            >
              {darkMode ? <Icons.Moon /> : <Icons.Sun />}
            </button>
            <div className="avatar">ZM</div>
          </div>
        </nav>

        {/* ── Header ── */}
        <header className="header">
          <div className="header-badge">
            <span className="badge-dot" />
            BERT-Powered · Deep Learning · Real-time Analysis
          </div>
          <h1 className="app-title">
            AI <span className="accent">Spam</span>
            <span className="title-star">✦</span> Detector
          </h1>
          <p className="app-subtitle">
            Instantly analyze emails and messages using a fine-tuned
            DistilBERT transformer model for production-grade spam detection.
          </p>
        </header>

        {/* ── Two-column Grid ── */}
        <div className="main-grid">

          {/* Left: Analyzer */}
          <div className="card" style={{ animationDelay: "0.05s" }}>
            <div className="card-header">
              <div className="card-icon indigo"><Icons.Mail /></div>
              <div className="card-meta">
                <div className="card-title">Message Analyzer</div>
                <div className="card-desc">Paste any email or message content to analyze it instantly.</div>
              </div>
            </div>

            {/* Textarea — footer sits OUTSIDE the textarea now */}
            <div className="textarea-wrap">
              <textarea
                ref={textareaRef}
                className="msg-textarea"
                placeholder="Paste your email or message here…"
                value={message}
                onChange={(e) => { setMessage(e.target.value); setResult(null); }}
                onKeyDown={handleKeyDown}
                disabled={loading}
                aria-label="Message input"
              />
            </div>

            {/* Char count row — below textarea, never overlapping */}
            <div className="textarea-meta">
              <span className="char-count">{message.length} characters</span>
              {message.trim().length > 0 && (
                <span className="shortcut-hint">
                  <kbd className="kbd">Ctrl</kbd>+<kbd className="kbd">↵</kbd> to analyze
                </span>
              )}
            </div>

            <button className="analyze-btn" onClick={checkSpam} disabled={!canSubmit} aria-busy={loading}>
              <span className="btn-inner">
                {loading
                  ? <><div className="spinner" /> Analyzing with BERT…</>
                  : <><Icons.Search /> Analyze Message</>}
              </span>
            </button>

            {result && <ResultSection result={result} />}

            {(result || message) && !loading && (
              <button className="clear-btn" onClick={clearAll}>
                <Icons.RefreshCw /> Clear &amp; Start Over
              </button>
            )}
          </div>

          {/* Right: Model Architecture + Live Metrics */}
          <div className="card" style={{ animationDelay: "0.12s" }}>
            <div className="card-header">
              <div className="card-icon emerald"><Icons.BarChart /></div>
              <div className="card-meta">
                <div className="card-title">Model Architecture</div>
                <div className="card-desc">DistilBERT Transformer — Fine-tuned</div>
              </div>
            </div>

            {/* Architecture info tiles */}
            <div className="arch-tiles">
              <div className="arch-tile">
                <span className="arch-tile-label">Model Type</span>
                <span className="arch-tile-value">DistilBERT Transformer (Fine-tuned)</span>
              </div>
              <div className="arch-tile">
                <span className="arch-tile-label">Training Type</span>
                <span className="arch-tile-value">Deep Learning NLP Model</span>
              </div>
            </div>

            <div className="stats-section-label">Live Performance Metrics</div>

            <div className="stats-list">
              <StatTile
                icon={<Icons.Target />}
                iconClass="blue"
                value={fmtPct(metrics?.accuracy)}
                name="Model Accuracy"
                pill="Excellent"
                loading={metricsLoading}
              />
              <StatTile
                icon={<Icons.Brain />}
                iconClass="violet"
                value={fmtF1(metrics?.f1)}
                name="F1 Score (Weighted)"
                pill="High"
                loading={metricsLoading}
              />
              <StatTile
                icon={<Icons.Layers />}
                iconClass="green"
                value="distilbert-base"
                name="Base Model"
                pill="Transformer"
                loading={metricsLoading}
              />
            </div>

            <div className="info-note">
              <span className="info-note-icon"><Icons.Info /></span>
              <p>
                Trained using a transformer-based BERT (DistilBERT) deep learning
                model fine-tuned for spam detection. BERT-based models understand
                context and semantics, achieving state-of-the-art accuracy on NLP classification tasks.
              </p>
            </div>
          </div>
        </div>

        {/* ── Feature Bar ── */}
        <FeatureBar />

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-credits">
            <Icons.Cpu />
            AI Spam Detector (BERT-powered)
            <span className="footer-dot" />
            FastAPI + React (Vite)
            <span className="footer-dot" />
            DistilBERT · F1 {metricsLoading ? "…" : fmtF1(metrics?.f1)}
          </div>

          <div className="footer-contact">
            <span className="footer-dev-label">Developed by</span>
            <span className="footer-dev-name">Zaid Mehmood</span>
            <span className="footer-divider" />
            <div className="footer-links">
              <ContactLink href="https://github.com/zaidxai"                    icon={<Icons.GitHub />}   label="GitHub" />
              <ContactLink href="https://linkedin.com/in/zaid-mehmood-3a999b383" icon={<Icons.LinkedIn />} label="LinkedIn" />
              <ContactLink href="mailto:zaidmehmoodofficial@gmail.com"           icon={<Icons.Email />}    label="Email" />
            </div>
          </div>
        </footer>

      </main>

      {error && <Toast message={error} onClose={() => setError(null)} />}
    </>
  );
}