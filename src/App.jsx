import { useState, useEffect } from "react";

const NAV_LINKS = ["Fonctionnalités", "Comment ça marche", "Contact"];

const FEATURES = [
  {
    icon: "📦",
    title: "Stock en temps réel",
    desc: "Gérez vos produits instantanément depuis une seule application. Zéro erreur, zéro retard.",
    color: "#006D77",
  },
  {
    icon: "⚡",
    title: "Publication automatique",
    desc: "Un produit ajouté = publié partout. Site web, Instagram, Facebook — en un seul clic.",
    color: "#D4AF37",
  },
  {
    icon: "🤖",
    title: "Chatbot intelligent",
    desc: "Répond à vos clients 24h/24, gère les questions fréquentes et facilite les commandes.",
    color: "#006D77",
  },
  {
    icon: "🌐",
    title: "Site professionnel",
    desc: "Votre vitrine en ligne générée automatiquement, toujours à jour avec votre catalogue.",
    color: "#D4AF37",
  },
];

const STEPS = [
  { num: "01", label: "Ajoutez votre produit", sub: "Depuis l'app mobile en quelques secondes" },
  { num: "02", label: "Publication automatique", sub: "Sur votre site et tous vos réseaux sociaux" },
  { num: "03", label: "Le chatbot gère", sub: "Questions, commandes et suivi client" },
];

