import { readFileSync } from "node:fs";

const content = readFileSync(new URL("../src/server.ts", import.meta.url), "utf8");
if (!content.includes("bootApiServer")) {
  throw new Error("api lint failed: missing bootApiServer export");
}
console.log("api lint passed");
