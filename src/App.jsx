
import { useMemo, useState } from "react";

const prices = { chicken: 24, seafood: 28, veggie: 22, tortilla: 18 };
const PAELLA_PRICE_PER_PAX = 32;

const menuItems = [
  {
    id: "chicken",
    title: "Traditional Paella Box",
    price: prices.chicken,
    description: "Spanish rice, chicken & pork, house meat broth, saffron sofrito, seasonal vegetables and house aioli.",
    tag: "Classic",
    emoji: "🍗",
  },
  {
    id: "seafood",
    title: "Seafood Paella Box",
    price: prices.seafood,
    description: "Spanish rice, fresh local seafood, calamari sofrito, lemon aioli and salsa verde.",
    tag: "Premium",
    emoji: "🦐",
  },
  {
    id: "veggie",
    title: "Vegetarian Paella Box",
    price: prices.veggie,
    description: "Spanish rice, roasted veggie stock, seasonal vegetables, smoked paprika and herb aioli.",
    tag: "Plant-based",
    emoji: "🌿",
  },
];

const sideItems = [
  {
    id: "tortilla",
    title: "Spanish Tortilla",
    price: prices.tortilla,
    description: "The classic. Potatoes slow-cooked in olive oil, confit onion and fresh farm eggs. Made fresh every Friday.",
    tag: "Side",
    emoji: "🥚",
  },
];

function Counter({ value, onChange, dark = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: dark ? "rgba(255,255,255,0.1)" : "#f0e9db",
      borderRadius: "9999px", padding: "4px", marginTop: "16px",
    }}>
      <button onClick={() => onChange(Math.max(0, value - 1))} style={{
        width: 36, height: 36, borderRadius: "50%", border: "none",
        background: value > 0 ? (dark ? "#e7b66b" : "#26351f") : "transparent",
        color: value > 0 ? (dark ? "#26351f" : "#e7b66b") : (dark ? "rgba(255,255,255,0.3)" : "#26351f80"),
        cursor: "pointer", fontSize: 18, fontWeight: "bold",
        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
      }}>−</button>
      <span style={{ flex: 1, textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: dark ? "#fff" : "#26351f" }}>{value}</span>
      <button onClick={() => onChange(value + 1)} style={{
        width: 36, height: 36, borderRadius: "50%", border: "none",
        background: dark ? "#e7b66b" : "#26351f", color: dark ? "#26351f" : "#e7b66b",
        cursor: "pointer", fontSize: 18, fontWeight: "bold",
        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
      }}>+</button>
    </div>
  );
}

