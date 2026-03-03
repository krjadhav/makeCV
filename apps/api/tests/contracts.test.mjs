import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

export function runContractsTests() {
  const compileSchema = JSON.parse(readFileSync(new URL("../../../docs/contracts/compile-error.schema.json", import.meta.url), "utf8"));
  const shareSchema = JSON.parse(readFileSync(new URL("../../../docs/contracts/share-link.schema.json", import.meta.url), "utf8"));
  const typeFile = readFileSync(new URL("../src/types/contracts.ts", import.meta.url), "utf8");

  assert.deepEqual(compileSchema.required, ["line", "column", "message"]);
  assert.equal(shareSchema.properties.permission.type, "string");
  assert.ok(typeFile.includes("line: number"));
  assert.ok(typeFile.includes("column: number"));
  assert.ok(typeFile.includes("message: string"));
}
