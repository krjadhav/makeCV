import { runPreviewTests } from "./preview.test.mjs";
import { runCompileFeedbackTests } from "./compile-feedback.test.mjs";
import { runShareDownloadTests } from "./share-download.test.mjs";
import { runRealtimeClientTests } from "./realtime-client.test.mjs";
import { runSyncRecoveryTests } from "./sync-recovery.test.mjs";
import { runAccessGuardTests } from "./access-guard.test.mjs";

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

if (!mode || mode.includes("realtime-client")) {
  runRealtimeClientTests();
}

if (!mode || mode.includes("sync-recovery")) {
  runSyncRecoveryTests();
}

if (!mode || mode.includes("access-guard")) {
  runAccessGuardTests();
}

console.log(`web tests passed (${mode || "all"})`);
