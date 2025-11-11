// scripts/print-missing-pairs-fixed.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../src/app/lib/data/couple-dynamics-data.js");
const fileContent = fs.readFileSync(dataPath, "utf-8");
const match = fileContent.match(/export\s+const\s+coupleDynamics\s*=\s*(\{[\s\S]*\})/);
if (!match) throw new Error("Parse failed");
const coupleDynamics = new Function("return " + match[1])();

const types = new Set();
Object.keys(coupleDynamics).forEach((k) => {
  const [a, b] = k.split("/");
  types.add(a);
  types.add(b);
});
const typeList = Array.from(types).sort();
console.log(`Found ${typeList.length} archetypes\n`);

const hasKey = (a, b) => {
  const k1 = a > b ? `${a}/${b}` : `${b}/${a}`;
  if (coupleDynamics[k1]) return true;
  const k2 = a < b ? `${a}/${b}` : `${b}/${a}`;
  if (coupleDynamics[k2]) return true;
  return false;
};

const missing = [];
let checked = 0;

for (let i = 0; i < typeList.length; i++) {
  for (let j = i; j < typeList.length; j++) {
    const a = typeList[i];
    const b = typeList[j];
    checked++;
    if (!hasKey(a, b)) {
      const canonical = a > b ? `${a}/${b}` : `${b}/${a}`;
      missing.push(canonical);
    }
  }
}

console.log(`Checked ${checked} pairs (should be 528)`);
console.log(`Present: ${528 - missing.length}`);
console.log(`Missing: ${missing.length}\n`);

if (missing.length === 0) {
  console.log("ALL 528 PAIRS COVERED!");
} else {
  console.log("Missing (larger/smaller):");
  missing.forEach((k, i) => console.log(`${i + 1}. ${k}`));
}
