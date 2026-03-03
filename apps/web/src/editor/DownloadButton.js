const statusMessages = {
  idle: "Compile to enable PDF download",
  loading: "Compilation in progress. Download unavailable",
  blocked: "Fix compile errors to enable download",
  stale: "Recompile latest edits to refresh download",
  success: "Download PDF"
};

export function getDownloadButtonState({ previewStatus, hasPdfUrl }) {
  const enabled = previewStatus === "success" && hasPdfUrl;
  const fallback = statusMessages[previewStatus] ?? "Download unavailable";

  return {
    enabled,
    label: enabled ? statusMessages.success : fallback,
    message: enabled ? "Latest successful PDF is ready" : fallback
  };
}
