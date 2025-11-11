// scripts/checkMissingPairings.js
// Run: node scripts/checkMissingPairings.js

import { LifeAreasChallenges } from "../src/app/lib/data/LifeAreasChallenges.js";

const typeCodes = [
  "C-L-O-S-H",
  "C-L-O-S-A",
  "C-L-O-F-H",
  "C-L-O-F-A",
  "C-L-I-S-H",
  "C-L-I-S-A",
  "C-L-I-F-H",
  "C-L-I-F-A",
  "C-V-O-S-H",
  "C-V-O-S-A",
  "C-V-O-F-H",
  "C-V-O-F-A",
  "C-V-I-S-H",
  "C-V-I-S-A",
  "C-V-I-F-H",
  "C-V-I-F-A",
  "N-L-O-S-H",
  "N-L-O-S-A",
  "N-L-O-F-H",
  "N-L-O-F-A",
  "N-L-I-S-H",
  "N-L-I-S-A",
  "N-L-I-F-H",
  "N-L-I-F-A",
  "N-V-O-S-H",
  "N-V-O-S-A",
  "N-V-O-F-H",
  "N-V-O-F-A",
  "N-V-I-S-H",
  "N-V-I-S-A",
  "N-V-I-F-H",
  "N-V-I-F-A",
];

const seen = new Set();
const missing = [];

for (const a of typeCodes) {
  for (const b of typeCodes) {
    const key1 = `${a}/${b}`;
    const key2 = `${b}/${a}`;
    const data = LifeAreasChallenges[key1] || LifeAreasChallenges[key2];

    if (!data || !Array.isArray(data) || data.length === 0) {
      const norm = key1 < key2 ? key1 : key2;
      if (!seen.has(norm)) {
        seen.add(norm);
        missing.push(norm);
      }
    }
  }
}

console.log(`Total expected: 528`);
console.log(`Found: ${Object.keys(LifeAreasChallenges).length}`);
console.log(`Missing: ${missing.length}\n`);

if (missing.length > 0) {
  console.log("MISSING PAIRINGS (copy & paste into LifeAreasChallenges.js):");
  missing.sort().forEach((pair) => {
    console.log(`"${pair}": [ { /* 10 life areas */ } ],`);
  });
} else {
  console.log("All 528 pairings are present!");
}
