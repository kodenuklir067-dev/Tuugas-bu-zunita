import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap, Shield, Clock, Star, ChevronRight, X, Check,
  Search, Gamepad2, Crown, Sparkles, Wallet, QrCode,
  History, Trash2, Bug, Send, Mail, MessageCircle, AlertTriangle
} from "lucide-react";

const GAMES = [
  {
    id: "mobile-legends",
    name: "Mobile Legends",
    subtitle: "Bang Bang",
    category: "MOBA",
    currency: "Diamonds",
    colors: { from: "#1a6fff", to: "#00d4ff", glow: "#00d4ff" },
    tag: "TERPOPULER",
    packages: [
      { id: 1, amount: "86 Diamonds", price: 17000, bonus: "" },
      { id: 2, amount: "172 Diamonds", price: 34000, bonus: "" },
      { id: 3, amount: "257 Diamonds", price: 50000, bonus: "" },
      { id: 4, amount: "514 Diamonds", price: 99000, bonus: "+50 Bonus", hot: true },
      { id: 5, amount: "1070 Diamonds", price: 199000, bonus: "+100 Bonus" },
      { id: 6, amount: "2195 Diamonds", price: 399000, bonus: "+250 Bonus" },
    ],
  },
  {
    id: "genshin-impact",
    name: "Genshin Impact",
    subtitle: "HoYoverse",
    category: "RPG",
    currency: "Genesis Crystals",
    colors: { from: "#6c3fff", to: "#bf00ff", glow: "#bf00ff" },
    tag: "HOT",
    packages: [
      { id: 1, amount: "60 Crystals", price: 15000, bonus: "" },
      { id: 2, amount: "300 Crystals", price: 75000, bonus: "+30 Bonus", hot: true },
      { id: 3, amount: "980 Crystals", price: 240000, bonus: "+110 Bonus" },
      { id: 4, amount: "1980 Crystals", price: 480000, bonus: "+260 Bonus" },
      { id: 5, amount: "3280 Crystals", price: 780000, bonus: "+600 Bonus" },
      { id: 6, amount: "6480 Crystals", price: 1560000, bonus: "+1600 Bonus" },
    ],
  },
  {
    id: "honkai-star-rail",
    name: "Honkai: Star Rail",
    subtitle: "HoYoverse",
    category: "Turn-Based RPG",
    currency: "Oneiric Shards",
    colors: { from: "#ff6b35", to: "#ff0080", glow: "#ff0080" },
    tag: "NEW",
    packages: [
      { id: 1, amount: "60 Shards", price: 15000, bonus: "" },
      { id: 2, amount: "300 Shards", price: 75000, bonus: "+30 Bonus", hot: true },
      { id: 3, amount: "980 Shards", price: 240000, bonus: "+110 Bonus" },
      { id: 4, amount: "1980 Shards", price: 480000, bonus: "+260 Bonus" },
      { id: 5, amount: "3280 Shards", price: 780000, bonus: "+600 Bonus" },
      { id: 6, amount: "6480 Shards", price: 1560000, bonus: "+1600 Bonus" },
    ],
  },
  {
    id: "free-fire",
    name: "Free Fire",
    subtitle: "Garena",
    category: "Battle Royale",
    currency: "Diamonds",
    colors: { from: "#ff8c00", to: "#ff4500", glow: "#ff6000" },
    tag: "TERPOPULER",
    packages: [
      { id: 1, amount: "70 Diamonds", price: 15000, bonus: "" },
      { id: 2, amount: "140 Diamonds", price: 29000, bonus: "" },
      { id: 3, amount: "355 Diamonds", price: 75000, bonus: "", hot: true },
      { id: 4, amount: "720 Diamonds", price: 150000, bonus: "+20 Bonus" },
      { id: 5, amount: "1450 Diamonds", price: 299000, bonus: "+50 Bonus" },
      { id: 6, amount: "2900 Diamonds", price: 599000, bonus: "+100 Bonus" },
    ],
  },
  {
    id: "roblox",
    name: "Roblox",
    subtitle: "Roblox Corporation",
    category: "Metaverse",
    currency: "Robux",
    colors: { from: "#00aa44", to: "#00ff88", glow: "#00dd66" },
    tag: "",
    packages: [
      { id: 1, amount: "400 Robux", price: 60000, bonus: "" },
      { id: 2, amount: "800 Robux", price: 115000, bonus: "" },
      { id: 3, amount: "1700 Robux", price: 230000, bonus: "", hot: true },
      { id: 4, amount: "4500 Robux", price: 575000, bonus: "+100 Bonus" },
      { id: 5, amount: "10000 Robux", price: 1150000, bonus: "+200 Bonus" },
    ],
  },
  {
    id: "honor-of-kings",
    name: "Honor of Kings",
    subtitle: "TiMi Studio",
    category: "MOBA",
    currency: "Token",
    colors: { from: "#c0820d", to: "#ffd700", glow: "#e8b800" },
    tag: "HOT",
    packages: [
      { id: 1, amount: "50 Token", price: 10000, bonus: "" },
      { id: 2, amount: "100 Token", price: 20000, bonus: "" },
      { id: 3, amount: "250 Token", price: 48000, bonus: "+10 Bonus", hot: true },
      { id: 4, amount: "500 Token", price: 95000, bonus: "+25 Bonus" },
      { id: 5, amount: "1000 Token", price: 189000, bonus: "+60 Bonus" },
      { id: 6, amount: "2000 Token", price: 375000, bonus: "+150 Bonus" },
    ],
  },
  {
    id: "neverness-to-everness",
    name: "Neverness to Everness",
    subtitle: "HoYoverse",
    category: "Open World",
    currency: "Echo Crystals",
    colors: { from: "#5500dd", to: "#00aaff", glow: "#4488ff" },
    tag: "NEW",
    packages: [
      { id: 1, amount: "60 Crystals", price: 15000, bonus: "" },
      { id: 2, amount: "300 Crystals", price: 75000, bonus: "+30 Bonus", hot: true },
      { id: 3, amount: "980 Crystals", price: 240000, bonus: "+110 Bonus" },
      { id: 4, amount: "1980 Crystals", price: 480000, bonus: "+260 Bonus" },
      { id: 5, amount: "3280 Crystals", price: 780000, bonus: "+600 Bonus" },
    ],
  },
  {
    id: "minecraft",
    name: "Minecraft",
    subtitle: "Mojang Studios",
    category: "Sandbox",
    currency: "Minecoins",
    colors: { from: "#3a6600", to: "#6ec207", glow: "#5aaa00" },
    tag: "",
    packages: [
      { id: 1, amount: "320 Minecoins", price: 28000, bonus: "" },
      { id: 2, amount: "840 Minecoins", price: 70000, bonus: "", hot: true },
      { id: 3, amount: "1720 Minecoins", price: 135000, bonus: "" },
      { id: 4, amount: "3500 Minecoins", price: 265000, bonus: "+100 Bonus" },
    ],
  },
  {
    id: "pubg",
    name: "PUBG Mobile",
    subtitle: "Krafton",
    category: "Battle Royale",
    currency: "UC",
    colors: { from: "#b07800", to: "#f5c518", glow: "#ddaa00" },
    tag: "TERPOPULER",
    packages: [
      { id: 1, amount: "60 UC", price: 15000, bonus: "" },
      { id: 2, amount: "325 UC", price: 75000, bonus: "", hot: true },
      { id: 3, amount: "660 UC", price: 149000, bonus: "+10 Bonus" },
      { id: 4, amount: "1800 UC", price: 399000, bonus: "+60 Bonus" },
      { id: 5, amount: "3850 UC", price: 799000, bonus: "+175 Bonus" },
      { id: 6, amount: "8100 UC", price: 1599000, bonus: "+450 Bonus" },
    ],
  },
  {
    id: "valorant",
    name: "Valorant",
    subtitle: "Riot Games",
    category: "Tactical Shooter",
    currency: "VP",
    colors: { from: "#cc0022", to: "#ff5566", glow: "#ff2244" },
    tag: "HOT",
    packages: [
      { id: 1, amount: "475 VP", price: 50000, bonus: "" },
      { id: 2, amount: "1000 VP", price: 100000, bonus: "" },
      { id: 3, amount: "2050 VP", price: 200000, bonus: "+150 Bonus", hot: true },
      { id: 4, amount: "3650 VP", price: 350000, bonus: "+350 Bonus" },
      { id: 5, amount: "5350 VP", price: 500000, bonus: "+700 Bonus" },
      { id: 6, amount: "11000 VP", price: 1000000, bonus: "+2000 Bonus" },
    ],
  },
  {
    id: "delta-force",
    name: "Delta Force",
    subtitle: "Team Jade",
    category: "FPS",
    currency: "Coins",
    colors: { from: "#1a4a7a", to: "#2288dd", glow: "#1a88ff" },
    tag: "NEW",
    packages: [
      { id: 1, amount: "100 Coins", price: 15000, bonus: "" },
      { id: 2, amount: "300 Coins", price: 45000, bonus: "" },
      { id: 3, amount: "800 Coins", price: 115000, bonus: "+50 Bonus", hot: true },
      { id: 4, amount: "1600 Coins", price: 225000, bonus: "+120 Bonus" },
      { id: 5, amount: "4000 Coins", price: 549000, bonus: "+400 Bonus" },
    ],
  },
];

