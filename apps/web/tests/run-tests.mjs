import { runPreviewTests } from "./preview.test.mjs";
import { runCompileFeedbackTests } from "./compile-feedback.test.mjs";
import { runShareDownloadTests } from "./share-download.test.mjs";

const mode = process.argv.slice(2).join(" ");

if (!mode || mode.includes("preview")) {
  runPreviewTests();
}

if (!mode || mode.includes("compile-feedback")) {
  await runCompileFeedbackTests();
}

if (!mode || mode.includes("share") || mode.includes("download")) {
  runShareDownloadTests();
}

console.log(`web tests passed (${mode || "all"})`);
