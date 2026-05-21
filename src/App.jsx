import { useMemo, useState } from "react";

const prices = { chicken: 24, seafood: 28, veggie: 22 };

const menuItems = [
  {
    id: "chicken",
    title: "Chicken Paella Box",
    price: prices.chicken,
    description: "Spanish rice, chicken, saffron-style sofrito, seasonal vegetables and house aioli.",
    tag: "Classic",
    emoji: "🍗",
  },
  {
    id: "seafood",
    title: "Seafood Paella Box",
    price: prices.seafood,
    description: "Spanish rice, fresh seafood, roasted peppers, lemon zest and house aioli.",
    tag: "Premium",
    emoji: "🦐",
  },
  {
    id: "veggie",
    title: "Vegetarian Paella Box",
    price: prices.veggie,
    description: "Spanish rice, seasonal vegetables, chickpeas, smoked paprika and herb aioli.",
    tag: "Plant-based",
    emoji: "🌿",
  },
];

function Counter({ value, onChange }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0",
      background: "#f0e9db",
      borderRadius: "9999px",
      padding: "4px",
      marginTop: "16px",
    }}>
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        style={{
          width: 36, height: 36, borderRadius: "50%", border: "none",
          background: value > 0 ? "#26351f" : "transparent",
          color: value > 0 ? "#e7b66b" : "#26351f80",
          cursor: "pointer", fontSize: 18, fontWeight: "bold",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}
      >−</button>
      <span style={{
        flex: 1, textAlign: "center", fontFamily: "'Playfair Display', serif",
        fontSize: 20, fontWeight: 700, color: "#26351f",
      }}>{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        style={{
          width: 36, height: 36, borderRadius: "50%", border: "none",
          background: "#26351f", color: "#e7b66b",
          cursor: "pointer", fontSize: 18, fontWeight: "bold",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}
      >+</button>
    </div>
  );
}

export default function SiestaPreorderLanding() {
  const [qty, setQty] = useState({ chicken: 0, seafood: 0, veggie: 0 });
  const [name, setName] = useState("");
  const [orderType, setOrderType] = useState("pickup");
  const [pickupTime, setPickupTime] = useState("6:00 PM – 6:30 PM");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const total = useMemo(() =>
    Object.entries(qty).reduce((sum, [k, v]) => sum + v * prices[k], 0),
    [qty]
  );
  const totalItems = Object.values(qty).reduce((a, b) => a + b, 0);

  const whatsappNumber = "61410815295";

  const orderLines = menuItems
    .map(item => qty[item.id] > 0 ? `  • ${item.title} x${qty[item.id]} = $${qty[item.id] * item.price} AUD` : null)
    .filter(Boolean)
    .join("\n");

  const orderText = encodeURIComponent(
    `Hi SIESTA! I'd like to place a pre-order 🥘\n\n` +
    `👤 Name: ${name || "Not provided"}\n` +
    `📦 Order type: ${orderType === "pickup" ? "Pickup" : "Delivery"}\n` +
    (orderType === "pickup" ? `⏰ Pickup time: ${pickupTime}\n` : `📍 Delivery address: ${address || "To be confirmed"}\n`) +
    `\n🍽 Items:\n${orderLines || "  (no items selected)"}\n\n` +
    `💰 Total: $${total} AUD\n` +
    (notes ? `📝 Notes: ${notes}\n` : "") +
    `\nPlease confirm availability and payment details. Thanks!`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${orderText}`;

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    borderRadius: 12, border: "1.5px solid #26351f20",
    background: "#f7f0e4", padding: "12px 16px",
    fontFamily: "'Lora', serif", fontSize: 14, color: "#26351f",
    outline: "none", transition: "border 0.2s",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Lora:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #f7f0e4; }
        input:focus, select:focus, textarea:focus { border-color: #e7b66b !important; }
        ::placeholder { color: #26351f55; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease forwards; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.7s 0.45s ease forwards; opacity: 0; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px #26351f18; }
        .tag-pill {
          display: inline-block; padding: 3px 12px; border-radius: 9999px;
          background: #26351f; color: #e7b66b; font-size: 11px;
          font-family: 'Lora', serif; letter-spacing: 0.05em; font-weight: 500;
        }
        .send-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 16px; border-radius: 9999px;
          background: #e7b66b; color: #26351f; font-weight: 700;
          font-family: 'Playfair Display', serif; font-size: 16px;
          border: none; cursor: pointer; transition: background 0.2s, transform 0.1s;
          text-decoration: none; margin-top: 20px;
        }
        .send-btn:hover:not(:disabled) { background: #d9a455; transform: scale(1.02); }
        .send-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .toggle-btn {
          flex: 1; padding: 10px; border-radius: 9999px; border: none;
          font-family: 'Lora', serif; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
        }
        .toggle-btn.active { background: #26351f; color: #e7b66b; }
        .toggle-btn.inactive { background: transparent; color: #26351f80; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f7f0e4", fontFamily: "'Lora', serif", color: "#26351f" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 64px" }}>

          {/* Hero */}
          <div className="fade-up" style={{
            background: "#26351f", borderRadius: 32, overflow: "hidden",
            marginBottom: 32, boxShadow: "0 20px 60px #26351f30",
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr auto",
              gap: 0, padding: "40px 40px 40px 44px",
              alignItems: "center",
            }}>
              <div>
                <p style={{
                  fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase",
                  color: "#e7b66b", fontFamily: "'Lora', serif", marginBottom: 16,
                }}>Byron Bay · Fridays</p>
                <h1 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 6vw, 4rem)",
                  fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 18,
                }}>Spanish rice<br /><em style={{ fontStyle: "italic", color: "#e7b66b" }}>in a box.</em></h1>
                <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15, lineHeight: 1.8, maxWidth: 380 }}>
                  Fresh paella boxes available by pre-order in Byron Bay.
                  Limited portions, cooked in small batches, ready for pickup or delivery.
                </p>
                <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    ["📍", "Byron Bay — pickup location confirmed via WhatsApp"],
                    ["🕕", "Friday pre-orders · pickup 6:00 PM – 8:00 PM"],
                    ["🔥", "Limited batch · order before sold out"],
                  ].map(([icon, text]) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
                      <span style={{ fontSize: 16 }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                width: 160, height: 160, borderRadius: "50%",
                background: "linear-gradient(135deg, #e7b66b, #d8664a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginLeft: 32,
                boxShadow: "0 0 0 12px rgba(231,182,107,0.12)",
              }}>
                <span style={{ fontSize: 64 }}>🥘</span>
              </div>
            </div>
          </div>

          {/* Menu cards */}
          <div className="fade-up-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
            {menuItems.map((item) => (
              <div key={item.id} className="card-hover" style={{
                background: "#fff", borderRadius: 24, padding: 20,
                boxShadow: "0 4px 20px #26351f10",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div>
                    <span className="tag-pill">{item.tag}</span>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginTop: 12, lineHeight: 1.3 }}>{item.title}</h2>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800 }}>${item.price}</span>
                    <div style={{ fontSize: 10, color: "#26351f60", letterSpacing: "0.05em" }}>AUD</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "#26351f80", minHeight: 72 }}>{item.description}</p>
                <Counter value={qty[item.id]} onChange={(v) => setQty(prev => ({ ...prev, [item.id]: v }))} />
              </div>
            ))}
          </div>

          {/* Order form */}
          <div className="fade-up-3" style={{
            background: "#fff", borderRadius: 28,
            boxShadow: "0 4px 30px #26351f12", overflow: "hidden",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 420 }}>

              {/* Left: form */}
              <div style={{ padding: "32px 36px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
                  🛍 Your pre-order
                </h2>
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
                        <option>6:00 PM – 6:30 PM</option>
                        <option>6:30 PM – 7:00 PM</option>
                        <option>7:00 PM – 7:30 PM</option>
                        <option>7:30 PM – 8:00 PM</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>DELIVERY ADDRESS</label>
                      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Your full address in Byron Bay" style={inputStyle} />
                      <p style={{ fontSize: 11, color: "#26351f60", marginTop: 6 }}>Delivery availability will be confirmed via WhatsApp.</p>
                    </div>
                  )}

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>NOTES</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Allergies, extra aioli, special requests…" style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} />
                  </div>
                </div>
              </div>

              {/* Right: summary */}
              <div style={{ background: "#26351f", padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Order summary</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {menuItems.map(item => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: qty[item.id] > 0 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)" }}>
                        <span>{item.emoji} {item.title}</span>
                        <span style={{ fontWeight: qty[item.id] > 0 ? 600 : 400 }}>
                          {qty[item.id] > 0 ? `×${qty[item.id]}` : "—"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", margin: "20px 0" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Total</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: "#e7b66b" }}>
                      ${total} <span style={{ fontSize: 14, fontWeight: 400 }}>AUD</span>
                    </span>
                  </div>

                  {orderType === "delivery" && (
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
                      + delivery fee confirmed via WhatsApp
                    </p>
                  )}
                </div>

                <div>
                  <a
                    href={totalItems > 0 ? whatsappLink : undefined}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      className="send-btn"
                      disabled={totalItems === 0}
                      style={{ opacity: totalItems === 0 ? 0.45 : 1, cursor: totalItems === 0 ? "not-allowed" : "pointer" }}
                    >
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

          {/* Footer */}
          <div className="fade-up-4" style={{ textAlign: "center", marginTop: 40, color: "#26351f50", fontSize: 12, letterSpacing: "0.08em" }}>
            SIESTA · Byron Bay · Fridays only · Pre-order only
          </div>

        </div>
      </div>
    </>
  );
}
