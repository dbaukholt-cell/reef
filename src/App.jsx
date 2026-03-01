import { useState, useEffect } from "react";

// ─── KONFIGURATION ────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "SuTe2026";

const PHASES_CONFIG = [
  {
    id: 1,
    label: "Entdeckung 1",
    typ: "entdecken",
    title: "Der Termin steht.",
    teaser: "Zwei Tage. Neues entdecken und machen. Mehr noch nicht.",
    content: null,
  },
  {
    id: 2,
    label: "Entdeckung 2",
    typ: "entdecken",
    title: "Wer dabei ist.",
    teaser: "Das FK-Team Steuerung & Sondertechnik – vollständig.",
    content: {
      type: "participants",
      items: [
        { name: "Dominik Baukholt", role: "Leiter Sondergasanlagen" },
        { name: "Timo Jeddeloh", role: "Steuerung & Sondertechnik" },
        { name: "Markus Berghaus", role: "Steuerung & Sondertechnik" },
        { name: "Dieter Budden", role: "Steuerung & Sondertechnik" },
        { name: "Martina von Dzwonkowski", role: "Steuerung & Sondertechnik" },
        { name: "André Fisse", role: "Steuerung & Sondertechnik" },
        { name: "André Jestadt", role: "Steuerung & Sondertechnik" },
        { name: "Thomas Leenderts", role: "Steuerung & Sondertechnik" },
        { name: "Stefan Meyer", role: "Steuerung & Sondertechnik" },
        { name: "Andreas Nyhof", role: "Steuerung & Sondertechnik" },
        { name: "Jens Schneider", role: "Steuerung & Sondertechnik" },
        { name: "Thorsten Soppa", role: "Steuerung & Sondertechnik" },
        { name: "Marco van der Spek", role: "Steuerung & Sondertechnik" },
        { name: "Björn Willers", role: "Steuerung & Sondertechnik" },
        { name: "Sebastian Diekmann", role: "Steuerung & Sondertechnik" },
        { name: "Clara Evers", role: "Steuerung & Sondertechnik" },
      ],
    },
  },
  {
    id: 3,
    label: "Entdeckung 3",
    typ: "machen",
    title: "Ich bin dabei!",
    teaser: "Kurz bestätigen – und Fahrgemeinschaft organisieren.",
    content: {
      type: "impuls",
      text: "Organisiert Fahrgemeinschaften direkt untereinander – sprecht euch einfach ab.",
      time: "7:00 – 9:00 Uhr",
    },
  },
  {
    id: 4,
    label: "Entdeckung 4",
    typ: "entdecken",
    title: "Vorfreude.",
    teaser: "Wann hast du in den letzten 3 Monaten etwas wirklich Neues gemacht?",
    content: {
      type: "impuls",
      text: "Nimm dir einen Moment. Kein Meeting, kein Projekt – nur diese eine Frage: Wann hast du zuletzt etwas zum ersten Mal getan? Komm mit dieser Antwort zum Workshop.",
    },
  },
  {
    id: 5,
    label: "Entdeckung 5",
    typ: "machen",
    title: "Was muss ich einpacken?",
    teaser: "Deine Packliste für zwei Tage – ab 13. April hier verfügbar.",
    content: {
      type: "checklist",
      items: [
        { id: "c1", icon: "🧳", text: "Übernachtungsgepäck für 1 Nacht" },
        { id: "c2", icon: "🎨", text: "Alte / robuste Kleidung für Action Painting – Farbe gehört dazu" },
        { id: "c3", icon: "👟", text: "Bequeme Sportschuhe – wir sind draußen und aktiv" },
        { id: "c4", icon: "🧥", text: "Wetterfeste Jacke – April, Außengelände Kliemannsland" },
        { id: "c5", icon: "🔋", text: "Handy-Ladekabel" },
        { id: "c6", icon: "💳", text: "EC- oder Kreditkarte für persönliche Extras (Hotelbar, Parken)" },
        { id: "c7", icon: "🚗", text: "Anreiseroute gecheckt & Fahrgemeinschaft koordiniert" },
        { id: "c8", icon: "💻", text: "Laptop & Unterlagen bewusst zuhause lassen – zwei Tage gehören euch" },
      ],
    },
  },
  {
    id: 6,
    label: "Entdeckung 6",
    typ: "entdecken",
    title: "Wann und wo muss ich morgen früh sein?",
    teaser: "Adresse, Uhrzeit, alles was du für Tag 1 brauchst.",
    content: {
      type: "location",
      name: "Kliemannsland",
      address: "Eichenstraße 14, 27404 Rüspel",
      hint: "Ein Ort, der aus einer Idee entstand. Genau deshalb passt er zu uns.",
      mapUrl: "https://maps.google.com/?q=Kliemannsland+Eichenstraße+14+27404+Rüspel",
      time: "Ankunft: 09:00 Uhr",
      website: "https://www.kliemannsland.de",
    },
  },
  {
    id: 7,
    label: "Entdeckung 7",
    typ: "machen",
    title: "Austausch auf dem Weg.",
    teaser: "Kommt gemeinsam – und bringt eine Antwort mit.",
    content: {
      type: "impuls",
      text: "Fahrt in Fahrgemeinschaften und nutzt die Zeit: Was habe ich in den letzten 3 Monaten wirklich Neues gemacht? Tauscht euch auf dem Weg aus – das ist schon Teil des Workshops.",
      time: "7:00 – 9:00 Uhr",
    },
  },
  {
    id: 8,
    label: "Entdeckung 8",
    typ: "entdecken",
    title: "Was erwartet mich heute im Kliemannsland?",
    teaser: "Das Programm für Tag 1 – 9 bis 16 Uhr.",
    content: {
      type: "agenda",
      days: [
        {
          date: "21. April 2026",
          items: [
            { time: "09:00", title: "Ankunft & Frühstück", desc: "Brötchen, Kaffee, ankommen" },
            { time: "09:30", title: "Kliemannsland-Rallye", desc: "10 Stationen in Kleingruppen – Kennenlernen auf andere Art" },
            { time: "11:00", title: "Schnack in der Spelunke", desc: "Interner Austausch, Raum für Gespräche" },
            { time: "13:00", title: "Mittagessen", desc: "Udon-Nudeln in Hoisinsauce mit Wokgemüse" },
            { time: "14:00", title: "Action Painting", desc: "Farbe fliegt, Musik pulsiert – keine Regeln, kein Vorwissen" },
            { time: "16:00", title: "Ende & Aufbruch nach Bremen", desc: "On your way" },
          ],
        },
      ],
    },
  },
  {
    id: 9,
    label: "Entdeckung 9",
    typ: "machen",
    title: "Anreise & Check-in im Hotel.",
    teaser: "Route vom Kliemannsland zum ATLANTIC Grand Hotel Bremen.",
    content: {
      type: "logistics",
      items: [
        { icon: "🏨", label: "Hotel", value: "ATLANTIC Grand Hotel Bremen · Bredenstraße 2, 28195 Bremen · Check-in ab 15:00 Uhr" },
        { icon: "🚗", label: "Route", value: "Vom Kliemannsland (Rüspel) nach Bremen: ca. 40 Min über A1" },
        { icon: "🅿️", label: "Parken", value: "Tiefgarage am Hotel · Tageshöchstsatz 27,00 € · keine Reservierung möglich" },
        { icon: "🛏️", label: "Zimmer", value: "15 × Comfort Zimmer · inkl. Frühstücksbuffet · Übernachtung zentral durch EWE abgerechnet" },
        { icon: "⏰", label: "Ankunft", value: "17:00 – 19:00 Uhr" },
      ],
    },
  },
  {
    id: 10,
    label: "Entdeckung 10",
    typ: "entdecken",
    title: "Reflexion auf dem Weg.",
    teaser: "Welche konkreten neuen Erfahrungen habe ich heute gemacht?",
    content: {
      type: "impuls",
      text: "Auf dem Weg vom Kliemannsland ins Hotel: Was hat dich heute überrascht? Was hat etwas mit dir gemacht? Komm mit dieser Antwort in den Abend.",
      time: "17:00 – 18:00 Uhr",
    },
  },
  {
    id: 11,
    label: "Entdeckung 11",
    typ: "machen",
    title: "Gemeinsamer spanischer Abend.",
    teaser: "Kulinarisch verwöhnen lassen – im Aioli im Schnoor.",
    content: {
      type: "impuls",
      text: "Wir laufen gemeinsam zum Restaurant. Zusammen sein, den Tag sacken lassen, gut essen.",
      time: "19:00 – 22:00 Uhr",
      extra: "Aioli im Schnoor · Bremen",
    },
  },
  {
    id: 12,
    label: "Entdeckung 12",
    typ: "entdecken",
    title: "Was erwartet mich heute?",
    teaser: "Das Programm für Tag 2 – Workshop im ATLANTIC Grand Hotel.",
    content: {
      type: "agenda",
      days: [
        {
          date: "22. April 2026",
          items: [
            { time: "08:30", title: "Frühstück", desc: "ATLANTIC Grand Hotel – Frühstücksbuffet" },
            { time: "09:00", title: "Workshop – Scotland Saal", desc: "Gemeinsamer Workshop im Tagungsraum · Inhalt folgt" },
            { time: "13:00", title: "Ende & Rückfahrt", desc: "Gemeinsam in Fahrgemeinschaften" },
          ],
        },
      ],
    },
  },
];

