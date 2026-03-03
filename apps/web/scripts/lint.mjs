import { readFileSync } from "node:fs";

const content = readFileSync(new URL("../src/main.tsx", import.meta.url), "utf8");
if (!content.includes("bootWebApp")) {
  throw new Error("web lint failed: missing bootWebApp export");
}
console.log("web lint passed");