export default function App() {
  // AJOUT DE 'phone' DANS LE STATE INITIAL
  const [form, setForm] = useState({ nom: "", email: "", message: "", phone: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
  
  // Si une erreur existait pour ce champ, on l'enlève
  if (errors[name]) {
    setErrors({ ...errors, [name]: null });
  }
};
  

  const validate = () => {
  let tempErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(05|06|07|02)[0-9]{8}$/;

  if (!form.nom) tempErrors.nom = "Le nom est obligatoire";
  if (!emailRegex.test(form.email)) tempErrors.email = "Email invalide (ex: nom@mail.com)";
  const cleanPhone = form.phone.replace(/\s+/g, ''); 

if (!cleanPhone) {
  tempErrors.phone = "Le numéro est obligatoire";
} else if (!/^(05|06|07|02)/.test(cleanPhone)) {
  tempErrors.phone = "Doit commencer par 05, 06, 07 ou 02";
} else if (cleanPhone.length < 10) {
  tempErrors.phone = `Il manque ${10 - cleanPhone.length} chiffre(s)`;
} else if (cleanPhone.length > 10) {
  tempErrors.phone = `Trop de chiffres (${cleanPhone.length}/10)`;
} else if (!/^\d+$/.test(cleanPhone)) {
  tempErrors.phone = "Le numéro ne doit contenir que des chiffres";
}
  if (form.message.length < 10) tempErrors.message = "Message trop court (min 10 car.)";

  setErrors(tempErrors);
  return Object.keys(tempErrors).length === 0; // Retourne true si aucune erreur
};



  // LOGIQUE DE CONNEXION AU BACKEND NODE.JS
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
   setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setForm({ nom: "", email: "", message: "", phone: "" }); // Reset
        setTimeout(() => setSent(false), 3000);
      } else {
        alert("Erreur lors de l'envoi au serveur.");
      }
    } catch (error) {
      console.error("Erreur connexion:", error);
      alert("Le serveur backend n'est pas lancé sur le port 5000.");
    } finally {
    setLoading(false); // 2. On arrête le chargement, quoi qu'il arrive
  }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@300;400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #FFFFFF;
          --surface: #F8FAFC;
          --border: #E2E8F0;
          --text: #1E293B;
          --muted: #64748B;
          --accent: #006D77;
          --accent-gold: #D4AF37;
          --font-display: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          line-height: 1.6;
          overflow-x: hidden;
        }

        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 6%;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid var(--border);
        }

        .logo-container img { height: 45px; display: block; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { color: var(--text); text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: var(--accent); }
        .nav-cta { background: var(--accent); color: white; border: none; padding: 0.7rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,109,119,0.2); }

        .hero {
          padding: 10rem 6% 6rem;
          text-align: center;
          background: radial-gradient(circle at top right, rgba(0,109,119,0.03), transparent),
                      radial-gradient(circle at bottom left, rgba(212,175,55,0.03), transparent);
        }

        .hero-badge { display: inline-block; background: #E6F0F1; color: var(--accent); padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 700; margin-bottom: 2rem; text-transform: uppercase; }
        .hero h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.1; color: var(--text); margin-bottom: 1.5rem; }
        .hero h1 span { color: var(--accent); }
        .hero p { max-width: 600px; margin: 0 auto 2.5rem; color: var(--muted); font-size: 1.1rem; }

        .btn-group { display: flex; gap: 1rem; justify-content: center; }
        .btn-primary { background: var(--accent); color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .btn-secondary { border: 1px solid var(--border); padding: 1rem 2rem; border-radius: 8px; text-decoration: none; color: var(--text); transition: background 0.2s; }
        .btn-secondary:hover { background: var(--surface); }

        section { padding: 6rem 6%; }
        .section-header { margin-bottom: 4rem; }
        .section-label { color: var(--accent-gold); font-weight: 800; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem; display: block;}
        .section-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem; }

        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
        .feature-card { background: var(--surface); padding: 2.5rem; border-radius: 20px; border: 1px solid var(--border); transition: all 0.3s ease; }
        .feature-card:hover { transform: translateY(-10px); border-color: var(--accent); }
        .feature-icon { font-size: 2.5rem; margin-bottom: 1.5rem; display: block; }
        .feature-card h3 { margin-bottom: 1rem; font-family: var(--font-display); }
        .feature-card p { color: var(--muted); font-size: 0.95rem; }

        .steps-container { max-width: 800px; }
        .step { display: flex; gap: 2rem; margin-bottom: 3rem; align-items: flex-start; }
        .step-num { background: var(--accent); color: white; width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }
        .step h3 { font-family: var(--font-display); margin-bottom: 0.5rem; }

        .contact-box { background: var(--surface); padding: 3rem; border-radius: 30px; display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; align-items: center; }
        form { display: flex; flex-direction: column; gap: 1.2rem; }
        input, textarea { padding: 1rem; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 1rem; }
        input:focus { outline: none; border-color: var(--accent); }
        .submit-btn { background: var(--accent-gold); color: white; border: none; padding: 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; }

        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .social-icon { padding: 8px 15px; background: #f0f2f5; border-radius: 8px; text-decoration: none; color: var(--text); font-size: 0.85rem; font-weight: 600; transition: all 0.2s; }
        .social-icon:hover { background: var(--accent); color: white; transform: translateY(-3px); }

        footer { padding: 4rem 6%; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .contact-box { grid-template-columns: 1fr; }
          .hero h1 { font-size: 3rem; }
        }
          .error-text {
            color: #ff4d4d;
            font-size: 0.75rem;
             font-weight: 600;
             margin-top: 4px;
             display: block;
            animation: fadeInError 0.3s ease;
             }

            @keyframes fadeInError {
              from { opacity: 0; transform: translateY(-5px); }
             to { opacity: 1; transform: translateY(0); }
              }

.input-error {
  border-color: #ff4d4d !important;
  background-color: #fff5f5 !important;
}
      `}</style>

      <nav>
        <div className="logo-container">
          <img src="logo-tajirli.jpg" alt="Tajirli Logo" />
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link}><a href={`#${link.toLowerCase().replace(/\s/g, "-")}`}>{link}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => document.getElementById('contact').scrollIntoView()}>
          Essai Gratuit
        </button>
      </nav>

      <section className="hero">
        <div className="hero-badge">✨ Nouvelle Ère pour les Commerçants</div>
        <h1>Gérez votre boutique <br /><span>sans effort.</span></h1>
        <p>Centralisez vos stocks, automatisez vos réseaux sociaux et laissez notre IA répondre à vos clients.</p>
        <div className="btn-group">
          <a href="#contact" className="btn-primary">Démarrer maintenant</a>
          <a href="#fonctionnalités" className="btn-secondary">Découvrir l'app</a>
        </div>
      </section>

      <section id="fonctionnalités">
        <div className="section-header reveal">
          <span className="section-label">Avantages</span>
          <h2 className="section-title">Une application, <br />des possibilités infinies.</h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card reveal" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="comment-ça-marche" style={{ background: 'var(--surface)' }}>
        <div className="section-header reveal">
          <span className="section-label">Processus</span>
          <h2 className="section-title">Comment ça marche ?</h2>
        </div>
        <div className="steps-container">
          {STEPS.map((s, i) => (
            <div className="step reveal" key={i}>
              <div className="step-num">{s.num}</div>
              <div>
                <h3>{s.label}</h3>
                <p>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <div className="contact-box reveal">
          <div className="contact-info-side">
            <span className="section-label">Contactez-nous</span>
            <h2 className="section-title">Parlons de votre boutique.</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
              Choisissez le canal qui vous convient le mieux. Notre équipe vous répond sous 24h.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--accent)', color: 'white', padding: '10px', borderRadius: '10px' }}>📧</div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '700' }}>Email</p>
                  <p style={{ fontWeight: '600' }}>tajirli@gmail.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--accent-gold)', color: 'white', padding: '10px', borderRadius: '10px' }}>📍</div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '700' }}>Localisation</p>
                  <p style={{ fontWeight: '600' }}>Disponible partout en Algérie</p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '1rem' }}>Suivez-nous</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" className="social-icon">Facebook</a>
              <a href="#" className="social-icon">Instagram</a>
              <a href="#" className="social-icon">LinkedIn</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Nom Complet</label>
                <input name="nom" placeholder="Ex: Ahmed Ben" value={form.nom} onChange={handleChange} />
                {errors.nom && <span className="error-text">{errors.nom}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Téléphone</label>
                <input name="phone" type="tel" placeholder="05XX XX XX XX" value={form.phone} onChange={handleChange} />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Email</label>
              <input name="email" type="email" placeholder="votre@email.com" value={form.email} onChange={handleChange}  />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700' }}>Votre message</label>
              <textarea name="message" placeholder="Dites-nous en plus sur votre activité..." value={form.message} onChange={handleChange} />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

           <button   className="submit-btn" type="submit"  disabled={loading || sent} // Empêche de cliquer si ça charge ou si c'est déjà envoyé
            style={{ 
              width: '100%', 
              marginTop: '1rem',
              opacity: (loading || sent) ? 0.7 : 1, // Devient un peu transparent
              cursor: (loading || sent) ? 'not-allowed' : 'pointer' 
                }}
               >
  {loading ? "Envoi en cours..." : (sent ? "✓ Demande envoyée !" : "Envoyer ma demande →")}
</button>
          </form>
        </div>
      </section>

      <footer>
        <img src="logo-tajirli.jpg" alt="Tajirli Logo" style={{ height: '30px' }} />
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          © 2026 Tajirli. Tous droits réservés.
        </p>
      </footer>
    </>
  );
}