const FEATURES = [
  { icon: Zap, title: "Proses Instan", desc: "Top up langsung masuk dalam hitungan detik tanpa menunggu lama." },
  { icon: Shield, title: "100% Aman", desc: "Transaksi terenkripsi penuh. Data dan akun kamu selalu terlindungi." },
  { icon: Star, title: "Harga Terjangkau", desc: "Harga kompetitif dengan bonus lebih banyak dari platform lain." },
  { icon: Clock, title: "24/7 Aktif", desc: "Layanan beroperasi penuh setiap hari tanpa gangguan waktu." },
];

const PAYMENT_METHODS = [
  {
    id: "dana",
    name: "DANA",
    desc: "Dompet digital",
    icon: Wallet,
    color: "#118EEA",
    bg: "rgba(17,142,234,0.12)",
    border: "rgba(17,142,234,0.35)",
  },
  {
    id: "qris",
    name: "QRIS",
    desc: "Scan QR code",
    icon: QrCode,
    color: "#E63946",
    bg: "rgba(230,57,70,0.12)",
    border: "rgba(230,57,70,0.35)",
  },
];

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

/* ====================== TRANSAKSI: TIPE & KEAMANAN DATA ======================
   Catatan: project ini murni frontend (belum ada backend/server). Lapisan di
   bawah ini adalah hardening sisi-klien (sanitasi input, validasi ketat,
   guard rate-limit, defensive parsing) untuk mencegah penyalahgunaan dasar
   seperti XSS lewat teks bebas, data localStorage yang dirusak manual lewat
   devtools, atau spam submit. Untuk keamanan penuh (anti-SQLi, auth, rate
   limit server, dsb) tetap WAJIB divalidasi ulang di backend saat dibuatkan. */

type Transaction = {
  id: string;
  gameId: string;
  gameName: string;
  packageAmount: string;
  price: number;
  paymentName: string;
  userId: string; // sudah dimasking, bukan ID asli mentah
  timestamp: number;
  status: "Berhasil";
  rating: number | null; // 1-5, null = belum dirating
};

const TX_STORAGE_KEY = "nexustop_transactions_v1";
const TX_MAX_COUNT = 200; // cegah localStorage membengkak tak terbatas

// Whitelist karakter aman untuk teks bebas (nama, deskripsi bug, dll).
// Dilakukan walau React sudah auto-escape JSX, sebagai lapisan tambahan.
function sanitizeText(input: string, maxLen = 300): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

// User ID game: hanya alfanumerik, underscore, strip, spasi. Mencegah karakter
// aneh/payload disisipkan lewat field ini.
function sanitizeUserId(input: string): string {
  return input.replace(/[^a-zA-Z0-9_\-\s]/g, "").slice(0, 24);
}

function maskUserId(id: string): string {
  const clean = sanitizeUserId(id).trim();
  if (clean.length === 0) return "****";
  if (clean.length <= 4) return clean.replace(/./g, "*");
  return clean.slice(0, 3) + "***" + clean.slice(-2);
}

function isValidEmailOrPhone(v: string): boolean {
  const value = v.trim();
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone = /^\+?\d{8,15}$/;
  return email.test(value) || phone.test(value.replace(/[\s-]/g, ""));
}

function isValidTransaction(t: unknown): t is Transaction {
  if (!t || typeof t !== "object") return false;
  const tx = t as Record<string, unknown>;
  return (
    typeof tx.id === "string" &&
    typeof tx.gameId === "string" &&
    typeof tx.gameName === "string" &&
    typeof tx.packageAmount === "string" &&
    typeof tx.price === "number" && tx.price >= 0 &&
    typeof tx.paymentName === "string" &&
    typeof tx.userId === "string" &&
    typeof tx.timestamp === "number" &&
    tx.status === "Berhasil" &&
    (tx.rating === null || (typeof tx.rating === "number" && tx.rating >= 1 && tx.rating <= 5))
  );
}