function PaxCounter({ value, onChange }) {
  const max = 6;
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.1)", borderRadius: "9999px", padding: "4px" }}>
        <button onClick={() => { if (value === 2) onChange(0); else if (value > 0) onChange(value - 1); }} style={{
          width: 36, height: 36, borderRadius: "50%", border: "none",
          background: value > 0 ? "#e7b66b" : "transparent",
          color: value > 0 ? "#26351f" : "rgba(255,255,255,0.3)",
          cursor: value > 0 ? "pointer" : "default", fontSize: 18, fontWeight: "bold",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
        }}>−</button>
        <span style={{ flex: 1, textAlign: "center", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>
          {value === 0 ? "—" : `${value} pax`}
        </span>
        <button onClick={() => { if (value === 0) onChange(2); else if (value < max) onChange(value + 1); }} disabled={value === max} style={{
          width: 36, height: 36, borderRadius: "50%", border: "none",
          background: value === max ? "transparent" : "#e7b66b",
          color: value === max ? "rgba(255,255,255,0.3)" : "#26351f",
          cursor: value === max ? "not-allowed" : "pointer", fontSize: 18, fontWeight: "bold",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
        }}>+</button>
      </div>
      {value > 0 && (
        <div style={{ textAlign: "center", marginTop: 10, fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: "#e7b66b" }}>
          ${value * PAELLA_PRICE_PER_PAX} AUD
          <span style={{ fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.4)", marginLeft: 6 }}>(${PAELLA_PRICE_PER_PAX} × {value})</span>
        </div>
      )}
    </div>
  );
}

export default function SiestaPreorderLanding() {
  const [qty, setQty] = useState({ chicken: 0, seafood: 0, veggie: 0, tortilla: 0 });
  const [paellaPax, setPaellaPax] = useState(0);
  const [name, setName] = useState("");
  const [orderType, setOrderType] = useState("pickup");
  const [pickupTime, setPickupTime] = useState("12:00 PM – 1:00 PM");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const boxTotal = useMemo(() => Object.entries(qty).reduce((sum, [k, v]) => sum + v * (prices[k] || 0), 0), [qty]);
  const paellaTotal = paellaPax * PAELLA_PRICE_PER_PAX;
  const total = boxTotal + paellaTotal;
  const totalItems = Object.values(qty).reduce((a, b) => a + b, 0) + (paellaPax > 0 ? 1 : 0);
  const whatsappNumber = "61410815295";

  const boxLines = [...menuItems, ...sideItems].map(item => qty[item.id] > 0 ? `  • ${item.title} x${qty[item.id]} = $${qty[item.id] * prices[item.id]} AUD` : null).filter(Boolean).join("\n");
  const paellaLine = paellaPax > 0 ? `  • Whole Paella (${paellaPax} pax) = $${paellaTotal} AUD` : null;
  const allLines = [boxLines, paellaLine].filter(Boolean).join("\n");

  const orderText = encodeURIComponent(
    `Hi SIESTA! Pre-order request:\n\n` +
    `Name: ${name || "Not provided"}\n` +
    `Order: ${orderType === "pickup" ? "Pickup" : "Delivery"}\n` +
    (orderType === "pickup" ? `Time: ${pickupTime}\n` : `Address: ${address || "To be confirmed"}\n`) +
    `\nItems:\n${allLines || "  (no items selected)"}\n\n` +
    `Total: $${total} AUD\n` +
    (notes ? `Notes: ${notes}\n` : "") +
    `\nPlease confirm availability and payment details. Thanks!`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${orderText}`;
  const cateringText = encodeURIComponent(`Hi SIESTA! I'd like to enquire about your catering & private dining services 🥘\n\nCould we arrange a call to discuss details?\n\nThank you.`);
  const cateringLink = `https://wa.me/${whatsappNumber}?text=${cateringText}`;

  const inputStyle = {
    width: "100%", boxSizing: "border-box", borderRadius: 12,
    border: "1.5px solid #26351f20", background: "#f7f0e4",
    padding: "12px 16px", fontFamily: "'Lora', serif", fontSize: 14,
    color: "#26351f", outline: "none", transition: "border 0.2s",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;0,800;1,700;1,800&family=Playfair+Display:wght@600;800&family=Lora:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #f7f0e4; }
        input:focus, select:focus, textarea:focus { border-color: #e7b66b !important; }
        ::placeholder { color: #26351f55; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up   { animation: fadeUp 0.7s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.7s 0.30s ease forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.7s 0.45s ease forwards; opacity: 0; }
        .fade-up-5 { animation: fadeUp 0.7s 0.55s ease forwards; opacity: 0; }
        .fade-up-6 { animation: fadeUp 0.7s 0.65s ease forwards; opacity: 0; }
        .fade-up-7 { animation: fadeUp 0.7s 0.75s ease forwards; opacity: 0; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px #26351f18; }
        .tag-pill { display: inline-block; padding: 3px 12px; border-radius: 9999px; background: #26351f; color: #e7b66b; font-size: 11px; font-family: 'Lora', serif; letter-spacing: 0.05em; font-weight: 500; }
        .tag-pill-side { display: inline-block; padding: 3px 12px; border-radius: 9999px; background: #e7b66b20; color: #26351f; font-size: 11px; border: 1px solid #e7b66b60; font-family: 'Lora', serif; letter-spacing: 0.05em; font-weight: 500; }
        .tag-pill-sharing { display: inline-block; padding: 3px 12px; border-radius: 9999px; background: transparent; color: #e7b66b; font-size: 11px; border: 1px solid #e7b66b; font-family: 'Lora', serif; letter-spacing: 0.05em; font-weight: 500; }
        .send-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 16px; border-radius: 9999px; background: #e7b66b; color: #26351f; font-weight: 700; font-family: 'Playfair Display', serif; font-size: 16px; border: none; cursor: pointer; transition: background 0.2s, transform 0.1s; text-decoration: none; margin-top: 20px; }
        .send-btn:hover:not(:disabled) { background: #d9a455; transform: scale(1.02); }
        .send-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .toggle-btn { flex: 1; padding: 10px; border-radius: 9999px; border: none; font-family: 'Lora', serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .toggle-btn.active { background: #26351f; color: #e7b66b; }
        .toggle-btn.inactive { background: transparent; color: #26351f80; }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 10vw, 6.5rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.0;
          margin-bottom: 12px;
        }
        .inabox-badge {
          display: inline-block;
          background: transparent;
          color: #e7b66b;
          font-family: 'Lora', serif;
          font-size: clamp(0.9rem, 2.5vw, 1.2rem);
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          padding: 8px 22px 7px;
          border-radius: 4px;
          border: 2px solid #e7b66b;
          line-height: 1;
          margin-top: 4px;
        }
        .catering-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 18px 24px; border-radius: 9999px;
          background: transparent;
          color: #e7b66b;
          border: 2px solid #e7b66b;
          font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: all 0.2s; text-decoration: none;
          margin-top: 16px;
        }
        .catering-btn:hover { background: #e7b66b; color: #26351f; }
        .hero-inner { padding: 40px 48px 48px; }
        .order-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 420px; }
        .section-label { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #26351f60; font-family: 'Lora', serif; margin-bottom: 12px; margin-top: 4px; display: block; }
        @media (max-width: 640px) {
          .hero-inner { padding: 28px 20px 32px; }
          .order-grid { grid-template-columns: 1fr; }
          .order-summary-panel { border-radius: 0 0 28px 28px; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f7f0e4", fontFamily: "'Lora', serif", color: "#26351f" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 64px" }}>

          {/* ── HERO ── */}
          <div className="fade-up" style={{ background: "#26351f", borderRadius: 32, overflow: "hidden", marginBottom: 32, boxShadow: "0 20px 60px #26351f30" }}>
            <div className="hero-inner">
              <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#e7b66b", fontFamily: "'Lora', serif", marginBottom: 16 }}>
                Byron Bay · Fridays
              </p>
              <h1 className="hero-title">SPANISH RICE</h1>
              <div><span className="inabox-badge">IN A BOX</span></div>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.8, maxWidth: 480, marginTop: 24 }}>
                Fresh paella boxes available by pre-order in Byron Bay. Limited portions, cooked in small batches, ready for pickup or delivery.
              </p>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["📍", "Byron Bay — pickup location confirmed via WhatsApp"],
                  ["🕕", "Friday orders · available 12:00 PM – 8:00 PM"],
                  ["🔥", "Limited batch · order before sold out"],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
                    <span style={{ fontSize: 16 }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── INDIVIDUAL BOXES ── */}
          <div className="fade-up-2">
            <span className="section-label">· Individual boxes ·</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 16 }}>
              {menuItems.map((item) => (
                <div key={item.id} className="card-hover" style={{ background: "#fff", borderRadius: 24, padding: 20, boxShadow: "0 4px 20px #26351f10" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <span className="tag-pill">{item.tag}</span>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginTop: 12, lineHeight: 1.3 }}>{item.title}</h2>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800 }}>${item.price}</span>
                      <div style={{ fontSize: 10, color: "#26351f60" }}>AUD</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#26351f80", minHeight: 72 }}>{item.description}</p>
                  <Counter value={qty[item.id]} onChange={(v) => setQty(prev => ({ ...prev, [item.id]: v }))} />
                </div>
              ))}
            </div>
          </div>

          {/* ── SIDES ── */}
          <div className="fade-up-3">
            <span className="section-label">· Add a side ·</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
              {sideItems.map((item) => (
                <div key={item.id} className="card-hover" style={{ background: "#fff", borderRadius: 24, padding: 20, boxShadow: "0 4px 20px #26351f10", border: "1.5px solid #e7b66b30" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <span className="tag-pill-side">{item.tag}</span>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginTop: 12, lineHeight: 1.3 }}>{item.title}</h2>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800 }}>${item.price}</span>
                      <div style={{ fontSize: 10, color: "#26351f60" }}>AUD</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#26351f80" }}>{item.description}</p>
                  <Counter value={qty[item.id]} onChange={(v) => setQty(prev => ({ ...prev, [item.id]: v }))} />
                </div>
              ))}
            </div>
          </div>

          {/* ── WHOLE PAELLA ── */}
          <div className="fade-up-4">
            <span className="section-label">· For the table ·</span>
            <div style={{ marginBottom: 32 }}>
              <div className="card-hover" style={{ background: "#26351f", borderRadius: 24, padding: 24, boxShadow: "0 4px 30px #26351f30" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div>
                    <span className="tag-pill-sharing">Limited edition · 2–6 pax</span>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginTop: 12, lineHeight: 1.3, color: "#fff" }}>Whole Paella</h2>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: "#e7b66b" }}>$32</span>
                    <div style={{ fontSize: 10, color: "#e7b66b80" }}>PER PERSON</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
                  Served the traditional way in an authentic paella pan. Minimum 2, maximum 6 people. Limited edition — flavour confirmed via WhatsApp.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[["Small", "2–3 pax"], ["Medium", "3–4 pax"], ["Big", "5–6 pax"]].map(([size, pax]) => (
                    <div key={size} style={{
                      flex: 1, minWidth: 80, textAlign: "center",
                      border: "1px solid rgba(231,182,107,0.3)", borderRadius: 12, padding: "10px 8px",
                    }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: "#e7b66b" }}>{size}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3, letterSpacing: "0.05em" }}>{pax}</div>
                    </div>
                  ))}
                </div>
                <PaxCounter value={paellaPax} onChange={setPaellaPax} />
              </div>
            </div>
          </div>

          {/* ── ORDER FORM ── */}
          <div className="fade-up-5" style={{ background: "#fff", borderRadius: 28, boxShadow: "0 4px 30px #26351f12", overflow: "hidden" }}>
            <div className="order-grid">
              <div style={{ padding: "32px 36px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>🛍 Your pre-order</h2>
                <p style={{ fontSize: 13, color: "#26351f70", lineHeight: 1.7, marginBottom: 24 }}>
                  Fill in your details and send your order via WhatsApp. Payment confirmed manually.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>NAME</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>ORDER TYPE</label>
                    <div style={{ display: "flex", background: "#f0e9db", borderRadius: 9999, padding: 4, gap: 4 }}>
                      <button className={`toggle-btn ${orderType === "pickup" ? "active" : "inactive"}`} onClick={() => setOrderType("pickup")}>🏠 Pickup</button>
                      <button className={`toggle-btn ${orderType === "delivery" ? "active" : "inactive"}`} onClick={() => setOrderType("delivery")}>🛵 Delivery</button>
                    </div>
                  </div>
                  {orderType === "pickup" ? (
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>PICKUP TIME</label>
                      <select value={pickupTime} onChange={e => setPickupTime(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                        <option>12:00 PM – 1:00 PM</option>
                        <option>1:00 PM – 2:00 PM</option>
                        <option>2:00 PM – 3:00 PM</option>
                        <option>3:00 PM – 4:00 PM</option>
                        <option>4:00 PM – 5:00 PM</option>
                        <option>5:00 PM – 6:00 PM</option>
                        <option>6:00 PM – 7:00 PM</option>
                        <option>7:00 PM – 8:00 PM</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>DELIVERY ADDRESS</label>
                      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Byron Bay or Suffolk Park..." style={inputStyle} />
                      <p style={{ fontSize: 11, color: "#26351f60", marginTop: 6 }}>Delivery availability confirmed via WhatsApp.</p>
                    </div>
                  )}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>NOTES</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Allergies, extra aioli, special requests…" style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} />
                  </div>
                </div>
                  </div>
                </div>
              </div>

              <div className="order-summary-panel" style={{ background: "#26351f", padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Order summary</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {menuItems.map(item => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: qty[item.id] > 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)" }}>
                        <span>{item.emoji} {item.title}</span>
                        <span style={{ fontWeight: qty[item.id] > 0 ? 600 : 400 }}>{qty[item.id] > 0 ? `×${qty[item.id]}` : "—"}</span>
                      </div>
                    ))}
                    {sideItems.map(item => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: qty[item.id] > 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)" }}>
                        <span>{item.emoji} {item.title}</span>
                        <span style={{ fontWeight: qty[item.id] > 0 ? 600 : 400 }}>{qty[item.id] > 0 ? `×${qty[item.id]}` : "—"}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: paellaPax > 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)" }}>
                      <span>🥘 Whole Paella</span>
                      <span style={{ fontWeight: paellaPax > 0 ? 600 : 400 }}>{paellaPax > 0 ? `${paellaPax} pax · $${paellaTotal}` : "—"}</span>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", margin: "20px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Total</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: "#e7b66b" }}>
                      ${total} <span style={{ fontSize: 14, fontWeight: 400 }}>AUD</span>
                    </span>
                  </div>
                  {orderType === "delivery" && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>+ delivery fee confirmed via WhatsApp</p>}                </div>
                <div>
                  <a href={totalItems > 0 ? whatsappLink : undefined} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <button className="send-btn" disabled={totalItems === 0} style={{ opacity: totalItems === 0 ? 0.45 : 1, cursor: totalItems === 0 ? "not-allowed" : "pointer" }}>
                      💬 Send order via WhatsApp
                    </button>
                  </a>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 14, lineHeight: 1.6, textAlign: "center" }}>
                    Orders are not confirmed until you receive a WhatsApp reply with payment details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-up-6" style={{ textAlign: "center", marginTop: 40, color: "#26351f50", fontSize: 12, letterSpacing: "0.08em" }}>
            SIESTA · Byron Bay · Fridays only · Pre-order only
          </div>

          {/* ── CATERING & PRIVATE EVENTS ── */}
          <div className="fade-up-7" style={{ marginTop: 32 }}>
            <span className="section-label">· Private & events ·</span>
            <div style={{
              background: "#1a2414", borderRadius: 24, padding: 32,
              boxShadow: "0 4px 30px #26351f40",
              border: "1px solid #e7b66b20",
            }}>
              <span style={{
                display: "inline-block", padding: "3px 12px", borderRadius: "9999px",
                background: "transparent", color: "#e7b66b", fontSize: 11,
                border: "1px solid #e7b66b50", fontFamily: "'Lora', serif",
                letterSpacing: "0.05em", fontWeight: 500, marginBottom: 16,
              }}>By request only</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
                Private Dining & Catering
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.6)", maxWidth: 480, marginBottom: 24 }}>
                Private dinners, corporate events and bespoke catering. Everything tailored to you. Let's talk.
              </p>
              <a href={cateringLink} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="catering-btn">
                  💬 Enquire via WhatsApp
                </button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
