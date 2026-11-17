require("dotenv").config();
const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change-this-admin-password";
const SESSION_SECRET = process.env.SESSION_SECRET || "development-only-change-me";

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, "vibecheck.sqlite"));
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS quiz_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    result_type TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    answers_json TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "30kb" }));
app.use(session({
  name: "vibecheck.sid",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 8
  }
}));

const quizLimiter = rateLimit({ windowMs: 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false });

app.use(express.static(path.join(__dirname, "public")));

function safeEqual(a, b) {
  const aa = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}
function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  return res.status(401).json({ error: "Admin login required." });
}

db.exec(`
  CREATE TABLE IF NOT EXISTS challenge_votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id TEXT NOT NULL,
    choice TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(challenge_id, choice, id)
  );
`);

const dailyChallenges = [
  {
    id: "challenge-1",
    question: "Would you rather read minds or become invisible?",
    options: ["Read minds", "Become invisible"]
  },
  {
    id: "challenge-2",
    question: "Choose your dream life!",
    options: ["Rich but alone", "Happy with friends"]
  },
  {
    id: "challenge-3",
    question: "Which superpower would you choose?",
    options: ["Time travel", "Teleportation"]
  }
];

app.get("/api/challenge/today", (req, res) => {
  const day = Math.floor(Date.now() / 86400000);
  const challenge = dailyChallenges[day % dailyChallenges.length];

  const votes = db.prepare(`
    SELECT choice, COUNT(*) AS count
    FROM challenge_votes
    WHERE challenge_id = ?
    GROUP BY choice
  `).all(challenge.id);

  res.json({ ...challenge, votes });
});
app.get("/api/challenge/leaderboard", (req, res) => {
  const rows = db.prepare(`
    SELECT challenge_id, choice, COUNT(*) AS count
    FROM challenge_votes
    GROUP BY challenge_id, choice
  `).all();

  const leaderboard = dailyChallenges.map(challenge => {
    const votes = rows.filter(v => v.challenge_id === challenge.id);
    const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);

    return {
      id: challenge.id,
      question: challenge.question,
      totalVotes,
      votes
    };
  }).sort((a, b) => b.totalVotes - a.totalVotes);

  res.json({ leaderboard });
});

app.post("/api/challenge/vote", quizLimiter, (req, res) => {
  const { challengeId, choice } = req.body || {};
  const validChallenge = dailyChallenges.find(c => c.id === challengeId);

  if (!validChallenge || !validChallenge.options.includes(choice)) {
    return res.status(400).json({ error: "Invalid vote." });
  }

  db.prepare(`
    INSERT INTO challenge_votes (challenge_id, choice)
    VALUES (?, ?)
  `).run(challengeId, choice);

  res.json({ ok: true });
});


const allowedResults = new Set(["chaos_creator", "quiet_observer", "main_character", "good_vibes"]);
app.post("/api/quiz", quizLimiter, (req, res) => {
  const { resultType, language = "en", answers = [] } = req.body || {};
  if (!allowedResults.has(resultType)) return res.status(400).json({ error: "Invalid quiz result." });
  if (!["en", "hi"].includes(language)) return res.status(400).json({ error: "Invalid language." });
  if (!Array.isArray(answers) || answers.length > 20) return res.status(400).json({ error: "Invalid answers." });

  const cleanAnswers = answers.map(a => ({
    question: String(a.question || "").slice(0, 180),
    answer: String(a.answer || "").slice(0, 180)
  }));
  const info = db.prepare(
    "INSERT INTO quiz_results (result_type, language, answers_json) VALUES (?, ?, ?)"
  ).run(resultType, language, JSON.stringify(cleanAnswers));

  res.status(201).json({ ok: true, resultId: info.lastInsertRowid });
});

app.post("/api/admin/login", loginLimiter, (req, res) => {
  const password = req.body && req.body.password;
  if (!password || !safeEqual(password, ADMIN_PASSWORD)) {
    return res.status(401).json({ error: "Incorrect password." });
  }
  req.session.isAdmin = true;
  res.json({ ok: true });
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get("/api/admin/me", (req, res) => {
  res.json({ authenticated: !!(req.session && req.session.isAdmin) });
});

app.get("/api/admin/stats", requireAdmin, (req, res) => {
  const total = db.prepare("SELECT COUNT(*) AS count FROM quiz_results").get().count;
  const today = db.prepare("SELECT COUNT(*) AS count FROM quiz_results WHERE date(created_at) = date('now')").get().count;
  const results = db.prepare(`
    SELECT result_type AS type, COUNT(*) AS count
    FROM quiz_results GROUP BY result_type ORDER BY count DESC
  `).all();
  const recent = db.prepare(`
    SELECT id, result_type AS type, language, created_at AS createdAt
    FROM quiz_results ORDER BY id DESC LIMIT 20
  `).all();
  res.json({ total, today, results, recent });
});

app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "public", "admin.html")));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => {
  console.log(`VIBECHECK is running at http://localhost:${PORT}`);
});
