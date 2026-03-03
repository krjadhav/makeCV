import { runCompileTests } from "./compile.test.mjs";
import { runContractsTests } from "./contracts.test.mjs";

const mode = process.argv.slice(2).join(" ");

if (!mode || mode.includes("compile")) {
  runCompileTests();
}

if (!mode || mode.includes("contracts")) {
  runContractsTests();
}

console.log(`api tests passed (${mode || "all"})`);