// Defensive parsing: data di localStorage bisa saja dirusak manual lewat
// devtools, jadi tiap entry divalidasi ketat sebelum dipakai/ditampilkan.
function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(TX_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidTransaction).slice(0, TX_MAX_COUNT);
  } catch {
    return [];
  }
}

function saveTransactions(txs: Transaction[]) {
  try {
    localStorage.setItem(TX_STORAGE_KEY, JSON.stringify(txs.slice(0, TX_MAX_COUNT)));
  } catch {
    // localStorage penuh/nonaktif (mis. mode private) — biarkan gagal diam,
    // state di memori (React) tetap jalan normal.
  }
}

function generateTransactionId(): string {
  const rand = (typeof crypto !== "undefined" && "randomUUID" in crypto)
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10);
  return "TRX-" + Date.now().toString(36).toUpperCase() + "-" + rand.toUpperCase();
}

const GAME_LOGOS: Record<string, (color: string) => React.ReactNode> = {
  "mobile-legends": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Diamond shape */}
      <polygon points="24,4 42,18 24,44 6,18" fill={c} opacity="0.15" />
      <polygon points="24,4 42,18 24,44 6,18" fill="none" stroke={c} strokeWidth="2" />
      {/* Sword */}
      <line x1="24" y1="8" x2="24" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="20" x2="32" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="10" r="2.5" fill="white" />
    </svg>
  ),
  "genshin-impact": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wind/element symbol */}
      <circle cx="24" cy="24" r="18" stroke={c} strokeWidth="1.5" opacity="0.4" />
      {/* Anemo-style swirl */}
      <path d="M24 10 C32 14 36 22 30 26 C24 30 16 26 20 20 C22 17 26 17 24 10Z" fill={c} opacity="0.8" />
      <path d="M24 38 C16 34 12 26 18 22 C24 18 32 22 28 28 C26 31 22 31 24 38Z" fill="white" opacity="0.7" />
      <circle cx="24" cy="24" r="3" fill="white" />
    </svg>
  ),
  "honkai-star-rail": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Star shape */}
      <polygon points="24,4 27.5,16 40,16 30,24 33.5,36 24,29 14.5,36 18,24 8,16 20.5,16" fill={c} opacity="0.25" stroke={c} strokeWidth="1.2" />
      {/* Rail line */}
      <line x1="8" y1="36" x2="40" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="40" x2="40" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="20" r="4" fill="white" />
    </svg>
  ),
  "free-fire": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <path d="M24 6 C20 12 14 16 14 24 C14 32 18 40 24 42 C30 40 34 32 34 24 C34 16 28 12 24 6Z" fill={c} opacity="0.3" />
      <path d="M24 14 C22 18 18 21 18 26 C18 31 20.5 36 24 38 C27.5 36 30 31 30 26 C30 21 26 18 24 14Z" fill={c} opacity="0.7" />
      <path d="M24 22 C22.5 25 22 27 22 29 C22 32 22.8 34 24 35 C25.2 34 26 32 26 29 C26 27 25.5 25 24 22Z" fill="white" opacity="0.9" />
    </svg>
  ),
  "roblox": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tilted square logo */}
      <rect x="12" y="12" width="24" height="24" rx="3" fill={c} opacity="0.25" stroke={c} strokeWidth="1.5" transform="rotate(15 24 24)" />
      {/* Inner detail */}
      <rect x="17" y="17" width="6" height="6" rx="1" fill="white" opacity="0.9" />
      <rect x="25" y="17" width="6" height="6" rx="1" fill="white" opacity="0.6" />
      <rect x="17" y="25" width="6" height="6" rx="1" fill="white" opacity="0.6" />
      <rect x="25" y="25" width="6" height="6" rx="1" fill="white" opacity="0.9" />
    </svg>
  ),
  "honor-of-kings": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crown */}
      <path d="M8 34 L12 18 L20 26 L24 10 L28 26 L36 18 L40 34 Z" fill={c} opacity="0.3" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="8" y1="38" x2="40" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Gems on crown */}
      <circle cx="12" cy="19" r="2" fill="white" opacity="0.9" />
      <circle cx="24" cy="11" r="2.5" fill="white" />
      <circle cx="36" cy="19" r="2" fill="white" opacity="0.9" />
    </svg>
  ),
  "neverness-to-everness": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Infinity portal */}
      <ellipse cx="17" cy="24" rx="9" ry="12" stroke={c} strokeWidth="2" fill={c} opacity="0.1" />
      <ellipse cx="31" cy="24" rx="9" ry="12" stroke={c} strokeWidth="2" fill={c} opacity="0.1" />
      {/* Inner glow */}
      <ellipse cx="17" cy="24" rx="5" ry="8" fill="white" opacity="0.15" />
      <ellipse cx="31" cy="24" rx="5" ry="8" fill="white" opacity="0.15" />
      <circle cx="24" cy="24" r="3" fill="white" opacity="0.9" />
      <line x1="24" y1="12" x2="24" y2="36" stroke="white" strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  "minecraft": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Creeper face */}
      <rect x="8" y="8" width="32" height="32" rx="2" fill={c} opacity="0.2" stroke={c} strokeWidth="1.5" />
      {/* Eyes */}
      <rect x="13" y="15" width="7" height="7" rx="1" fill="white" opacity="0.9" />
      <rect x="28" y="15" width="7" height="7" rx="1" fill="white" opacity="0.9" />
      {/* Mouth */}
      <rect x="18" y="25" width="4" height="4" rx="0.5" fill="white" opacity="0.7" />
      <rect x="26" y="25" width="4" height="4" rx="0.5" fill="white" opacity="0.7" />
      <rect x="18" y="29" width="12" height="4" rx="0.5" fill="white" opacity="0.5" />
    </svg>
  ),
  "pubg": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Helmet shape */}
      <path d="M24 6 C13 6 8 14 8 22 L8 30 C8 33 10 35 13 35 L14 35 L14 38 L34 38 L34 35 L35 35 C38 35 40 33 40 30 L40 22 C40 14 35 6 24 6Z" fill={c} opacity="0.25" stroke={c} strokeWidth="1.5" />
      {/* Visor */}
      <path d="M12 22 L36 22 L36 28 C36 29.5 34.5 31 33 31 L15 31 C13.5 31 12 29.5 12 28 Z" fill="white" opacity="0.2" />
      <line x1="12" y1="22" x2="36" y2="22" stroke="white" strokeWidth="1.5" />
      {/* Pan silhouette */}
      <circle cx="36" cy="38" r="5" fill={c} opacity="0.5" stroke="white" strokeWidth="1.5" />
      <line x1="40" y1="38" x2="46" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "valorant": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* V shape - Valorant style */}
      <path d="M6 8 L24 36 L42 8" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8 L24 24 L34 8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* slash lines */}
      <line x1="28" y1="30" x2="42" y2="38" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="6" y1="38" x2="20" y2="30" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
  "delta-force": (c) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crosshair / target */}
      <circle cx="24" cy="24" r="16" stroke={c} strokeWidth="1.5" opacity="0.4" />
      <circle cx="24" cy="24" r="8" stroke={c} strokeWidth="1.5" opacity="0.7" />
      <circle cx="24" cy="24" r="2.5" fill="white" />
      {/* Cross lines */}
      <line x1="24" y1="6" x2="24" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="34" x2="24" y2="42" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="24" x2="14" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="24" x2="42" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

