import { runCompileTests } from "./compile.test.mjs";
import { runContractsTests } from "./contracts.test.mjs";
import { runDownloadShareTests } from "./download-share.test.mjs";
import { runRealtimeTests } from "./realtime.test.mjs";

const mode = process.argv.slice(2).join(" ");

if (!mode || mode.includes("compile")) {
  runCompileTests();
}

if (!mode || mode.includes("contracts")) {
  runContractsTests();
}

if (!mode || mode.includes("download") || mode.includes("share")) {
  runDownloadShareTests();
}

if (!mode || mode.includes("realtime")) {
  runRealtimeTests();
}

console.log(`api tests passed (${mode || "all"})`);
