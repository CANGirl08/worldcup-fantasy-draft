import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALL_TEAMS = [
  { name: "France", flag: "🇫🇷", group: "I", rank: 1, tier: 1 },
  { name: "Spain", flag: "🇪🇸", group: "H", rank: 2, tier: 1 },
  { name: "Argentina", flag: "🇦🇷", group: "J", rank: 3, tier: 1 },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L", rank: 4, tier: 1 },
  { name: "Portugal", flag: "🇵🇹", group: "K", rank: 5, tier: 1 },
  { name: "Brazil", flag: "🇧🇷", group: "C", rank: 6, tier: 1 },
  { name: "Netherlands", flag: "🇳🇱", group: "F", rank: 7, tier: 1 },
  { name: "Morocco", flag: "🇲🇦", group: "C", rank: 8, tier: 1 },
  { name: "Belgium", flag: "🇧🇪", group: "G", rank: 9, tier: 1 },
  { name: "Germany", flag: "🇩🇪", group: "E", rank: 10, tier: 1 },
  { name: "Croatia", flag: "🇭🇷", group: "L", rank: 11, tier: 2 },
  { name: "Colombia", flag: "🇨🇴", group: "K", rank: 13, tier: 2 },
  { name: "Senegal", flag: "🇸🇳", group: "I", rank: 14, tier: 2 },
  { name: "Mexico", flag: "🇲🇽", group: "A", rank: 15, tier: 2 },
  { name: "United States", flag: "🇺🇸", group: "D", rank: 16, tier: 2 },
  { name: "Uruguay", flag: "🇺🇾", group: "H", rank: 17, tier: 2 },
  { name: "Japan", flag: "🇯🇵", group: "F", rank: 18, tier: 2 },
  { name: "Switzerland", flag: "🇨🇭", group: "B", rank: 19, tier: 2 },
  { name: "Iran", flag: "🇮🇷", group: "G", rank: 21, tier: 2 },
  { name: "Austria", flag: "🇦🇹", group: "J", rank: 23, tier: 2 },
  { name: "Ecuador", flag: "🇪🇨", group: "E", rank: 24, tier: 2 },
  { name: "South Korea", flag: "🇰🇷", group: "A", rank: 25, tier: 2 },
  { name: "Australia", flag: "🇦🇺", group: "D", rank: 27, tier: 2 },
  { name: "Egypt", flag: "🇪🇬", group: "G", rank: 37, tier: 3 },
  { name: "Canada", flag: "🇨🇦", group: "B", rank: 30, tier: 3 },
  { name: "Ivory Coast", flag: "🇨🇮", group: "E", rank: 33, tier: 3 },
  { name: "Qatar", flag: "🇶🇦", group: "B", rank: 35, tier: 3 },
  { name: "Algeria", flag: "🇩🇿", group: "J", rank: 36, tier: 3 },
  { name: "Sweden", flag: "🇸🇪", group: "F", rank: 39, tier: 3 },
  { name: "Tunisia", flag: "🇹🇳", group: "F", rank: 47, tier: 3 },
  { name: "Czechia", flag: "🇨🇿", group: "A", rank: 41, tier: 3 },
  { name: "Türkiye", flag: "🇹🇷", group: "D", rank: 42, tier: 3 },
  { name: "Norway", flag: "🇳🇴", group: "I", rank: 32, tier: 3 },
  { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", rank: 43, tier: 3 },
  { name: "DR Congo", flag: "🇨🇩", group: "K", rank: 55, tier: 4 },
  { name: "Bosnia & Herz.", flag: "🇧🇦", group: "B", rank: 71, tier: 4 },
  { name: "Panama", flag: "🇵🇦", group: "L", rank: 51, tier: 4 },
  { name: "Saudi Arabia", flag: "🇸🇦", group: "H", rank: 58, tier: 4 },
  { name: "South Africa", flag: "🇿🇦", group: "A", rank: 60, tier: 4 },
  { name: "Iraq", flag: "🇮🇶", group: "I", rank: 56, tier: 4 },
  { name: "Paraguay", flag: "🇵🇾", group: "D", rank: 38, tier: 3 },
  { name: "Ghana", flag: "🇬🇭", group: "E", rank: 73, tier: 4 },
  { name: "New Zealand", flag: "🇳🇿", group: "L", rank: 88, tier: 4 },
  { name: "Haiti", flag: "🇭🇹", group: "C", rank: 79, tier: 4 },
  { name: "Jordan", flag: "🇯🇴", group: "J", rank: 64, tier: 4 },
  { name: "Uzbekistan", flag: "🇺🇿", group: "G", rank: 57, tier: 4 },
  { name: "Cape Verde", flag: "🇨🇻", group: "H", rank: 70, tier: 4 },
  { name: "Curaçao", flag: "🇨🇼", group: "A", rank: 81, tier: 4 },
];

// Group stage matches — all 72 (3 matchdays × 12 groups × 2 matches/day)
const GROUP_MATCHES = [
  // June 11
  { id: "g1", date: "Jun 11", time: "3:00 PM ET", home: "Mexico", away: "South Africa", group: "A", venue: "Estadio Azteca, Mexico City" },
  { id: "g2", date: "Jun 11", time: "10:00 PM ET", home: "South Korea", away: "Czechia", group: "A", venue: "Estadio Akron, Zapopan" },
  // June 12
  { id: "g3", date: "Jun 12", time: "3:00 PM ET", home: "Canada", away: "Bosnia & Herz.", group: "B", venue: "BMO Field, Toronto" },
  { id: "g4", date: "Jun 12", time: "9:00 PM ET", home: "United States", away: "Paraguay", group: "D", venue: "SoFi Stadium, Inglewood" },
  // June 13
  { id: "g5", date: "Jun 13", time: "3:00 PM ET", home: "Qatar", away: "Switzerland", group: "B", venue: "Levi's Stadium, Santa Clara" },
  { id: "g6", date: "Jun 13", time: "6:00 PM ET", home: "Brazil", away: "Morocco", group: "C", venue: "MetLife Stadium, East Rutherford" },
  { id: "g7", date: "Jun 13", time: "9:00 PM ET", home: "Haiti", away: "Scotland", group: "C", venue: "Gillette Stadium, Foxborough" },
  // June 14
  { id: "g8", date: "Jun 14", time: "12:00 AM ET", home: "Australia", away: "Türkiye", group: "D", venue: "BC Place, Vancouver" },
  { id: "g9", date: "Jun 14", time: "1:00 PM ET", home: "Germany", away: "Curaçao", group: "E", venue: "NRG Stadium, Houston" },
  { id: "g10", date: "Jun 14", time: "4:00 PM ET", home: "Netherlands", away: "Japan", group: "F", venue: "AT&T Stadium, Arlington" },
  { id: "g11", date: "Jun 14", time: "7:00 PM ET", home: "Ivory Coast", away: "Ecuador", group: "E", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "g12", date: "Jun 14", time: "10:00 PM ET", home: "Sweden", away: "Tunisia", group: "F", venue: "Estadio BBVA, Monterrey" },
  // June 15
  { id: "g13", date: "Jun 15", time: "12:00 PM ET", home: "Spain", away: "Cape Verde", group: "H", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "g14", date: "Jun 15", time: "3:00 PM ET", home: "Belgium", away: "Egypt", group: "G", venue: "Lumen Field, Seattle" },
  { id: "g15", date: "Jun 15", time: "6:00 PM ET", home: "Saudi Arabia", away: "Uruguay", group: "H", venue: "Hard Rock Stadium, Miami" },
  { id: "g16", date: "Jun 15", time: "9:00 PM ET", home: "Iran", away: "New Zealand", group: "G", venue: "SoFi Stadium, Inglewood" },
  // June 16
  { id: "g17", date: "Jun 16", time: "3:00 PM ET", home: "France", away: "Senegal", group: "I", venue: "MetLife Stadium, East Rutherford" },
  { id: "g18", date: "Jun 16", time: "6:00 PM ET", home: "Iraq", away: "Norway", group: "I", venue: "Gillette Stadium, Foxborough" },
  { id: "g19", date: "Jun 16", time: "9:00 PM ET", home: "Argentina", away: "Algeria", group: "J", venue: "Arrowhead Stadium, Kansas City" },
  // June 17
  { id: "g20", date: "Jun 17", time: "12:00 AM ET", home: "Austria", away: "Jordan", group: "J", venue: "Levi's Stadium, Santa Clara" },
  { id: "g21", date: "Jun 17", time: "1:00 PM ET", home: "Portugal", away: "DR Congo", group: "K", venue: "NRG Stadium, Houston" },
  { id: "g22", date: "Jun 17", time: "4:00 PM ET", home: "England", away: "Croatia", group: "L", venue: "AT&T Stadium, Arlington" },
  { id: "g23", date: "Jun 17", time: "7:00 PM ET", home: "Ghana", away: "Panama", group: "L", venue: "BMO Field, Toronto" },
  { id: "g24", date: "Jun 17", time: "10:00 PM ET", home: "Uzbekistan", away: "Colombia", group: "K", venue: "Estadio Azteca, Mexico City" },
  // June 18
  { id: "g25", date: "Jun 18", time: "12:00 PM ET", home: "Czechia", away: "South Africa", group: "A", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "g26", date: "Jun 18", time: "3:00 PM ET", home: "Switzerland", away: "Bosnia & Herz.", group: "B", venue: "SoFi Stadium, Inglewood" },
  { id: "g27", date: "Jun 18", time: "6:00 PM ET", home: "Canada", away: "Qatar", group: "B", venue: "BC Place, Vancouver" },
  { id: "g28", date: "Jun 18", time: "9:00 PM ET", home: "Mexico", away: "South Korea", group: "A", venue: "Estadio Akron, Zapopan" },
  // June 19
  { id: "g29", date: "Jun 19", time: "3:00 PM ET", home: "United States", away: "Australia", group: "D", venue: "Lumen Field, Seattle" },
  { id: "g30", date: "Jun 19", time: "6:00 PM ET", home: "Scotland", away: "Morocco", group: "C", venue: "Gillette Stadium, Foxborough" },
  { id: "g31", date: "Jun 19", time: "8:30 PM ET", home: "Brazil", away: "Haiti", group: "C", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "g32", date: "Jun 19", time: "11:00 PM ET", home: "Türkiye", away: "Paraguay", group: "D", venue: "Levi's Stadium, Santa Clara" },
  // June 20
  { id: "g33", date: "Jun 20", time: "1:00 PM ET", home: "Netherlands", away: "Sweden", group: "F", venue: "NRG Stadium, Houston" },
  { id: "g34", date: "Jun 20", time: "4:00 PM ET", home: "Germany", away: "Ivory Coast", group: "E", venue: "BMO Field, Toronto" },
  { id: "g35", date: "Jun 20", time: "8:00 PM ET", home: "Ecuador", away: "Curaçao", group: "E", venue: "Arrowhead Stadium, Kansas City" },
  // June 21
  { id: "g36", date: "Jun 21", time: "12:00 AM ET", home: "Tunisia", away: "Japan", group: "F", venue: "Estadio BBVA, Monterrey" },
  { id: "g37", date: "Jun 21", time: "12:00 PM ET", home: "Spain", away: "Saudi Arabia", group: "H", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "g38", date: "Jun 21", time: "3:00 PM ET", home: "Belgium", away: "Iran", group: "G", venue: "SoFi Stadium, Inglewood" },
  { id: "g39", date: "Jun 21", time: "6:00 PM ET", home: "Uruguay", away: "Cape Verde", group: "H", venue: "Hard Rock Stadium, Miami" },
  { id: "g40", date: "Jun 21", time: "9:00 PM ET", home: "New Zealand", away: "Egypt", group: "G", venue: "BC Place, Vancouver" },
  // June 22
  { id: "g41", date: "Jun 22", time: "1:00 PM ET", home: "Argentina", away: "Austria", group: "J", venue: "AT&T Stadium, Arlington" },
  { id: "g42", date: "Jun 22", time: "5:00 PM ET", home: "France", away: "Iraq", group: "I", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "g43", date: "Jun 22", time: "8:00 PM ET", home: "Norway", away: "Senegal", group: "I", venue: "MetLife Stadium, East Rutherford" },
  { id: "g44", date: "Jun 22", time: "11:00 PM ET", home: "Jordan", away: "Algeria", group: "J", venue: "Levi's Stadium, Santa Clara" },
  // June 23
  { id: "g45", date: "Jun 23", time: "1:00 PM ET", home: "Portugal", away: "Uzbekistan", group: "K", venue: "NRG Stadium, Houston" },
  { id: "g46", date: "Jun 23", time: "4:00 PM ET", home: "England", away: "Ghana", group: "L", venue: "Gillette Stadium, Foxborough" },
  { id: "g47", date: "Jun 23", time: "7:00 PM ET", home: "Panama", away: "Croatia", group: "L", venue: "BMO Field, Toronto" },
  { id: "g48", date: "Jun 23", time: "10:00 PM ET", home: "Colombia", away: "DR Congo", group: "K", venue: "Estadio Akron, Zapopan" },
  // June 24 — final Group B & C
  { id: "g49", date: "Jun 24", time: "3:00 PM ET", home: "Switzerland", away: "Canada", group: "B", venue: "BC Place, Vancouver" },
  { id: "g50", date: "Jun 24", time: "3:00 PM ET", home: "Bosnia & Herz.", away: "Qatar", group: "B", venue: "Lumen Field, Seattle" },
  { id: "g51", date: "Jun 24", time: "6:00 PM ET", home: "Scotland", away: "Brazil", group: "C", venue: "Hard Rock Stadium, Miami" },
  { id: "g52", date: "Jun 24", time: "6:00 PM ET", home: "Morocco", away: "Haiti", group: "C", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "g53", date: "Jun 24", time: "9:00 PM ET", home: "Czechia", away: "Mexico", group: "A", venue: "Estadio Azteca, Mexico City" },
  { id: "g54", date: "Jun 24", time: "9:00 PM ET", home: "South Africa", away: "South Korea", group: "A", venue: "Estadio BBVA, Monterrey" },
  // June 25 — final Group D, E, F
  { id: "g55", date: "Jun 25", time: "4:00 PM ET", home: "Curaçao", away: "Ivory Coast", group: "E", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "g56", date: "Jun 25", time: "4:00 PM ET", home: "Ecuador", away: "Germany", group: "E", venue: "MetLife Stadium, East Rutherford" },
  { id: "g57", date: "Jun 25", time: "7:00 PM ET", home: "Japan", away: "Sweden", group: "F", venue: "AT&T Stadium, Arlington" },
  { id: "g58", date: "Jun 25", time: "7:00 PM ET", home: "Tunisia", away: "Netherlands", group: "F", venue: "Arrowhead Stadium, Kansas City" },
  { id: "g59", date: "Jun 25", time: "10:00 PM ET", home: "Türkiye", away: "United States", group: "D", venue: "SoFi Stadium, Inglewood" },
  { id: "g60", date: "Jun 25", time: "10:00 PM ET", home: "Paraguay", away: "Australia", group: "D", venue: "Levi's Stadium, Santa Clara" },
  // June 26 — final Group G, H, I
  { id: "g61", date: "Jun 26", time: "3:00 PM ET", home: "Norway", away: "France", group: "I", venue: "Gillette Stadium, Foxborough" },
  { id: "g62", date: "Jun 26", time: "3:00 PM ET", home: "Senegal", away: "Iraq", group: "I", venue: "BMO Field, Toronto" },
  { id: "g63", date: "Jun 26", time: "8:00 PM ET", home: "Cape Verde", away: "Saudi Arabia", group: "H", venue: "NRG Stadium, Houston" },
  { id: "g64", date: "Jun 26", time: "8:00 PM ET", home: "Uruguay", away: "Spain", group: "H", venue: "Estadio Akron, Zapopan" },
  { id: "g65", date: "Jun 26", time: "11:00 PM ET", home: "Egypt", away: "Iran", group: "G", venue: "Lumen Field, Seattle" },
  { id: "g66", date: "Jun 26", time: "11:00 PM ET", home: "New Zealand", away: "Belgium", group: "G", venue: "BC Place, Vancouver" },
  // June 27 — final Group J, K, L
  { id: "g67", date: "Jun 27", time: "5:00 PM ET", home: "Panama", away: "England", group: "L", venue: "MetLife Stadium, East Rutherford" },
  { id: "g68", date: "Jun 27", time: "5:00 PM ET", home: "Croatia", away: "Ghana", group: "L", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "g69", date: "Jun 27", time: "7:30 PM ET", home: "Colombia", away: "Portugal", group: "K", venue: "Hard Rock Stadium, Miami" },
  { id: "g70", date: "Jun 27", time: "7:30 PM ET", home: "DR Congo", away: "Uzbekistan", group: "K", venue: "Mercedes-Benz Stadium, Atlanta" },
  { id: "g71", date: "Jun 27", time: "10:00 PM ET", home: "Algeria", away: "Austria", group: "J", venue: "Arrowhead Stadium, Kansas City" },
  { id: "g72", date: "Jun 27", time: "10:00 PM ET", home: "Jordan", away: "Argentina", group: "J", venue: "AT&T Stadium, Arlington" },
];

const PLAYER_COLORS = [
  { bg: "#e63946", text: "#fff", name: "Red" },
  { bg: "#2979ff", text: "#fff", name: "Blue" },
  { bg: "#00c853", text: "#fff", name: "Green" },
  { bg: "#ff9800", text: "#fff", name: "Orange" },
];

const TIER_LABEL = { 1: "⭐ Elite", 2: "🔥 Strong", 3: "💪 Solid", 4: "🌟 Underdog" };

// ─── DRAFT LOGIC ─────────────────────────────────────────────────────────────

// Round-1 and Round-2 matchup pairs (teams that play each other in matchday 1 or 2)
// If the same player owns both teams in a pair, that's a conflict we want to avoid.
const EARLY_MATCH_PAIRS = [
  // Matchday 1
  ["Mexico","South Africa"], ["South Korea","Czechia"],
  ["Canada","Bosnia & Herz."], ["United States","Paraguay"],
  ["Qatar","Switzerland"], ["Brazil","Morocco"],
  ["Haiti","Scotland"], ["Australia","Türkiye"],
  ["Germany","Curaçao"], ["Netherlands","Japan"],
  ["Ivory Coast","Ecuador"], ["Sweden","Tunisia"],
  ["Spain","Cape Verde"], ["Belgium","Egypt"],
  ["Saudi Arabia","Uruguay"], ["Iran","New Zealand"],
  ["France","Senegal"], ["Iraq","Norway"],
  ["Argentina","Algeria"], ["Austria","Jordan"],
  ["Portugal","DR Congo"], ["England","Croatia"],
  ["Ghana","Panama"], ["Uzbekistan","Colombia"],
  // Matchday 2
  ["Czechia","South Africa"], ["Switzerland","Bosnia & Herz."],
  ["Canada","Qatar"], ["Mexico","South Korea"],
  ["United States","Australia"], ["Scotland","Morocco"],
  ["Brazil","Haiti"], ["Türkiye","Paraguay"],
  ["Netherlands","Sweden"], ["Germany","Ivory Coast"],
  ["Ecuador","Curaçao"], ["Tunisia","Japan"],
  ["Spain","Saudi Arabia"], ["Belgium","Iran"],
  ["Uruguay","Cape Verde"], ["New Zealand","Egypt"],
  ["Argentina","Austria"], ["France","Iraq"],
  ["Norway","Senegal"], ["Jordan","Algeria"],
  ["Portugal","Uzbekistan"], ["England","Ghana"],
  ["Panama","Croatia"], ["Colombia","DR Congo"],
];

function hasConflict(playerAssignment, teamA, teamB) {
  // Returns true if both teams are already assigned to the same player
  const ownerA = playerAssignment[teamA];
  const ownerB = playerAssignment[teamB];
  return ownerA !== undefined && ownerB !== undefined && ownerA === ownerB;
}

function buildSnakeDraft(teams) {
  const MAX_ATTEMPTS = 200;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // Shuffle within each tier
    const byTier = [1, 2, 3, 4].map((t) =>
      teams.filter((tm) => tm.tier === t).sort(() => Math.random() - 0.5)
    );

    const picks = [];
    const playerAssignment = {}; // teamName -> playerIndex
    let pickNum = 0;
    let failed = false;

    for (const tier of byTier) {
      let idx = 0, tierRound = 0;
      while (idx < tier.length) {
        const baseOrder = tierRound % 2 === 0 ? [0, 1, 2, 3] : [3, 2, 1, 0];
        // For each slot in this snake round, try to assign without conflict
        const roundTeams = tier.slice(idx, idx + 4);
        // Try all permutations of roundTeams to find one with no early-round conflicts
        const perm = findGoodPermutation(roundTeams, baseOrder, playerAssignment);
        if (!perm) { failed = true; break; }

        for (let p = 0; p < perm.length; p++) {
          const team = perm[p];
          const player = baseOrder[p];
          picks.push({ team, player, pickNum: pickNum++ });
          playerAssignment[team.name] = player;
        }
        idx += roundTeams.length;
        tierRound++;
      }
      if (failed) break;
    }

    if (!failed) return picks;
  }

  // Fallback: plain snake with no conflict checking (should rarely hit this)
  const byTier = [1, 2, 3, 4].map((t) =>
    teams.filter((tm) => tm.tier === t).sort(() => Math.random() - 0.5)
  );
  const picks = [];
  let pickNum = 0;
  for (const tier of byTier) {
    let idx = 0, tierRound = 0;
    while (idx < tier.length) {
      const order = tierRound % 2 === 0 ? [0, 1, 2, 3] : [3, 2, 1, 0];
      for (let p = 0; p < 4 && idx < tier.length; p++, idx++) {
        picks.push({ team: tier[idx], player: order[p], pickNum: pickNum++ });
      }
      tierRound++;
    }
  }
  return picks;
}

