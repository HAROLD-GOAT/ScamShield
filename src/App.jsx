import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "container dark" : "container"}>
      
      {/* Bottom Nav */}
      <div className="nav">
        <button onClick={() => setScreen("home")}>Home</button>
        <button onClick={() => setScreen("analysis")}>Analysis</button>
        <button onClick={() => setScreen("results")}>Results</button>
        <button onClick={() => setScreen("action")}>Action</button>
        <button onClick={() => setDark(!dark)}>Theme</button>
      </div>

      {screen === "home" && <Home setScreen={setScreen} />}
      {screen === "analysis" && <Analysis setScreen={setScreen} />}
      {screen === "results" && <Results setScreen={setScreen} />}
      {screen === "action" && <Action setScreen={setScreen} />}
    </div>
  );
}

/* ---------------- HOME ---------------- */

function Home({ setScreen }) {
  return (
    <div>
      <h1>ScamShield</h1>
      <p className="subtitle">Upload or paste a conversation for AI scam detection</p>

      <div className="card">
        <h2>Upload Conversation</h2>

        <input type="file" accept="audio/*,video/*,.txt" />

        <textarea placeholder="Or paste transcript here..." rows="6" />

        <button onClick={() => setScreen("analysis")}>
          Analyze
        </button>
      </div>
    </div>
  );
}

/* ---------------- ANALYSIS ---------------- */

function Analysis({ setScreen }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 30);

    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <h1>Analyzing</h1>
      <p className="subtitle">Scanning for scam patterns...</p>

      <div className="card">
        <div className="bar">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="small">{progress}% complete</p>
      </div>

      {progress === 100 && (
        <button onClick={() => setScreen("results")}>
          View Results
        </button>
      )}
    </div>
  );
}

/* ---------------- RESULTS ---------------- */

function Results({ setScreen }) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 2;
      if (i >= 82) {
        i = 82;
        clearInterval(t);
      }
      setFill(i);
    }, 20);
  }, []);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (fill / 100) * circumference;

  return (
    <div>
      <h1>Result</h1>

      <div className="card center">

        <div className="circle">
          <svg width="180" height="180">
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#eee"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#ef4444"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
            />
          </svg>

          <div className="circleText">
            <h2>{fill}%</h2>
            <p>Scam Risk</p>
          </div>
        </div>

      </div>

      <div className="card">
        <h2>Risk Factors</h2>
        <ul>
          <li>Upfront payment requested</li>
          <li>Unrealistic job offer</li>
          <li>Urgency pressure tactics</li>
          <li>No verification possible</li>
        </ul>
      </div>

      <button onClick={() => setScreen("action")}>
        Continue →
      </button>
    </div>
  );
}

/* ---------------- ACTION ---------------- */

function Action() {
  return (
    <div>
      <h1>Action Center</h1>

      <div className="card">
        <h2>Report Scam</h2>
        <button>Generate Report</button>
      </div>

      <div className="card">
        <h2>Protection</h2>
        <button>Safety Tips</button>
      </div>

      <div className="card">
        <h2>Real Jobs</h2>
        <button>View Opportunities</button>
      </div>

      <div className="final">
        Confusion → Analysis → Clarity → Action
      </div>
    </div>
  );
}