function GameIcon({ game, size = 52 }: { game: typeof GAMES[0]; size?: number }) {
  const logo = GAME_LOGOS[game.id];
  return (
    <div
      className="rounded-xl flex items-center justify-center select-none flex-shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${game.colors.from}22, ${game.colors.to}18)`,
        border: `1px solid ${game.colors.glow}30`,
        boxShadow: `0 0 ${size * 0.3}px ${game.colors.glow}40`,
        padding: size * 0.1,
      }}
    >
      {logo ? logo(game.colors.to) : (
        <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: size * 0.28, fontWeight: 900, color: game.colors.to }}>
          {game.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

const TAG_COLORS: Record<string, { text: string; border: string; bg: string }> = {
  TERPOPULER: { text: "#00d4ff", border: "rgba(0,212,255,0.35)", bg: "rgba(0,212,255,0.08)" },
  HOT: { text: "#ff6060", border: "rgba(255,96,96,0.35)", bg: "rgba(255,96,96,0.08)" },
  NEW: { text: "#00ff88", border: "rgba(0,255,136,0.35)", bg: "rgba(0,255,136,0.08)" },
};

function GameCard({ game, onClick }: { game: typeof GAMES[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const tagStyle = game.tag ? TAG_COLORS[game.tag] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className="rounded-2xl overflow-hidden border transition-all duration-300 h-full"
        style={{
          background: "linear-gradient(160deg, #0d0d22 0%, #07071a 100%)",
          borderColor: hovered ? `${game.colors.glow}50` : "rgba(255,255,255,0.06)",
          boxShadow: hovered
            ? `0 8px 32px ${game.colors.glow}25, 0 0 0 1px ${game.colors.glow}30`
            : "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        {/* color bar */}
        <div
          className="h-[3px] w-full"
          style={{
            background: `linear-gradient(90deg, ${game.colors.from}, ${game.colors.to})`,
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.3s",
          }}
        />

        <div className="p-4 flex flex-col gap-3">
          {/* top row: icon + tag */}
          <div className="flex items-start justify-between gap-2">
            <GameIcon game={game} size={48} />
            {tagStyle && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
                style={{
                  color: tagStyle.text,
                  border: `1px solid ${tagStyle.border}`,
                  background: tagStyle.bg,
                  fontFamily: "JetBrains Mono, monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {game.tag}
              </span>
            )}
          </div>

          {/* name + subtitle */}
          <div>
            <h3
              className="font-bold text-foreground leading-snug"
              style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.8rem", letterSpacing: "0.01em" }}
            >
              {game.name}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">{game.subtitle}</p>
          </div>

          {/* bottom row: category + arrow */}
          <div className="flex items-center justify-between pt-0.5 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-md"
              style={{
                background: `${game.colors.from}15`,
                color: game.colors.to,
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {game.category}
            </span>
            <div
              className="flex items-center gap-0.5 text-[11px] font-semibold transition-all duration-200"
              style={{ color: hovered ? game.colors.to : "#5a6a8a" }}
            >
              <span>Top Up</span>
              <ChevronRight
                size={12}
                style={{ transform: hovered ? "translateX(2px)" : "translateX(0)", transition: "transform 0.2s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TopUpModal({
  game,
  onClose,
  onOrderSuccess,
}: {
  game: typeof GAMES[0];
  onClose: () => void;
  onOrderSuccess: (tx: Transaction) => void;
}) {
  const [selectedPkg, setSelectedPkg] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [isProcessing, setIsProcessing] = useState(false);

  const pkg = game.packages.find((p) => p.id === selectedPkg);
  const payment = PAYMENT_METHODS.find((m) => m.id === selectedPayment);
  const canProceed = selectedPkg !== null && selectedPayment !== null && userId.trim().length > 0;

  const handleConfirm = () => setStep("confirm");
  const handlePay = () => {
    // Guard: cegah submit ganda (klik berkali-kali / event terduplikasi)
    if (isProcessing || !pkg || !payment) return;
    setIsProcessing(true);

    const newTx: Transaction = {
      id: generateTransactionId(),
      gameId: game.id,
      gameName: game.name,
      packageAmount: pkg.amount,
      price: pkg.price,
      paymentName: payment.name,
      userId: maskUserId(userId),
      timestamp: Date.now(),
      status: "Berhasil",
      rating: null,
    };

    window.setTimeout(() => {
      onOrderSuccess(newTx);
      setStep("success");
      setIsProcessing(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(2,2,12,0.88)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d0d22, #07071a)",
          border: `1px solid ${game.colors.glow}35`,
          boxShadow: `0 0 60px ${game.colors.glow}18, 0 24px 60px rgba(0,0,0,0.6)`,
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* top bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${game.colors.from}, ${game.colors.to})` }}
        />

        <div className="p-5">
          {/* header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <GameIcon game={game} size={44} />
              <div>
                <h2
                  className="font-bold text-foreground leading-tight"
                  style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.95rem" }}
                >
                  {game.name}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">{game.currency}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <X size={18} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                {/* User ID */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    User ID
                  </label>
                  <input
                    type="text"
                    placeholder={`Masukkan ID akun ${game.name}`}
                    value={userId}
                    onChange={(e) => setUserId(sanitizeUserId(e.target.value))}
                    maxLength={24}
                    autoComplete="off"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all"
                    style={{
                      background: "#0a0a1c",
                      border: `1px solid ${userId ? game.colors.glow + "45" : "rgba(255,255,255,0.07)"}`,
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  />
                </div>

                {/* Packages */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Pilih Paket
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {game.packages.map((pkg) => {
                      const active = selectedPkg === pkg.id;
                      return (
                        <motion.button
                          key={pkg.id}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedPkg(pkg.id)}
                          className="relative text-left rounded-xl p-3 border transition-all duration-200"
                          style={{
                            background: active ? `${game.colors.from}14` : "#0a0a1c",
                            borderColor: active ? game.colors.glow + "60" : "rgba(255,255,255,0.06)",
                            boxShadow: active ? `0 0 14px ${game.colors.glow}25` : "none",
                          }}
                        >
                          {pkg.hot && (
                            <span
                              className="absolute -top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${game.colors.from}, ${game.colors.to})`,
                                color: "#fff",
                                fontFamily: "JetBrains Mono, monospace",
                              }}
                            >
                              BEST
                            </span>
                          )}
                          <div
                            className="font-bold text-xs leading-tight mb-1"
                            style={{
                              color: active ? game.colors.to : "#c0d0e8",
                              fontFamily: "Orbitron, sans-serif",
                              fontSize: "0.72rem",
                            }}
                          >
                            {pkg.amount}
                          </div>
                          {pkg.bonus && (
                            <div
                              className="text-[10px] mb-1"
                              style={{ color: game.colors.to, fontFamily: "JetBrains Mono, monospace", opacity: 0.8 }}
                            >
                              {pkg.bonus}
                            </div>
                          )}
                          <div className="text-[11px] font-semibold" style={{ color: active ? "#e0e8ff" : "#5a6a8a" }}>
                            {formatRupiah(pkg.price)}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Metode Pembayaran
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map((method) => {
                      const active = selectedPayment === method.id;
                      return (
                        <motion.button
                          key={method.id}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedPayment(method.id)}
                          className="flex items-center gap-3 rounded-xl p-3 border transition-all duration-200 w-full"
                          style={{
                            background: active ? method.bg : "#0a0a1c",
                            borderColor: active ? method.border : "rgba(255,255,255,0.06)",
                            boxShadow: active ? `0 0 14px ${method.color}20` : "none",
                          }}
                        >
                          {/* icon circle */}
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: active ? method.bg : "rgba(255,255,255,0.04)",
                              border: `1px solid ${active ? method.border : "rgba(255,255,255,0.06)"}`,
                            }}
                          >
                            <method.icon size={18} style={{ color: active ? method.color : "#5a6a8a" }} />
                          </div>
                          <div className="text-left">
                            <div
                              className="font-bold text-sm leading-tight"
                              style={{
                                color: active ? method.color : "#c0d0e8",
                                fontFamily: "Orbitron, sans-serif",
                                fontSize: "0.8rem",
                              }}
                            >
                              {method.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">{method.desc}</div>
                          </div>
                          {active && (
                            <div className="ml-auto">
                              <Check size={14} style={{ color: method.color }} />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Summary bar */}
                <AnimatePresence>
                  {selectedPkg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 px-4 py-3 rounded-xl flex items-center justify-between overflow-hidden"
                      style={{
                        background: `${game.colors.from}10`,
                        border: `1px solid ${game.colors.glow}25`,
                      }}
                    >
                      <div className="text-xs text-muted-foreground">
                        {game.packages.find((p) => p.id === selectedPkg)?.amount}
                      </div>
                      <div
                        className="font-bold"
                        style={{ color: game.colors.to, fontFamily: "Orbitron, sans-serif", fontSize: "0.95rem" }}
                      >
                        {formatRupiah(game.packages.find((p) => p.id === selectedPkg)!.price)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={canProceed ? { scale: 1.01 } : {}}
                  whileTap={canProceed ? { scale: 0.98 } : {}}
                  onClick={canProceed ? handleConfirm : undefined}
                  className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    background: canProceed
                      ? `linear-gradient(90deg, ${game.colors.from}, ${game.colors.to})`
                      : "#111128",
                    color: canProceed ? "#fff" : "#3a4a6a",
                    cursor: canProceed ? "pointer" : "not-allowed",
                    boxShadow: canProceed ? `0 0 20px ${game.colors.glow}35` : "none",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  <Zap size={15} />
                  Lanjutkan Pembayaran
                </motion.button>
              </motion.div>
            )}

            {step === "confirm" && pkg && payment && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <h3
                  className="font-bold text-foreground mb-4 text-center"
                  style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.9rem" }}
                >
                  Konfirmasi Order
                </h3>

                <div
                  className="rounded-xl overflow-hidden mb-4"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {[
                    { label: "Game", value: game.name },
                    { label: "User ID", value: userId },
                    { label: "Paket", value: pkg.amount },
                    { label: "Metode", value: payment.name },
                    { label: "Total", value: formatRupiah(pkg.price), highlight: true },
                  ].map((row, i) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between px-4 py-2.5"
                      style={{
                        background: i % 2 === 0 ? "#0a0a1c" : "#080818",
                        borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      }}
                    >
                      <span className="text-xs text-muted-foreground">{row.label}</span>
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color: row.highlight ? game.colors.to : "#e0e8ff",
                          fontFamily: row.highlight ? "Orbitron, sans-serif" : "JetBrains Mono, monospace",
                          fontSize: row.highlight ? "0.95rem" : "0.75rem",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* QRIS QR mock */}
                {payment.id === "qris" && (
                  <div
                    className="flex flex-col items-center p-5 rounded-xl mb-4"
                    style={{ background: "#0a0a1c", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <p className="text-xs text-muted-foreground mb-3">Scan QR untuk membayar</p>
                    <div
                      className="w-36 h-36 rounded-xl flex items-center justify-center"
                      style={{ background: "#fff" }}
                    >
                      <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
                        <rect width="112" height="112" fill="white" />
                        {/* QR pattern mock */}
                        <rect x="4" y="4" width="40" height="40" rx="4" fill="#111" />
                        <rect x="8" y="8" width="32" height="32" rx="2" fill="white" />
                        <rect x="12" y="12" width="24" height="24" rx="1" fill="#111" />
                        <rect x="68" y="4" width="40" height="40" rx="4" fill="#111" />
                        <rect x="72" y="8" width="32" height="32" rx="2" fill="white" />
                        <rect x="76" y="12" width="24" height="24" rx="1" fill="#111" />
                        <rect x="4" y="68" width="40" height="40" rx="4" fill="#111" />
                        <rect x="8" y="72" width="32" height="32" rx="2" fill="white" />
                        <rect x="12" y="76" width="24" height="24" rx="1" fill="#111" />
                        {[52,60,68,76,84].map((x) =>
                          [4,12,20,28,36,52,60,68,76,84,92,100].map((y) =>
                            Math.abs(x + y) % 17 < 6 ? (
                              <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#111" />
                            ) : null
                          )
                        )}
                        {[4,12,20,28,36].map((x) =>
                          [52,60,68,76,84,92,100].map((y) =>
                            Math.abs(x * y) % 13 < 5 ? (
                              <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#111" />
                            ) : null
                          )
                        )}
                      </svg>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-3">
                      Berlaku 10 menit · {formatRupiah(pkg.price)}
                    </p>
                  </div>
                )}

                {/* DANA info mock */}
                {payment.id === "dana" && (
                  <div
                    className="p-4 rounded-xl mb-4 flex items-center gap-3"
                    style={{ background: "rgba(17,142,234,0.08)", border: "1px solid rgba(17,142,234,0.25)" }}
                  >
                    <Wallet size={20} style={{ color: "#118EEA" }} />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Transfer ke DANA</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        No. DANA: <span className="font-mono text-foreground">0812-3456-7890</span>
                      </p>
                      <p className="text-[10px] text-muted-foreground">a.n. NexusTop Official</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep("form")}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    style={{ background: "#0a0a1c", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "Orbitron, sans-serif", fontSize: "0.75rem" }}
                  >
                    Kembali
                  </button>
                  <motion.button
                    whileTap={isProcessing ? {} : { scale: 0.97 }}
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="flex-[2] py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(90deg, ${game.colors.from}, ${game.colors.to})`,
                      color: "#fff",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "0.75rem",
                      boxShadow: `0 0 20px ${game.colors.glow}35`,
                      opacity: isProcessing ? 0.65 : 1,
                      cursor: isProcessing ? "not-allowed" : "pointer",
                    }}
                  >
                    <Check size={14} />
                    {isProcessing ? "Memproses..." : "Konfirmasi Bayar"}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === "success" && pkg && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `linear-gradient(135deg, ${game.colors.from}, ${game.colors.to})`, boxShadow: `0 0 32px ${game.colors.glow}40` }}
                >
                  <Check size={36} className="text-white" strokeWidth={2.5} />
                </motion.div>
                <h3
                  className="text-lg font-bold text-foreground mb-1.5"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  Pembayaran Berhasil!
                </h3>
                <p className="text-sm text-muted-foreground mb-1">{pkg.amount}</p>
                <p className="text-xs text-muted-foreground mb-4">
                  dikirim ke ID:{" "}
                  <span style={{ color: game.colors.to, fontFamily: "JetBrains Mono, monospace" }}>
                    {userId}
                  </span>
                </p>
                <div
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6"
                  style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}
                >
                  <Check size={11} strokeWidth={3} />
                  Item dalam proses pengiriman
                </div>
                <button
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-xl font-bold text-sm"
                  style={{
                    background: `linear-gradient(90deg, ${game.colors.from}, ${game.colors.to})`,
                    color: "#fff",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.8rem",
                  }}
                >
                  Selesai
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TransactionRow({ tx, onRate }: { tx: Transaction; onRate: (rating: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const formatted = new Date(tx.timestamp).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border"
      style={{ background: "linear-gradient(160deg, #0d0d22, #07071a)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff8888" }} />
        <div className="min-w-0">
          <div className="font-bold text-xs text-foreground truncate" style={{ fontFamily: "Orbitron, sans-serif" }}>
            {tx.gameName} · {tx.packageAmount}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5 truncate" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {tx.id} · ID {tx.userId} · {tx.paymentName} · {formatted}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 pl-5 sm:pl-0">
        <span className="text-xs font-bold" style={{ color: "#00d4ff", fontFamily: "Orbitron, sans-serif" }}>
          {formatRupiah(tx.price)}
        </span>
        <span
          className="text-[10px] font-semibold px-2 py-1 rounded-full"
          style={{ background: "rgba(0,255,136,0.1)", color: "#00ff88", border: "1px solid rgba(0,255,136,0.25)" }}
        >
          {tx.status}
        </span>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => {
            const filled = tx.rating !== null ? s <= tx.rating : hovered !== null ? s <= hovered : false;
            const locked = tx.rating !== null;
            return (
              <button
                key={s}
                type="button"
                disabled={locked}
                onMouseEnter={() => !locked && setHovered(s)}
                onMouseLeave={() => !locked && setHovered(null)}
                onClick={() => !locked && onRate(s)}
                aria-label={`Beri rating ${s} bintang`}
                style={{ background: "transparent", border: "none", padding: 1, cursor: locked ? "default" : "pointer" }}
              >
                <Star size={13} fill={filled ? "#ffc400" : "none"} style={{ color: "#ffc400" }} strokeWidth={1.5} />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function BugReportCard() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [desc, setDesc] = useState("");
  // Honeypot: field tersembunyi dari mata manusia (lewat CSS), tapi bot
  // form-filler otomatis biasanya tetap mengisinya. Kalau terisi -> diam-diam ditolak.
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (honeypot.trim().length > 0) {
      // Kemungkinan besar bot. Pura-pura sukses, jangan beri sinyal apa pun.
      setSent(true);
      return;
    }

    // Rate-limit sisi klien: 1 laporan / 30 detik per sesi, cegah spam submit.
    if (lastSentAt && Date.now() - lastSentAt < 30000) {
      setError("Tunggu beberapa detik sebelum mengirim laporan lagi.");
      return;
    }

    const cleanContact = sanitizeText(contact, 100);
    const cleanDesc = sanitizeText(desc, 500);

    if (!isValidEmailOrPhone(cleanContact)) {
      setError("Masukkan email atau nomor WhatsApp yang valid.");
      return;
    }
    if (cleanDesc.length < 10) {
      setError("Jelaskan bug yang kamu temui (minimal 10 karakter).");
      return;
    }

    // CATATAN: form ini baru tervalidasi & tersanitasi di sisi klien.
    // Saat backend tersedia, sambungkan endpoint di sini dan WAJIB validasi
    // ulang semua input di server (jangan percaya validasi klien saja).
    setLastSentAt(Date.now());
    setSent(true);
    setName("");
    setContact("");
    setDesc("");
  };

  if (sent) {
    return (
      <div
        className="p-6 rounded-2xl border text-center"
        style={{ background: "linear-gradient(160deg, #0d0d22, #07071a)", borderColor: "rgba(0,255,136,0.25)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}
        >
          <Check size={22} style={{ color: "#00ff88" }} strokeWidth={2.5} />
        </div>
        <p className="text-sm font-semibold text-foreground mb-1">Laporan terkirim!</p>
        <p className="text-xs text-muted-foreground mb-4">Tim kami akan segera mengeceknya. Makasih udah bantu jaga NexusTop tetap aman 🙌</p>
        <button
          onClick={() => setSent(false)}
          className="text-xs px-4 py-2 rounded-lg font-semibold"
          style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)", cursor: "pointer" }}
        >
          Kirim laporan lain
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-2xl border flex flex-col gap-3"
      style={{ background: "linear-gradient(160deg, #0d0d22, #07071a)", borderColor: "rgba(255,85,102,0.2)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,85,102,0.1)", border: "1px solid rgba(255,85,102,0.25)" }}
        >
          <Bug size={16} style={{ color: "#ff5566" }} />
        </div>
        <div>
          <div className="text-xs font-bold text-foreground uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Laporkan Bug
          </div>
          <div className="text-[10px] text-muted-foreground">Bantu kami perbaiki masalah di website ini</div>
        </div>
      </div>

      {/* Honeypot anti-bot — disembunyikan dari pengguna asli */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <input
        type="text"
        placeholder="Nama (opsional)"
        value={name}
        maxLength={50}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none"
        style={{ background: "#0a0a1c", border: "1px solid rgba(255,255,255,0.07)" }}
      />
      <input
        type="text"
        placeholder="Email atau No. WhatsApp"
        value={contact}
        maxLength={100}
        onChange={(e) => setContact(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none"
        style={{ background: "#0a0a1c", border: "1px solid rgba(255,255,255,0.07)" }}
      />
      <textarea
        placeholder="Jelaskan bug yang kamu temui..."
        value={desc}
        maxLength={500}
        rows={3}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
        style={{ background: "#0a0a1c", border: "1px solid rgba(255,255,255,0.07)" }}
      />

      {error && (
        <p className="text-xs flex items-center gap-1.5" style={{ color: "#ff5566" }}>
          <AlertTriangle size={12} /> {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(90deg, #00d4ff, #bf00ff)", color: "#fff", fontFamily: "Orbitron, sans-serif", fontSize: "0.78rem", cursor: "pointer" }}
      >
        <Send size={14} /> Kirim Laporan
      </button>
    </form>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2.5 + 1,
            height: Math.random() * 2.5 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#bf00ff" : "#ff0080",
          }}
          animate={{ y: [0, -28, 0], opacity: [0.08, 0.55, 0.08] }}
          transition={{
            duration: 3.5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const WORDS = ["CEPAT", "AMAN", "MURAH", "INSTAN"];

export default function App() {
  const [activeGame, setActiveGame] = useState<typeof GAMES[0] | null>(null);
  const [search, setSearch] = useState("");
  const [titleWord, setTitleWord] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const gameSectionRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTitleWord((w) => (w + 1) % WORDS.length), 2200);
    return () => clearInterval(interval);
  }, []);

  // Riwayat transaksi dimuat sekali saat halaman dibuka (persist via localStorage)
  useEffect(() => {
    setTransactions(loadTransactions());
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Order baru otomatis muncul paling atas di Riwayat Transaksi, langsung tersimpan
  const handleOrderSuccess = (tx: Transaction) => {
    setTransactions((prev) => {
      const next = [tx, ...prev].slice(0, TX_MAX_COUNT);
      saveTransactions(next);
      return next;
    });
  };

  const handleRateTransaction = (id: string, rating: number) => {
    if (rating < 1 || rating > 5) return; // guard nilai rating tidak valid
    setTransactions((prev) => {
      const next = prev.map((t) => (t.id === id && t.rating === null ? { ...t, rating } : t));
      saveTransactions(next);
      return next;
    });
  };

  const handleClearTransactions = () => {
    if (!window.confirm("Hapus semua riwayat transaksi di perangkat ini? Tindakan ini tidak bisa dibatalkan.")) return;
    setTransactions([]);
    saveTransactions([]);
  };

  const NAV_LINKS: { label: string; action: () => void }[] = [
    { label: "Beranda", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Game", action: () => scrollToSection(gameSectionRef) },
    { label: "Cara Order", action: () => scrollToSection(howItWorksRef) },
    { label: "Kontak", action: () => scrollToSection(contactRef) },
  ];

  const filtered = GAMES.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen text-foreground" style={{ background: "#03030f", fontFamily: "Inter, sans-serif" }}>
      {/* grid bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

      {/* NAVBAR */}
      <nav
        className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(3,3,15,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(0,212,255,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-5 h-15 flex items-center justify-between" style={{ height: 60 }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00d4ff, #bf00ff)" }}>
              <Gamepad2 size={14} className="text-white" />
            </div>
            <span className="font-black tracking-wider" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1rem" }}>
              NEXUS<span style={{ color: "#00d4ff" }}>TOP</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-4 py-1.5 text-xs font-bold rounded-lg border transition-all duration-200"
              style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00d4ff", fontFamily: "Orbitron, sans-serif" }}
            >
              Masuk
            </button>
            <button
              className="px-4 py-1.5 text-xs font-bold rounded-lg"
              style={{ background: "linear-gradient(90deg, #00d4ff, #bf00ff)", color: "#fff", fontFamily: "Orbitron, sans-serif" }}
            >
              Daftar
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-16 pb-20 px-5 overflow-hidden">
        <FloatingParticles />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #00d4ff06 0%, transparent 70%)" }} />
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #bf00ff06 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border text-xs font-semibold"
            style={{ background: "rgba(0,212,255,0.05)", borderColor: "rgba(0,212,255,0.18)", color: "#00d4ff", fontFamily: "JetBrains Mono, monospace" }}
          >
            <Sparkles size={11} />
            Platform Top Up Game #1 Indonesia
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-black leading-none mb-3"
            style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(2.4rem, 6.5vw, 4.5rem)" }}
          >
            TOP UP GAME
            <br />
            <span className="inline-block overflow-hidden align-bottom" style={{ height: "1.15em" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleWord}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="inline-block"
                  style={{
                    background: "linear-gradient(90deg, #00d4ff, #bf00ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {WORDS[titleWord]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-muted-foreground mb-7 max-w-md mx-auto leading-relaxed"
          >
            Top up diamond, UC, Robux, dan mata uang game favoritmu dengan proses instan, harga terbaik, dan layanan 24 jam.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="relative max-w-sm mx-auto mb-9"
          >
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari game favorit kamu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all"
              style={{ background: "rgba(10,10,28,0.8)", border: "1px solid rgba(0,212,255,0.12)" }}
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="flex justify-center gap-10"
          >
            {[{ label: "Transaksi", value: "2.4M+" }, { label: "Pengguna", value: "850K+" }, { label: "Game", value: "11+" }].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-black text-xl mb-0.5"
                  style={{ fontFamily: "Orbitron, sans-serif", background: "linear-gradient(90deg, #00d4ff, #bf00ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {s.value}
                </div>
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GAME GRID */}
      <section ref={gameSectionRef} className="px-5 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-foreground" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.1rem" }}>
                {search ? `Hasil "${search}"` : "Semua Game"}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} game tersedia</p>
            </div>
            <div
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)", color: "#00d4ff", fontFamily: "JetBrains Mono, monospace" }}
            >
              <Crown size={11} />
              Top Games
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))" }}
              >
                {filtered.map((game) => (
                  <GameCard key={game.id} game={game} onClick={() => setActiveGame(game)} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 text-muted-foreground"
              >
                <Gamepad2 size={40} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">Game tidak ditemukan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={howItWorksRef} className="px-5 py-20" style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.02) 50%, transparent)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-foreground mb-2" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.2rem" }}>
              CARA ORDER
            </h2>
            <p className="text-sm text-muted-foreground">3 langkah mudah, top up langsung masuk</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Pilih Game", desc: "Pilih game yang ingin kamu top up dari katalog kami." },
              { step: "02", title: "Masukkan ID", desc: "Input User ID akun game kamu dan pilih nominal paket." },
              { step: "03", title: "Bayar & Selesai", desc: "Pilih metode bayar, konfirmasi, dan item langsung masuk!" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-2xl border text-center"
                style={{ background: "linear-gradient(160deg, #0d0d22, #07071a)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="text-5xl font-black mb-3 leading-none"
                  style={{ fontFamily: "Orbitron, sans-serif", background: "linear-gradient(90deg, #00d4ff30, #bf00ff30)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "brightness(3)" }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-1.5" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.85rem" }}>
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RIWAYAT TRANSAKSI */}
      <section className="px-5 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="text-center sm:text-left">
              <h2
                className="font-bold text-foreground mb-2 flex items-center gap-2 justify-center sm:justify-start"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.2rem" }}
              >
                <History size={18} style={{ color: "#00d4ff" }} />
                RIWAYAT TRANSAKSI
              </h2>
              <p className="text-sm text-muted-foreground">Histori top up kamu, tersimpan otomatis di perangkat ini</p>
            </div>

            {/* Rating layanan keseluruhan (statis, indikator kepercayaan platform) */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border flex-shrink-0"
              style={{ background: "linear-gradient(160deg, #0d0d22, #07071a)", borderColor: "rgba(255,196,0,0.25)" }}
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={15} fill="#ffc400" style={{ color: "#ffc400" }} strokeWidth={1.5} />
                ))}
              </div>
              <div>
                <div className="font-bold text-sm leading-none" style={{ fontFamily: "Orbitron, sans-serif", color: "#ffc400" }}>
                  4.9 / 5
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">12.400+ ulasan pengguna</div>
              </div>
            </div>
          </div>

          {transactions.length === 0 ? (
            <div
              className="text-center py-14 rounded-2xl border"
              style={{ background: "linear-gradient(160deg, #0d0d22, #07071a)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <Gamepad2 size={36} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm text-muted-foreground mb-4">Belum ada riwayat transaksi di perangkat ini.</p>
              <button
                type="button"
                onClick={() => scrollToSection(gameSectionRef)}
                className="px-5 py-2 rounded-xl text-xs font-bold"
                style={{ background: "linear-gradient(90deg, #00d4ff, #bf00ff)", color: "#fff", fontFamily: "Orbitron, sans-serif", cursor: "pointer" }}
              >
                Top Up Sekarang
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-3">
                <button
                  type="button"
                  onClick={handleClearTransactions}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <Trash2 size={12} /> Hapus Riwayat
                </button>
              </div>
              <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-1">
                {transactions.map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} onRate={(r) => handleRateTransaction(tx.id, r)} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>


      <section className="px-5 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-bold text-foreground mb-2" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.2rem" }}>
              METODE PEMBAYARAN
            </h2>
            <p className="text-sm text-muted-foreground">Bayar dengan mudah via dompet digital favorit kamu</p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {PAYMENT_METHODS.map((method, i) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border"
                style={{ background: "linear-gradient(160deg, #0d0d22, #07071a)", borderColor: `${method.color}25` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: method.bg, border: `1px solid ${method.border}` }}
                >
                  <method.icon size={22} style={{ color: method.color }} />
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm text-foreground" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.85rem" }}>
                    {method.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{method.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-5 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-foreground mb-2" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.2rem" }}>
              KENAPA NEXUSTOP?
            </h2>
            <p className="text-sm text-muted-foreground">Keunggulan yang membuat kami berbeda</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-2xl border"
                style={{ background: "linear-gradient(160deg, #0d0d22, #07071a)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <f.icon size={18} style={{ color: "#00d4ff" }} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.8rem" }}>
                    {f.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK — paling bawah, kartu lapor bug */}
      <section ref={contactRef} className="px-5 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-bold text-foreground mb-2" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.2rem" }}>
              KONTAK KAMI
            </h2>
            <p className="text-sm text-muted-foreground">Nemu bug atau ada kendala? Kabari kami di bawah ini</p>
          </div>

          <BugReportCard />

          <div className="flex items-center justify-center gap-3 mt-5">
            <a
              href="#"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg border"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg border"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <Mail size={13} /> Email
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-5 py-8" style={{ borderColor: "rgba(0,212,255,0.07)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00d4ff, #bf00ff)" }}>
              <Gamepad2 size={12} className="text-white" />
            </div>
            <span className="font-black text-sm tracking-wider" style={{ fontFamily: "Orbitron, sans-serif" }}>
              NEXUS<span style={{ color: "#00d4ff" }}>TOP</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 NexusTop. Platform top up game terpercaya Indonesia.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privasi
            </a>
            <button
              type="button"
              onClick={() => scrollToSection(contactRef)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit" }}
            >
              Kontak
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {activeGame && <TopUpModal game={activeGame} onClose={() => setActiveGame(null)} onOrderSuccess={handleOrderSuccess} />}
      </AnimatePresence>
    </div>
  );
}