function findGoodPermutation(roundTeams, playerOrder, playerAssignment) {
  // Try shuffled permutations of roundTeams assigned to playerOrder slots
  // Return first arrangement with no early-matchup conflicts, or best effort
  const indices = roundTeams.map((_, i) => i);
  const perms = getPermutations(indices);
  // Shuffle perms so we don't always get the same resolution
  perms.sort(() => Math.random() - 0.5);

  let bestPerm = null;
  let bestConflicts = Infinity;

  for (const perm of perms) {
    const arranged = perm.map((i) => roundTeams[i]);
    // Simulate assigning these teams to playerOrder
    const tempAssign = { ...playerAssignment };
    for (let p = 0; p < arranged.length; p++) {
      tempAssign[arranged[p].name] = playerOrder[p];
    }
    // Count conflicts in EARLY_MATCH_PAIRS
    let conflicts = 0;
    for (const [a, b] of EARLY_MATCH_PAIRS) {
      if (tempAssign[a] !== undefined && tempAssign[b] !== undefined && tempAssign[a] === tempAssign[b]) {
        conflicts++;
      }
    }
    if (conflicts === 0) return arranged;
    if (conflicts < bestConflicts) {
      bestConflicts = conflicts;
      bestPerm = arranged;
    }
  }
  return bestPerm; // return least-bad if perfect is impossible
}

function getPermutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of getPermutations(rest)) result.push([arr[i], ...p]);
  }
  return result;
}

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────

const STORAGE_KEY = "wc2026_app_v3";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

// ─── APP ──────────────────────────────────────────────────────────────────────

const TABS = ["Draft", "Schedule", "Dashboard", "Rosters"];

export default function App() {
  const [phase, setPhase] = useState("setup"); // setup | draft | live
  const [tab, setTab] = useState("Draft");
  const [playerNames, setPlayerNames] = useState(["Player 1", "Player 2", "Player 3", "Player 4"]);
  const [playerPhones, setPlayerPhones] = useState(["", "", "", ""]);
  const [picks, setPicks] = useState([]);
  const [currentPick, setCurrentPick] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState({}); // { matchId: { home: n, away: n, final: bool } }
  const [scheduleFilter, setScheduleFilter] = useState("All");

  // Load persisted state
  useEffect(() => {
    const s = loadState();
    if (s) {
      setPhase(s.phase || "setup");
      setPlayerNames(s.playerNames || ["Player 1", "Player 2", "Player 3", "Player 4"]);
      setPlayerPhones(s.playerPhones || ["", "", "", ""]);
      setPicks(s.picks || []);
      setCurrentPick(s.currentPick || 0);
      setScores(s.scores || {});
      if (s.phase === "live") setTab("Dashboard");
    }
  }, []);

  useEffect(() => {
    saveState({ phase, playerNames, playerPhones, picks, currentPick, scores });
  }, [phase, playerNames, playerPhones, picks, currentPick, scores]);

  // ─ derived ─
  const teamOwner = {};
  picks.forEach(({ team, player }) => { teamOwner[team.name] = player; });

  // win/draw/loss per player
  const playerStats = playerNames.map((_, pi) => {
    let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;
    GROUP_MATCHES.forEach((m) => {
      const sc = scores[m.id];
      if (!sc || !sc.final) return;
      const homeOwner = teamOwner[m.home];
      const awayOwner = teamOwner[m.away];
      const h = sc.home, a = sc.away;
      if (homeOwner === pi) {
        gf += h; ga += a;
        if (h > a) wins++; else if (h === a) draws++; else losses++;
      }
      if (awayOwner === pi) {
        gf += a; ga += h;
        if (a > h) wins++; else if (a === h) draws++; else losses++;
      }
    });
    return { wins, draws, losses, gf, ga, pts: wins * 3 + draws };
  });

  const ranked = [...playerStats.map((s, i) => ({ ...s, i }))].sort((a, b) =>
    b.pts !== a.pts ? b.pts - a.pts : (b.gf - b.ga) - (a.gf - a.ga)
  );

  // ─ match enrichment ─
  const enrichedMatches = GROUP_MATCHES.map((m) => ({
    ...m,
    homeOwner: teamOwner[m.home] ?? null,
    awayOwner: teamOwner[m.away] ?? null,
    score: scores[m.id] || null,
  }));

  const dates = [...new Set(GROUP_MATCHES.map((m) => m.date))];
  const filteredMatches = scheduleFilter === "All"
    ? enrichedMatches
    : enrichedMatches.filter((m) => m.date === scheduleFilter);

  // ─ Draft helpers ─
  const startDraft = () => {
    const p = buildSnakeDraft(ALL_TEAMS);
    setPicks(p);
    setCurrentPick(0);
    setRevealed(false);
    setPhase("draft");
    setTab("Draft");
  };

  const nextPick = () => {
    if (currentPick + 1 >= picks.length) {
      setPhase("live");
      setTab("Dashboard");
    } else {
      setCurrentPick((c) => c + 1);
      setRevealed(false);
    }
  };

  const updateScore = (matchId, side, val) => {
    setScores((prev) => ({
      ...prev,
      [matchId]: { home: 0, away: 0, ...prev[matchId], [side]: Math.max(0, parseInt(val) || 0) },
    }));
  };

  const toggleFinal = (matchId) => {
    setScores((prev) => ({
      ...prev,
      [matchId]: { home: 0, away: 0, ...prev[matchId], final: !prev[matchId]?.final },
    }));
  };

  const [confirmReset, setConfirmReset] = useState(false);

  const resetApp = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setPhase("setup");
    setPlayerNames(["Player 1", "Player 2", "Player 3", "Player 4"]);
    setPlayerPhones(["", "", "", ""]);
    setPicks([]);
    setCurrentPick(0);
    setRevealed(false);
    setScores({});
    setTab("Draft");
    setConfirmReset(false);
  };

  const cp = picks[currentPick];
  const curPlayer = cp?.player ?? 0;
  const roundNum = Math.floor(currentPick / 4) + 1;

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #07111f 0%, #0c1e38 60%, #07111f 100%)",
      color: "#e8edf5",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      {/* ── DOT TEXTURE ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.035,
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* ── HEADER ── */}
      <div style={{
        textAlign: "center", padding: "22px 16px 0",
        background: "linear-gradient(180deg,rgba(7,17,31,.95) 0%,transparent)",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: "#b8962e", textTransform: "uppercase", marginBottom: 4 }}>
          FIFA World Cup 2026 · USA / Canada / Mexico
        </div>
        <h1 style={{
          margin: 0, fontSize: "clamp(20px,5vw,34px)", fontWeight: 900, letterSpacing: 2,
          background: "linear-gradient(135deg,#c9a227,#f2d060,#c9a227)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>⚽ FANTASY LEAGUE</h1>
        <div style={{ fontSize: 11, color: "#5a7a9a", letterSpacing: 3, marginTop: 3 }}>
          {phase === "setup" ? "SETUP" : phase === "draft" ? `DRAFT · PICK ${currentPick + 1} OF ${ALL_TEAMS.length}` : "LIVE TRACKING"}
        </div>
        {phase !== "setup" && (
          <button onClick={resetApp} style={{
            marginTop: 10, padding: "5px 14px", borderRadius: 99,
            border: `1px solid ${confirmReset ? "rgba(230,57,70,0.8)" : "rgba(230,57,70,0.4)"}`,
            background: confirmReset ? "rgba(230,57,70,0.35)" : "rgba(230,57,70,0.1)",
            color: confirmReset ? "#ff6b6b" : "#e05060", cursor: "pointer",
            fontFamily: "inherit", fontSize: 11, letterSpacing: 1,
            transition: "all 0.2s",
          }}>{confirmReset ? "⚠️ TAP AGAIN TO CONFIRM" : "↩ RESET DRAFT"}</button>
        )}
      </div>

      {/* ── TAB BAR ── */}
      {phase === "live" && (
        <div style={{
          display: "flex", justifyContent: "center", gap: 4, padding: "14px 12px 0", flexWrap: "wrap",
        }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "7px 16px", borderRadius: 99, border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 12, letterSpacing: 1, fontWeight: 700,
              background: tab === t ? "linear-gradient(135deg,#c9a227,#f2d060)" : "rgba(255,255,255,0.07)",
              color: tab === t ? "#07111f" : "#7ba3cc",
              transition: "all 0.2s",
            }}>{t.toUpperCase()}</button>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "12px 14px 60px" }}>

        {/* ══════════════════ SETUP ══════════════════ */}
        {phase === "setup" && (
          <div style={{ marginTop: 24 }}>
            <Panel title="PARTICIPANTS">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {playerNames.map((name, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Dot color={PLAYER_COLORS[i].bg} label={i + 1} />
                      <input value={name}
                        onChange={(e) => { const n = [...playerNames]; n[i] = e.target.value; setPlayerNames(n); }}
                        placeholder={`Player ${i + 1} name`}
                        style={inputStyle(PLAYER_COLORS[i].bg)} />
                    </div>
                    <input value={playerPhones[i]}
                      onChange={(e) => { const n = [...playerPhones]; n[i] = e.target.value; setPlayerPhones(n); }}
                      placeholder="Phone (optional)"
                      style={{ ...inputStyle("#334"), fontSize: 12, color: "#7ba3cc" }} />
                  </div>
                ))}
              </div>
              <InfoBox>
                <strong style={{ color: "#c9a227" }}>Snake Draft · 12 teams each</strong><br />
                Teams are balanced by FIFA tier so each participant gets a competitive mix of elite, strong, solid and underdog nations. Draft reveals one team per round in snake order.
              </InfoBox>
              <GoldButton onClick={startDraft}>🚀 START DRAFT</GoldButton>
            </Panel>
          </div>
        )}

        {/* ══════════════════ DRAFT ══════════════════ */}
        {phase === "draft" && cp && (
          <div style={{ marginTop: 18 }}>
            {/* Progress bar */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#5a7a9a", marginBottom: 5, letterSpacing: 1 }}>
                <span>ROUND {roundNum} OF {Math.ceil(ALL_TEAMS.length / 4)}</span>
                <span>PICK {currentPick + 1} / {ALL_TEAMS.length}</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 5 }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  background: "linear-gradient(90deg,#c9a227,#f2d060)",
                  width: `${((currentPick + 1) / ALL_TEAMS.length) * 100}%`,
                  transition: "width .5s ease",
                }} />
              </div>
            </div>

            {/* On the clock */}
            <div style={{
              background: `${PLAYER_COLORS[curPlayer].bg}22`,
              border: `2px solid ${PLAYER_COLORS[curPlayer].bg}`,
              borderRadius: 12, padding: "12px 18px", marginBottom: 16,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <Dot color={PLAYER_COLORS[curPlayer].bg} label={curPlayer + 1} size={42} />
              <div>
                <div style={{ fontSize: 10, color: "#5a7a9a", letterSpacing: 2 }}>ON THE CLOCK</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: PLAYER_COLORS[curPlayer].bg }}>
                  {playerNames[curPlayer]}
                </div>
              </div>
            </div>

            {/* Flip card */}
            <div onClick={!revealed ? () => setRevealed(true) : undefined}
              style={{ cursor: revealed ? "default" : "pointer", marginBottom: 16 }}>
              <div style={{
                borderRadius: 18, padding: "36px 24px", textAlign: "center",
                background: revealed
                  ? `linear-gradient(135deg,${PLAYER_COLORS[curPlayer].bg}2a,rgba(255,255,255,0.04))`
                  : "linear-gradient(135deg,rgba(201,162,39,.15),rgba(7,17,31,.8))",
                border: `2px solid ${revealed ? PLAYER_COLORS[curPlayer].bg : "rgba(201,162,39,.35)"}`,
                boxShadow: revealed ? `0 0 36px ${PLAYER_COLORS[curPlayer].bg}33` : "none",
                transition: "all .5s cubic-bezier(.23,1,.32,1)",
              }}>
                {!revealed ? (
                  <>
                    <div style={{ fontSize: 60, filter: "blur(10px)", marginBottom: 12 }}>🌍</div>
                    <div style={{ fontSize: 15, color: "#c9a227", letterSpacing: 3 }}>TAP TO REVEAL</div>
                    <div style={{ fontSize: 12, color: "#5a7a9a", marginTop: 6 }}>{playerNames[curPlayer]}'s next team</div>
                  </>
                ) : (
                  <div style={{ animation: "pop .45s cubic-bezier(.23,1,.32,1)" }}>
                    <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 10 }}>{cp.team.flag}</div>
                    <div style={{ fontSize: "clamp(22px,5vw,34px)", fontWeight: 900, letterSpacing: 1, marginBottom: 10 }}>
                      {cp.team.name}
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                      {[`Group ${cp.team.group}`, `FIFA #${cp.team.rank}`, TIER_LABEL[cp.team.tier]].map((label) => (
                        <span key={label} style={{
                          background: "rgba(255,255,255,0.1)", borderRadius: 99,
                          padding: "4px 12px", fontSize: 12, color: "#c9a227",
                        }}>{label}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {revealed && (
              <button onClick={nextPick} style={{
                width: "100%", padding: 14, borderRadius: 10, border: "none",
                background: PLAYER_COLORS[curPlayer].bg,
                color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer",
                fontFamily: "inherit", letterSpacing: 1, marginBottom: 16,
              }}>
                {currentPick + 1 < picks.length ? "NEXT PICK →" : "🏆 FINISH DRAFT"}
              </button>
            )}

            {/* Mini roster recap */}
            <details style={{ marginTop: 4 }}>
              <summary style={{ fontSize: 11, color: "#5a7a9a", letterSpacing: 1, cursor: "pointer", userSelect: "none" }}>
                SHOW CURRENT ROSTERS
              </summary>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                {playerNames.map((name, pi) => {
                  const myTeams = picks.filter((p) => p.player === pi && p.pickNum < currentPick + (revealed ? 1 : 0));
                  return (
                    <div key={pi} style={{
                      background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 10,
                      border: `1px solid ${PLAYER_COLORS[pi].bg}44`,
                    }}>
                      <div style={{ color: PLAYER_COLORS[pi].bg, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                        {name} ({myTeams.length})
                      </div>
                      {myTeams.map(({ team }) => (
                        <div key={team.name} style={{ fontSize: 11, color: "#7ba3cc", padding: "1px 0" }}>
                          {team.flag} {team.name}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        )}

        {/* ══════════════════ LIVE TABS ══════════════════ */}
        {phase === "live" && (
          <>
            {/* ── DASHBOARD TAB ── */}
            {tab === "Dashboard" && (
              <div style={{ marginTop: 16 }}>
                {/* Leaderboard */}
                <div style={{ marginBottom: 20 }}>
                  <SectionLabel>🏆 LEADERBOARD</SectionLabel>
                  <div style={{ display: "grid", gap: 8 }}>
                    {ranked.map((s, rank) => (
                      <div key={s.i} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        background: rank === 0 ? `${PLAYER_COLORS[s.i].bg}22` : "rgba(255,255,255,0.04)",
                        border: `1.5px solid ${rank === 0 ? PLAYER_COLORS[s.i].bg : "rgba(255,255,255,0.07)"}`,
                        borderRadius: 12, padding: "12px 16px",
                      }}>
                        <div style={{ fontSize: 18, width: 28, textAlign: "center", color: ["#f2d060","#c0c0c0","#cd7f32","#5a7a9a"][rank] }}>
                          {["🥇","🥈","🥉","4"][rank]}
                        </div>
                        <Dot color={PLAYER_COLORS[s.i].bg} label={s.i + 1} size={34} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 16, color: PLAYER_COLORS[s.i].bg }}>
                            {playerNames[s.i]}
                          </div>
                          <div style={{ fontSize: 11, color: "#5a7a9a" }}>
                            {s.wins}W · {s.draws}D · {s.losses}L · GF {s.gf} GA {s.ga}
                          </div>
                        </div>
                        <div style={{
                          fontSize: 24, fontWeight: 900, color: "#c9a227",
                          minWidth: 48, textAlign: "right",
                        }}>
                          {s.pts} <span style={{ fontSize: 10, color: "#5a7a9a", fontWeight: 400 }}>PTS</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's matches */}
                <SectionLabel>📅 TODAY'S MATCHES</SectionLabel>
                {(() => {
                  const today = new Date();
                  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                  const todayLabel = `${months[today.getMonth()]} ${today.getDate()}`;
                  const todayMatches = enrichedMatches.filter((m) => m.date === todayLabel);
                  if (!todayMatches.length) return (
                    <div style={{ color: "#5a7a9a", fontSize: 13, padding: "12px 0" }}>No matches scheduled today.</div>
                  );
                  return todayMatches.map((m) => <MatchCard key={m.id} m={m} playerNames={playerNames} onScore={updateScore} onFinal={toggleFinal} scores={scores} />);
                })()}
              </div>
            )}

            {/* ── SCHEDULE TAB ── */}
            {tab === "Schedule" && (
              <div style={{ marginTop: 16 }}>
                {/* Date filter pills */}
                <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 10, marginBottom: 12 }}>
                  {["All", ...dates].map((d) => (
                    <button key={d} onClick={() => setScheduleFilter(d)} style={{
                      padding: "5px 12px", borderRadius: 99, border: "none", cursor: "pointer",
                      fontFamily: "inherit", fontSize: 11, whiteSpace: "nowrap", letterSpacing: 1,
                      background: scheduleFilter === d ? "#c9a227" : "rgba(255,255,255,0.07)",
                      color: scheduleFilter === d ? "#07111f" : "#7ba3cc",
                    }}>{d === "All" ? "ALL DATES" : d.toUpperCase()}</button>
                  ))}
                </div>

                {filteredMatches.map((m) => (
                  <MatchCard key={m.id} m={m} playerNames={playerNames} onScore={updateScore} onFinal={toggleFinal} scores={scores} />
                ))}
              </div>
            )}

            {/* ── ROSTERS TAB ── */}
            {tab === "Rosters" && (
              <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
                {playerNames.map((name, pi) => {
                  const myTeams = picks.filter((p) => p.player === pi).map((p) => p.team);
                  const myStats = playerStats[pi];
                  return (
                    <div key={pi} style={{
                      background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 16,
                      border: `2px solid ${PLAYER_COLORS[pi].bg}55`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        <Dot color={PLAYER_COLORS[pi].bg} label={pi + 1} size={40} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 18, color: PLAYER_COLORS[pi].bg }}>{name}</div>
                          <div style={{ fontSize: 11, color: "#5a7a9a" }}>
                            {myStats.pts} pts · {myStats.wins}W {myStats.draws}D {myStats.losses}L
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 7 }}>
                        {myTeams.map((t) => (
                          <div key={t.name} style={{
                            background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "8px 10px",
                            display: "flex", alignItems: "center", gap: 8,
                          }}>
                            <span style={{ fontSize: 22 }}>{t.flag}</span>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                              <div style={{ fontSize: 10, color: "#5a7a9a" }}>Grp {t.group} · #{t.rank}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── DRAFT RECAP TAB ── */}
            {tab === "Draft" && (
              <div style={{ marginTop: 16 }}>
                <InfoBox>Draft is complete. All 48 teams have been assigned.</InfoBox>
                <button onClick={resetApp} style={{
                  marginTop: 12, padding: "10px 20px", borderRadius: 8,
                  border: `1px solid ${confirmReset ? "rgba(230,57,70,0.8)" : "#e6394655"}`,
                  background: confirmReset ? "rgba(230,57,70,0.2)" : "transparent",
                  color: confirmReset ? "#ff6b6b" : "#e63946", cursor: "pointer",
                  fontFamily: "inherit", fontSize: 13, transition: "all 0.2s",
                }}>{confirmReset ? "⚠️ Tap again to confirm reset" : "🔄 Reset & Start New Draft"}</button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes pop { 0%{transform:scale(.7);opacity:0} 80%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        input::placeholder { color:rgba(255,255,255,.25) }
        ::-webkit-scrollbar { height:4px; background:transparent }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,.15); border-radius:2px }
        details summary::-webkit-details-marker { display:none }
      `}</style>
    </div>
  );
}

// ─── MATCH CARD ──────────────────────────────────────────────────────────────

function MatchCard({ m, playerNames, onScore, onFinal, scores }) {
  const sc = scores[m.id] || {};
  const isFinal = !!sc.final;
  const homeColor = m.homeOwner !== null ? PLAYER_COLORS[m.homeOwner].bg : "#334";
  const awayColor = m.awayOwner !== null ? PLAYER_COLORS[m.awayOwner].bg : "#334";

  const winner = isFinal
    ? sc.home > sc.away ? m.home : sc.away > sc.home ? m.away : "Draw"
    : null;

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px",
      marginBottom: 10, border: isFinal ? "1.5px solid rgba(201,162,39,0.4)" : "1.5px solid rgba(255,255,255,0.07)",
    }}>
      {/* Meta */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 10, color: "#5a7a9a", letterSpacing: 1 }}>
        <span>GROUP {m.group} · {m.date} · {m.time}</span>
        <span style={{ color: isFinal ? "#c9a227" : "#5a7a9a" }}>{isFinal ? "✅ FINAL" : "⏳ UPCOMING"}</span>
      </div>

      {/* Teams row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Home */}
        <TeamPill name={m.home} owner={m.homeOwner} playerNames={playerNames} />
        <span style={{ fontSize: 11, color: "#5a7a9a", flexShrink: 0 }}>vs</span>
        {/* Away */}
        <TeamPill name={m.away} owner={m.awayOwner} playerNames={playerNames} />
      </div>

      {/* Score input */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
        <ScoreInput
          value={sc.home ?? ""}
          onChange={(v) => onScore(m.id, "home", v)}
          color={homeColor}
        />
        <span style={{ color: "#5a7a9a", fontSize: 14, fontWeight: 700 }}>—</span>
        <ScoreInput
          value={sc.away ?? ""}
          onChange={(v) => onScore(m.id, "away", v)}
          color={awayColor}
        />
        <button onClick={() => onFinal(m.id)} style={{
          marginLeft: "auto", padding: "5px 12px", borderRadius: 8, border: "none",
          background: isFinal ? "rgba(201,162,39,0.25)" : "rgba(255,255,255,0.07)",
          color: isFinal ? "#c9a227" : "#5a7a9a", cursor: "pointer",
          fontFamily: "inherit", fontSize: 11, letterSpacing: 1,
        }}>
          {isFinal ? "✅ FINAL" : "MARK FINAL"}
        </button>
      </div>

      {/* Winner callout */}
      {isFinal && winner && (
        <div style={{
          marginTop: 8, fontSize: 12, color: "#c9a227", fontStyle: "italic",
        }}>
          {winner === "Draw" ? "⚖️ Draw" : `🏅 Winner: ${winner}`}
        </div>
      )}

      {/* Venue */}
      <div style={{ fontSize: 10, color: "#3a5a7a", marginTop: 6 }}>{m.venue}</div>
    </div>
  );
}

function TeamPill({ name, owner, playerNames }) {
  const team = ALL_TEAMS.find((t) => t.name === name);
  const color = owner !== null ? PLAYER_COLORS[owner].bg : "#334";
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: "clamp(12px,3vw,15px)", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {team?.flag} {name}
      </div>
      <div style={{
        display: "inline-block", marginTop: 3, padding: "2px 8px", borderRadius: 99,
        background: `${color}33`, border: `1px solid ${color}88`,
        fontSize: 10, color: color, letterSpacing: 0.5,
        maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {owner !== null ? playerNames[owner] : "Unassigned"}
      </div>
    </div>
  );
}

function ScoreInput({ value, onChange, color }) {
  return (
    <input
      type="number" min="0" max="99" value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: 52, height: 38, textAlign: "center", borderRadius: 8,
        background: `${color}22`, border: `2px solid ${color}66`,
        color: "#fff", fontSize: 20, fontWeight: 800, outline: "none",
        fontFamily: "inherit",
      }}
    />
  );
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function Dot({ color, label, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 900, fontSize: size * 0.38, color: "#fff", flexShrink: 0,
    }}>{label}</div>
  );
}

function Panel({ title, children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 22,
      border: "1px solid rgba(201,162,39,0.25)", backdropFilter: "blur(8px)",
    }}>
      {title && <SectionLabel>{title}</SectionLabel>}
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, letterSpacing: 3, color: "#b8962e", marginBottom: 12, fontWeight: 700 }}>
      {children}
    </div>
  );
}

function InfoBox({ children }) {
  return (
    <div style={{
      background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.2)",
      borderRadius: 10, padding: "12px 14px", marginBottom: 16,
      fontSize: 13, color: "#8fa8c0", lineHeight: 1.6,
    }}>{children}</div>
  );
}

function GoldButton({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", padding: 15, borderRadius: 10, border: "none",
      background: "linear-gradient(135deg,#c9a227,#f2d060)",
      color: "#07111f", fontWeight: 900, fontSize: 17, cursor: "pointer",
      letterSpacing: 2, fontFamily: "inherit",
      boxShadow: "0 4px 20px rgba(201,162,39,.35)",
    }}>{children}</button>
  );
}

function inputStyle(accentColor) {
  return {
    width: "100%", background: "rgba(255,255,255,0.07)",
    border: `2px solid ${accentColor}66`, borderRadius: 8,
    padding: "9px 12px", color: "#fff", fontSize: 14, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
  };
}
