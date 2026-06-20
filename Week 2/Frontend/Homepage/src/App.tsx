import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {

  const [showCounter, setShowCounter] = useState(false);
  const [count, setCount] = useState(10000);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showNotification, setShowNotification] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadState, setUploadState] = useState<"idle"|"analyzing"|"done">("idle");
  const [openFAQ, setOpenFAQ] = useState<number|null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showCounter) return;
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 800);
    return () => clearInterval(interval);
  }, [showCounter]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setUploadState("analyzing");
    setTimeout(() => setUploadState("done"), 2500);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    setUploadState("analyzing");
    setTimeout(() => setUploadState("done"), 2500);
  };

  const faqs = [
    { q: "Is Akshar AI FDA approved?", a: "Akshar AI is currently CE marked and HIPAA compliant. FDA 510(k) clearance is in progress. It is intended as a clinical decision support tool and does not replace a radiologist's diagnosis." },
    { q: "What image formats are supported?", a: "We support DICOM (.dcm), JPEG, PNG, and WebP formats. DICOM is recommended for best accuracy as it preserves full resolution metadata." },
    { q: "How is my patient data stored?", a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are ISO 27001 certified. Patient data is never used to train our models without explicit consent." },
    { q: "How accurate is the AI detection?", a: "Our model achieves 95.3% sensitivity and 93.1% specificity validated on a dataset of 10,000+ real chest X-rays across multiple hospital systems." },
    { q: "Can I integrate Akshar AI with my hospital's EHR?", a: "Yes — Hospital plan users get full HL7 FHIR and REST API access for EHR integration. Our team provides onboarding support for major systems including Epic, Cerner, and Meditech." },
  ];

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-section">
          <div className="logo">🫁</div>
          <h2>AKSHAR AI</h2>
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Features</a>
          <a href="#">About Us</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowPricing(!showPricing); setShowFAQ(false); setShowReport(false); setShowUpload(false); }}>Pricing</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowFAQ(!showFAQ); setShowPricing(false); setShowReport(false); setShowUpload(false); }}>FAQ</a>
        </div>

        <div className="nav-buttons">
          <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="EN">🌐 EN</option>
            <option value="HI">🌐 HI</option>
            <option value="GU">🌐 GU</option>
            <option value="TA">🌐 TA</option>
            <option value="AR">🌐 AR</option>
          </select>

          <button className="dark-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button className="subscription-btn">Subscription</button>

          <div className="settings-wrapper">
            <button className="setting-btn" onClick={() => setShowNotification(false)}>⚙ Settings</button>
            {showNotification && <div className="notif-badge">NEW</div>}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <h1>AI Powered</h1>
          <h1>Pneumonia Detection</h1>

          <p className="audience-tag">
            Built for radiologists, pulmonologists &amp; diagnostic labs
          </p>

          <p>Upload chest X-ray images, analyze them using Artificial Intelligence, and receive instant results.</p>

          <div className="trust-bar">
            <div className="trust-stat">
              <span className="trust-number">95.3%</span>
              <span className="trust-label">Sensitivity</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-stat">
              <span className="trust-number">10K+</span>
              <span className="trust-label">X-rays analyzed</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-stat">
              <span className="trust-number">HIPAA</span>
              <span className="trust-label">Compliant</span>
            </div>
          </div>

          <div className="hero-cta">
            <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
              <button className="trial-btn" onClick={() => { setShowUpload(true); setShowPricing(false); setShowFAQ(false); setShowReport(false); }}>
                🔬 Try Demo Upload
              </button>
              <button className="report-preview-btn" onClick={() => { setShowReport(true); setShowPricing(false); setShowFAQ(false); setShowUpload(false); }}>
                📄 Sample Report
              </button>
            </div>
            thi
          </div>
        </div>

        {/* LOGIN FORM — unchanged */}
        <div className="hero-right">
          <div className="login-box">
            <h2>Welcome Back</h2>
            <p className="login-subtitle">Access your reports and analysis securely.</p>
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot Password?</a>
            <button>Login</button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="benefit-card">
          <h3>⚡ Fast Analysis</h3>
          <p>Results delivered in <strong>under 8 seconds</strong> — faster than a radiologist's first read.</p>
        </div>
        <div className="benefit-card">
          <h3>🎯 High Accuracy</h3>
          <p><strong>95.3% sensitivity</strong> validated across 10,000+ real chest X-rays.</p>
        </div>
        <div className="benefit-card">
          <h3>🔒 Secure Platform</h3>
          <p>HIPAA compliant, end-to-end encrypted. <strong>ISO 27001</strong> certified infrastructure.</p>
        </div>
        <div className="benefit-card">
          <h3>📄 Detailed Reports</h3>
          <p>Structured PDF reports with confidence scores, heatmaps, and clinical notes.</p>
        </div>
      </section>

      {/* Workflow */}
      <section className="workflow-section">
        <div className="workflow-cards">
          <div className="feature-card">
            <h3>👤 Create Account</h3>
            <p>Register securely and access the platform.</p>
          </div>
          <div className="arrow">→</div>
          <div className="feature-card">
            <h3>📤 Upload X-Ray</h3>
            <p>Upload chest X-ray images for analysis.</p>
          </div>
          <div className="arrow">→</div>
          <div className="feature-card">
            <h3>🤖 AI Analysis</h3>
            <p>Our AI model processes the image instantly.</p>
          </div>
          <div className="arrow">→</div>
          <div className="feature-card">
            <h3>📄 Receive Report</h3>
            <p>View and download detailed diagnosis results.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <h2>AKSHAR AI</h2>
          <p className="footer-tagline">AI-powered pneumonia detection for clinicians.</p>
        </div>
        <div className="footer-center">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
          <a href="#">Help Center</a>
        </div>
        <div className="footer-right">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">YouTube</a>
            <a href="#" className="social-link">Facebook</a>
          </div>
        </div>
      </footer>

      {/* ── FLOATING PANELS ── */}

      {/* Pricing Panel */}
      {showPricing && (
        <div className="float-panel">
          <div className="float-panel-header">
            <div>
              <h2>Simple, Transparent Pricing</h2>
              <p>Choose the plan that fits your practice</p>
            </div>
            <button className="panel-close" onClick={() => setShowPricing(false)}>✕</button>
          </div>
          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-tier">Free</div>
              <div className="pricing-price">₹0<span>/month</span></div>
              <ul className="pricing-features">
                <li>✓ 10 X-ray analyses/month</li>
                <li>✓ Basic PDF report</li>
                <li>✓ Email support</li>
                <li className="disabled">✗ Heatmap overlay</li>
                <li className="disabled">✗ API access</li>
              </ul>
              <button className="pricing-btn-outline">Get Started</button>
            </div>
            <div className="pricing-card pricing-card-featured">
              <div className="pricing-popular">Most Popular</div>
              <div className="pricing-tier">Pro</div>
              <div className="pricing-price">₹2,999<span>/month</span></div>
              <ul className="pricing-features">
                <li>✓ 500 X-ray analyses/month</li>
                <li>✓ Detailed PDF + heatmap</li>
                <li>✓ Priority support</li>
                <li>✓ Heatmap overlay</li>
                <li className="disabled">✗ API access</li>
              </ul>
              <button className="pricing-btn">Start Free Trial</button>
            </div>
            <div className="pricing-card">
              <div className="pricing-tier">Hospital</div>
              <div className="pricing-price">Custom<span> pricing</span></div>
              <ul className="pricing-features">
                <li>✓ Unlimited analyses</li>
                <li>✓ Full report suite</li>
                <li>✓ Dedicated support</li>
                <li>✓ Heatmap overlay</li>
                <li>✓ API access + EHR integration</li>
              </ul>
              <button className="pricing-btn-outline">Contact Us</button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Panel */}
      {showFAQ && (
        <div className="float-panel">
          <div className="float-panel-header">
            <div>
              <h2>Frequently Asked Questions</h2>
              <p>Everything clinicians ask before signing up</p>
            </div>
            <button className="panel-close" onClick={() => setShowFAQ(false)}>✕</button>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFAQ === i ? "open" : ""}`} onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-arrow">{openFAQ === i ? "▲" : "▼"}</span>
                </div>
                {openFAQ === i && <div className="faq-answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Report Panel */}
      {showReport && (
        <div className="float-panel">
          <div className="float-panel-header">
            <div>
              <h2>Sample Analysis Report</h2>
              <p>This is what a real Akshar AI report looks like</p>
            </div>
            <button className="panel-close" onClick={() => setShowReport(false)}>✕</button>
          </div>
          <div className="report-card">
            <div className="report-top">
              <div className="report-meta">
                <span className="report-id">Report #AK-20240612-0847</span>
                <span className="report-date">June 12, 2024 · 09:14 AM</span>
              </div>
              <span className="report-badge-positive">⚠ Pneumonia Detected</span>
            </div>
            <div className="report-body">
              <div className="report-xray-box">
                <div className="report-xray-placeholder">
                  🫁
                  <span>Chest X-Ray</span>
                  <div className="heatmap-overlay">🔴 High probability zone</div>
                </div>
              </div>
              <div className="report-details">
                <div className="report-row">
                  <span className="report-label">Confidence Score</span>
                  <div className="report-bar-wrap">
                    <div className="report-bar" style={{ width:"91%" }} />
                    <span>91%</span>
                  </div>
                </div>
                <div className="report-row">
                  <span className="report-label">Affected Region</span>
                  <span className="report-value">Right lower lobe</span>
                </div>
                <div className="report-row">
                  <span className="report-label">Severity</span>
                  <span className="report-value report-severity">Moderate</span>
                </div>
                <div className="report-row">
                  <span className="report-label">Model Version</span>
                  <span className="report-value">AksharNet v2.1</span>
                </div>
                <div className="report-note">
                  ⚠ This report is a clinical decision support tool. Final diagnosis must be confirmed by a licensed radiologist.
                </div>
                <button className="pricing-btn" style={{ marginTop:"12px" }}>⬇ Download PDF Report</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* X-Ray Upload Demo Panel */}
      {showUpload && (
        <div className="float-panel">
          <div className="float-panel-header">
            <div>
              <h2>Try a Demo Upload</h2>
              <p>Drop any chest X-ray image to see a mock analysis</p>
            </div>
            <button className="panel-close" onClick={() => { setShowUpload(false); setUploadState("idle"); }}>✕</button>
          </div>

          {uploadState === "idle" && (
            <div
              className={`drop-zone ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              onClick={handleFileClick}
            >
              <input ref={fileInputRef} type="file" accept="image/*,.dcm" style={{ display:"none" }} onChange={handleFileChange} />
              <div className="drop-icon">📂</div>
              <p className="drop-title">Drag & drop your X-ray here</p>
              <p className="drop-sub">Supports DICOM, JPEG, PNG · Max 10MB</p>
              <button className="pricing-btn" style={{ marginTop:"12px", width:"auto", padding:"10px 24px" }}>Browse File</button>
            </div>
          )}

          {uploadState === "analyzing" && (
            <div className="analyzing-state">
              <div className="scan-animation">🫁</div>
              <p className="analyzing-text">Analyzing X-ray...</p>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" />
              </div>
              <p className="analyzing-sub">Running AksharNet v2.1 · ETA ~6 seconds</p>
            </div>
          )}

          {uploadState === "done" && (
            <div className="upload-result">
              <div className="result-header">
                <span className="report-badge-positive">⚠ Pneumonia Detected</span>
                <span className="result-confidence">Confidence: 91%</span>
              </div>
              <div className="result-rows">
                <div className="report-row"><span className="report-label">Affected Region</span><span className="report-value">Right lower lobe</span></div>
                <div className="report-row"><span className="report-label">Severity</span><span className="report-value report-severity">Moderate</span></div>
                <div className="report-row"><span className="report-label">Processing Time</span><span className="report-value">7.2 seconds</span></div>
              </div>
              <p className="report-note">⚠ Demo result only. Sign up for real analysis with your patient X-rays.</p>
              <div style={{ display:"flex", gap:"10px", marginTop:"12px" }}>
                <button className="pricing-btn" style={{ flex:1 }}>Sign Up Free</button>
                <button className="pricing-btn-outline" style={{ flex:1 }} onClick={() => setUploadState("idle")}>Try Another</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Live Counter */}
      <div className="counter-trigger" onClick={() => setShowCounter(!showCounter)}>
        📊 Live Stats
      </div>

      {showCounter && (
        <div className="counter-popup">
          <button className="counter-close" onClick={() => setShowCounter(false)}>✕</button>
          <p className="counter-label">X-rays analyzed today</p>
          <div className="counter-number">{count.toLocaleString()}</div>
          <div className="counter-pulse">
            <span className="pulse-dot" />
            Live
          </div>
          <p className="counter-sub">+{Math.floor(Math.random() * 5) + 1} in the last second</p>
        </div>
      )}

    </div>
  );
}

export default App;