// ─── STORAGE HELPERS (localStorage) ─────────────────────────────────────────
async function getUnlockedPhases() {
  try {
    const v = localStorage.getItem("workshop:unlocked");
    return v ? JSON.parse(v) : [1];
  } catch {
    return [1];
  }
}
async function setUnlockedPhases(phases) {
  localStorage.setItem("workshop:unlocked", JSON.stringify(phases));
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function Countdown() {
  const target = new Date("2026-04-21T10:00:00");
  const [diff, setDiff] = useState(target - new Date());
  useEffect(() => {
    const t = setInterval(() => setDiff(target - new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return (
    <div style={{ display: "flex", gap: "2rem", justifyContent: "center", margin: "2.5rem 0" }}>
      {[["Tage", d], ["Std", h], ["Min", m], ["Sek", s]].map(([label, val]) => (
        <div key={label} style={{ textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800,
            color: "#00C389", fontFamily: "'DM Mono', monospace",
            minWidth: "3ch", display: "block",
            textShadow: "0 0 30px rgba(0,195,137,0.4)"
          }}>{String(val).padStart(2, "0")}</div>
          <div style={{ fontSize: "0.7rem", color: "#666", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── PHASE CARD ───────────────────────────────────────────────────────────────
function PhaseCard({ phase, unlocked, isNew }) {
  const [visible, setVisible] = useState(!isNew);
  useEffect(() => {
    if (isNew) setTimeout(() => setVisible(true), 100);
  }, [isNew]);

  return (
    <div style={{
      background: unlocked ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
      border: `1px solid ${unlocked ? "rgba(0,195,137,0.3)" : "rgba(255,255,255,0.06)"}`,
      borderRadius: "16px",
      padding: "2rem",
      marginBottom: "1.5rem",
      transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Phase label */}
      <div style={{
        fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
        color: unlocked ? (phase.typ === "machen" ? "#E8622A" : "#00C389") : "#444", marginBottom: "0.5rem", fontFamily: "'DM Mono', monospace"
      }}>{phase.label}</div>

      {/* Title */}
      <h2 style={{
        fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 700,
        color: unlocked ? "#fff" : "#333", margin: "0 0 0.5rem",
        fontFamily: "'Syne', sans-serif"
      }}>{phase.title}</h2>

      {/* Teaser */}
      <p style={{ color: unlocked ? "#aaa" : "#2a2a2a", margin: "0 0 1.5rem", fontSize: "0.95rem" }}>
        {phase.teaser}
      </p>

      {/* Content */}
      {unlocked && phase.content && <PhaseContent content={phase.content} />}

      {/* Locked overlay */}
      {!unlocked && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "flex-end", padding: "2rem",
          background: "linear-gradient(135deg, transparent 60%, rgba(0,0,0,0.3))"
        }}>
          <span style={{ fontSize: "1.8rem", opacity: 0.15 }}>🔒</span>
        </div>
      )}
    </div>
  );
}

function PhaseContent({ content }) {
  if (content.type === "participants") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
      {content.items.map((p, i) => (
        <div key={i} style={{
          background: "rgba(0,195,137,0.06)", border: "1px solid rgba(0,195,137,0.15)",
          borderRadius: "10px", padding: "0.75rem 1rem"
        }}>
          <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>{p.name}</div>
          <div style={{ color: "#666", fontSize: "0.75rem", marginTop: "2px" }}>{p.role}</div>
        </div>
      ))}
    </div>
  );

  if (content.type === "location") return (
    <div style={{ color: "#ccc" }}>
      <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>{content.name}</div>
      <div style={{ color: "#888", marginBottom: "0.25rem" }}>{content.address}</div>
      {content.time && <div style={{ color: "#00C389", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{content.time}</div>}
      <div style={{ color: "#00C389", fontStyle: "italic", marginBottom: "0.5rem" }}>{content.hint}</div>
      {content.mapUrl && <a href={content.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#00C389", fontSize: "0.8rem", textDecoration: "none", borderBottom: "1px solid rgba(0,195,137,0.3)" }}>📍 Google Maps öffnen</a>}
      {content.website && <a href={content.website} target="_blank" rel="noopener noreferrer" style={{ color: "#666", fontSize: "0.8rem", textDecoration: "none", marginLeft: "1rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>🌐 Website</a>}
    </div>
  );

  if (content.type === "agenda") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
      {content.days.map((day, di) => (
        <div key={di}>
          <div style={{ fontWeight: 700, color: "#00C389", marginBottom: "1rem", fontSize: "0.85rem", letterSpacing: "0.05em" }}>{day.date}</div>
          {day.items.map((item, ii) => (
            <div key={ii} style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ color: "#555", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace", minWidth: "42px", paddingTop: "2px" }}>{item.time}</div>
              <div>
                <div style={{ color: "#ddd", fontSize: "0.9rem", fontWeight: 500 }}>{item.title}</div>
                {item.desc && <div style={{ color: "#666", fontSize: "0.8rem" }}>{item.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  if (content.type === "logistics") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
      {content.items.map((item, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.03)", borderRadius: "10px",
          padding: "0.75rem 1rem", display: "flex", gap: "0.75rem", alignItems: "flex-start"
        }}>
          <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
          <div>
            <div style={{ color: "#888", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</div>
            <div style={{ color: "#ccc", fontSize: "0.85rem", marginTop: "2px" }}>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
  if (content.type === "impuls") return (
    <div style={{ borderLeft: "3px solid rgba(0,195,137,0.4)", paddingLeft: "1.25rem" }}>
      {content.time && <div style={{ color: "#00C389", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", marginBottom: "0.5rem" }}>{content.time}</div>}
      <p style={{ color: "#ccc", margin: "0 0 0.5rem", fontSize: "0.95rem", lineHeight: 1.7 }}>{content.text}</p>
      {content.extra && <div style={{ color: "#888", fontSize: "0.85rem", fontStyle: "italic", marginTop: "0.5rem" }}>{content.extra}</div>}
    </div>
  );

  if (content.type === "checklist") return <ChecklistBlock items={content.items} />;
  if (content.type === "fahrgemeinschaft") return <FahrgemeinschaftBlock />;

  return null;
}

// ─── CHECKLIST BLOCK ──────────────────────────────────────────────────────────
function ChecklistBlock({ items }) {
  const [checked, setChecked] = useState({});

  useEffect(() => {
    try {
      const v = localStorage.getItem("workshop:checklist");
      if (v) setChecked(JSON.parse(v));
    } catch {}
  }, []);

  const toggle = async (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem("workshop:checklist", JSON.stringify(next)); } catch {}
  };

  const done = items.filter(i => checked[i.id]).length;

  return (
    <div>
      <div style={{ marginBottom: "1rem", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#00C389" }}>
        {done}/{items.length} erledigt
      </div>
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => toggle(item.id)}
          style={{
            display: "flex", alignItems: "flex-start", gap: "0.75rem",
            padding: "0.6rem 0.75rem", marginBottom: "0.4rem",
            background: checked[item.id] ? "rgba(0,195,137,0.06)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${checked[item.id] ? "rgba(0,195,137,0.2)" : "rgba(255,255,255,0.06)"}`,
            borderRadius: "8px", cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <div style={{
            width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0, marginTop: "1px",
            border: `2px solid ${checked[item.id] ? "#00C389" : "#444"}`,
            background: checked[item.id] ? "#00C389" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            {checked[item.id] && <span style={{ color: "#000", fontSize: "11px", fontWeight: 800 }}>✓</span>}
          </div>
          <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
          <span style={{
            color: checked[item.id] ? "#555" : "#ccc",
            fontSize: "0.9rem", lineHeight: 1.5,
            textDecoration: checked[item.id] ? "line-through" : "none",
            transition: "all 0.2s",
          }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

// ─── FAHRGEMEINSCHAFT BLOCK ───────────────────────────────────────────────────
const TEILNEHMER = [
  "Dominik Baukholt","Timo Jeddeloh","Markus Berghaus","Dieter Budden",
  "Martina von Dzwonkowski","André Fisse","André Jestadt","Thomas Leenderts",
  "Stefan Meyer","Andreas Nyhof","Jens Schneider","Thorsten Soppa",
  "Marco van der Spek","Björn Willers","Sebastian Diekmann","Clara Evers",
];

function FahrgemeinschaftBlock() {
  const [data, setData] = useState(null);
  const [myName, setMyName] = useState("");
  const [myRole, setMyRole] = useState("fahrer");
  const [myOrt, setMyOrt] = useState("");
  const [myPlaetze, setMyPlaetze] = useState(1);
  const [saved, setSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
    const t = setInterval(loadData, 8000);
    return () => clearInterval(t);
  }, []);

  const loadData = async () => {
    try {
      const r = await window.storage.get("workshop:fahrgemeinschaft", true);
      setData(r ? JSON.parse(r.value) : { eintraege: [] });
    } catch { setData({ eintraege: [] }); }
  };

  const save = async () => {
    if (!myName || !myOrt) return;
    const current = data || { eintraege: [] };
    const filtered = current.eintraege.filter(e => e.name !== myName);
    const next = {
      eintraege: [...filtered, {
        name: myName,
        rolle: myRole,
        ort: myOrt,
        plaetze: myRole === "fahrer" ? myPlaetze : 0,
        ts: Date.now(),
      }]
    };
    try {
      await window.storage.set("workshop:fahrgemeinschaft", JSON.stringify(next), true);
      setData(next);
      setSaved(true);
      setShowForm(false);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
  };

  const fahrer = (data?.eintraege || []).filter(e => e.rolle === "fahrer");
  const mitfahrer = (data?.eintraege || []).filter(e => e.rolle === "mitfahrer");

  return (
    <div>
      {/* Übersicht */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        {/* Fahrer */}
        <div>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#00C389", fontFamily: "'DM Mono', monospace", marginBottom: "0.75rem" }}>
            🚗 FAHRER ({fahrer.length})
          </div>
          {fahrer.length === 0 && <div style={{ color: "#444", fontSize: "0.8rem", fontStyle: "italic" }}>Noch kein Eintrag</div>}
          {fahrer.map((e, i) => (
            <div key={i} style={{
              background: "rgba(0,195,137,0.05)", border: "1px solid rgba(0,195,137,0.15)",
              borderRadius: "8px", padding: "0.6rem 0.75rem", marginBottom: "0.4rem"
            }}>
              <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>{e.name}</div>
              <div style={{ color: "#888", fontSize: "0.75rem" }}>ab {e.ort} · {e.plaetze} freie {e.plaetze === 1 ? "Platz" : "Plätze"}</div>
            </div>
          ))}
        </div>
        {/* Mitfahrer */}
        <div>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#E8622A", fontFamily: "'DM Mono', monospace", marginBottom: "0.75rem" }}>
            🙋 SUCHE MITFAHRT ({mitfahrer.length})
          </div>
          {mitfahrer.length === 0 && <div style={{ color: "#444", fontSize: "0.8rem", fontStyle: "italic" }}>Noch kein Eintrag</div>}
          {mitfahrer.map((e, i) => (
            <div key={i} style={{
              background: "rgba(232,98,42,0.05)", border: "1px solid rgba(232,98,42,0.15)",
              borderRadius: "8px", padding: "0.6rem 0.75rem", marginBottom: "0.4rem"
            }}>
              <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>{e.name}</div>
              <div style={{ color: "#888", fontSize: "0.75rem" }}>von {e.ort}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Eintragen Button */}
      {saved && <div style={{ color: "#00C389", fontSize: "0.85rem", marginBottom: "0.75rem" }}>✓ Gespeichert!</div>}
      {!showForm ? (
        <button onClick={() => setShowForm(true)} style={{
          background: "rgba(232,98,42,0.1)", border: "1px solid rgba(232,98,42,0.3)",
          borderRadius: "8px", padding: "0.6rem 1.25rem", color: "#E8622A",
          cursor: "pointer", fontSize: "0.85rem", fontWeight: 600
        }}>+ Ich trage mich ein</button>
      ) : (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.25rem" }}>
          {/* Name */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ color: "#888", fontSize: "0.75rem", display: "block", marginBottom: "0.3rem" }}>Dein Name</label>
            <select value={myName} onChange={e => setMyName(e.target.value)} style={{
              width: "100%", background: "#111", border: "1px solid #333", borderRadius: "6px",
              padding: "0.5rem 0.75rem", color: myName ? "#fff" : "#555", fontSize: "0.9rem"
            }}>
              <option value="">-- Name wählen --</option>
              {TEILNEHMER.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          {/* Rolle */}
          <div style={{ marginBottom: "0.75rem", display: "flex", gap: "0.5rem" }}>
            {["fahrer", "mitfahrer"].map(r => (
              <button key={r} onClick={() => setMyRole(r)} style={{
                flex: 1, padding: "0.5rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600,
                background: myRole === r ? "rgba(0,195,137,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${myRole === r ? "rgba(0,195,137,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: myRole === r ? "#00C389" : "#666",
              }}>{r === "fahrer" ? "🚗 Ich fahre" : "🙋 Ich suche Mitfahrt"}</button>
            ))}
          </div>
          {/* Ort */}
          <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ color: "#888", fontSize: "0.75rem", display: "block", marginBottom: "0.3rem" }}>{myRole === "fahrer" ? "Startort" : "Abholort"}</label>
            <input value={myOrt} onChange={e => setMyOrt(e.target.value)} placeholder="z.B. Oldenburg, Rastede..."
              style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: "6px", padding: "0.5rem 0.75rem", color: "#fff", fontSize: "0.9rem", boxSizing: "border-box" }} />
          </div>
          {/* Plätze (nur Fahrer) */}
          {myRole === "fahrer" && (
            <div style={{ marginBottom: "0.75rem" }}>
              <label style={{ color: "#888", fontSize: "0.75rem", display: "block", marginBottom: "0.3rem" }}>Freie Plätze</label>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {[1,2,3,4].map(n => (
                  <button key={n} onClick={() => setMyPlaetze(n)} style={{
                    width: "40px", height: "36px", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 700,
                    background: myPlaetze === n ? "rgba(0,195,137,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${myPlaetze === n ? "rgba(0,195,137,0.4)" : "rgba(255,255,255,0.08)"}`,
                    color: myPlaetze === n ? "#00C389" : "#666",
                  }}>{n}</button>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={save} style={{
              background: "rgba(0,195,137,0.15)", border: "1px solid rgba(0,195,137,0.4)",
              borderRadius: "8px", padding: "0.6rem 1.25rem", color: "#00C389",
              cursor: "pointer", fontSize: "0.85rem", fontWeight: 600
            }}>Speichern</button>
            <button onClick={() => setShowForm(false)} style={{
              background: "none", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px", padding: "0.6rem 1rem", color: "#555",
              cursor: "pointer", fontSize: "0.85rem"
            }}>Abbrechen</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ unlocked, onToggle, onClose }) {
  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: "320px",
      background: "#0a0a0a", borderLeft: "1px solid rgba(0,195,137,0.2)",
      padding: "2rem", zIndex: 1000, overflowY: "auto",
      boxShadow: "-20px 0 60px rgba(0,0,0,0.8)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div style={{ color: "#00C389", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.15em" }}>ADMIN PANEL</div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
      </div>

      <div style={{ color: "#555", fontSize: "0.75rem", marginBottom: "1.5rem" }}>
        Phasen freischalten → Teilnehmer sehen Inhalte sofort.
      </div>

      {PHASES_CONFIG.map(phase => {
        const isUnlocked = unlocked.includes(phase.id);
        return (
          <div key={phase.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)"
          }}>
            <div>
              <div style={{ color: "#ccc", fontSize: "0.85rem", fontWeight: 500 }}>{phase.title}</div>
              <div style={{ color: "#555", fontSize: "0.7rem" }}>{phase.label}</div>
            </div>
            <button
              onClick={() => onToggle(phase.id)}
              style={{
                background: isUnlocked ? "rgba(0,195,137,0.2)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${isUnlocked ? "rgba(0,195,137,0.5)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "20px", padding: "0.35rem 0.9rem",
                color: isUnlocked ? "#00C389" : "#555",
                cursor: "pointer", fontSize: "0.75rem", fontWeight: 600,
                transition: "all 0.2s"
              }}
            >{isUnlocked ? "Aktiv" : "Gesperrt"}</button>
          </div>
        );
      })}

      <div style={{ marginTop: "2rem", padding: "1rem", background: "rgba(0,195,137,0.05)", borderRadius: "8px" }}>
        <div style={{ color: "#555", fontSize: "0.7rem" }}>Alle freischalten</div>
        <button
          onClick={() => PHASES_CONFIG.forEach(p => { if (!unlocked.includes(p.id)) onToggle(p.id); })}
          style={{
            marginTop: "0.5rem", background: "rgba(0,195,137,0.1)",
            border: "1px solid rgba(0,195,137,0.3)", borderRadius: "8px",
            padding: "0.5rem 1rem", color: "#00C389", cursor: "pointer", fontSize: "0.8rem", width: "100%"
          }}>Alle freischalten</button>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
    }}>
      <div style={{
        background: "#0f0f0f", border: "1px solid rgba(0,195,137,0.2)",
        borderRadius: "16px", padding: "2.5rem", width: "320px"
      }}>
        <div style={{ color: "#00C389", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: "1.5rem" }}>ADMIN ZUGANG</div>
        <input
          type="password"
          placeholder="Passwort"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => { if (e.key === "Enter") { if (pw === ADMIN_PASSWORD) onSuccess(); else setErr(true); } }}
          style={{
            width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${err ? "#ff4444" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "8px", padding: "0.75rem 1rem", color: "#fff", fontSize: "0.9rem",
            outline: "none", boxSizing: "border-box", marginBottom: "1rem"
          }}
        />
        {err && <div style={{ color: "#ff4444", fontSize: "0.8rem", marginBottom: "0.75rem" }}>Falsches Passwort</div>}
        <button
          onClick={() => { if (pw === ADMIN_PASSWORD) onSuccess(); else setErr(true); }}
          style={{
            width: "100%", background: "rgba(0,195,137,0.15)", border: "1px solid rgba(0,195,137,0.4)",
            borderRadius: "8px", padding: "0.75rem", color: "#00C389",
            cursor: "pointer", fontWeight: 600
          }}>Einloggen</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [unlocked, setUnlocked] = useState([1]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getUnlockedPhases().then(p => { setUnlocked(p); setLoaded(true); });
  }, []);

  const togglePhase = async (id) => {
    const isUnlocked = unlocked.includes(id);
    let next;
    if (isUnlocked && id !== 1) {
      next = unlocked.filter(p => p !== id);
    } else if (!isUnlocked) {
      next = [...unlocked, id];
      setNewlyUnlocked(prev => [...prev, id]);
      setTimeout(() => setNewlyUnlocked(prev => prev.filter(p => p !== id)), 2000);
    } else return;
    setUnlocked(next);
    await setUnlockedPhases(next);
  };

  if (!loaded) return (
    <div style={{ background: "#080808", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#333", fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em" }}>LADEN...</div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #080808; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: rgba(0,195,137,0.3); border-radius: 2px; }
      `}</style>

      <div style={{
        background: "#080808", minHeight: "100vh",
        fontFamily: "'Syne', sans-serif", color: "#fff",
        paddingRight: adminOpen ? "320px" : "0", transition: "padding-right 0.4s ease"
      }}>
        {/* Hintergrund-Akzent */}
        <div style={{
          position: "fixed", top: "-20%", right: "-10%", width: "60vw", height: "60vw",
          background: "radial-gradient(circle, rgba(0,195,137,0.04) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />

        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "4rem 2rem 6rem", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{
              fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#00C389", fontFamily: "'DM Mono', monospace", marginBottom: "1rem"
            }}>Workshop FK-Team Steuerung & Sondertechnik · 21.–22. April 2026</div>
            <h1 style={{
              fontSize: "clamp(2rem, 6.5vw, 4.5rem)", fontWeight: 800, margin: 0,
              lineHeight: 1.05, letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.3))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>Neues entdecken<br />und machen.</h1>
          </div>

          <Countdown />

          {/* Phasen */}
          <div style={{ marginTop: "3rem" }}>
            {PHASES_CONFIG.map(phase => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                unlocked={unlocked.includes(phase.id)}
                isNew={newlyUnlocked.includes(phase.id)}
              />
            ))}
          </div>

          {/* Admin Trigger */}
          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <button
              onClick={() => { if (adminAuth) setAdminOpen(true); else setShowLogin(true); }}
              style={{
                background: "none", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px", padding: "0.5rem 1.5rem",
                color: "#333", cursor: "pointer", fontSize: "0.7rem",
                letterSpacing: "0.15em", fontFamily: "'DM Mono', monospace",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.target.style.color = "#00C389"; e.target.style.borderColor = "rgba(0,195,137,0.3)"; }}
              onMouseLeave={e => { e.target.style.color = "#333"; e.target.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >⚙ ADMIN</button>
          </div>
        </div>
      </div>

      {showLogin && <AdminLogin onSuccess={() => { setAdminAuth(true); setShowLogin(false); setAdminOpen(true); }} />}
      {adminOpen && adminAuth && (
        <AdminPanel unlocked={unlocked} onToggle={togglePhase} onClose={() => setAdminOpen(false)} />
      )}
    </>
  );
}
