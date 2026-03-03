export function getDownloadButtonState({ previewStatus, hasPdfUrl }) {
  const enabled = previewStatus === "success" && hasPdfUrl;
  return {
    enabled,
    label: enabled ? "Download PDF" : "Download unavailable"
  };
}
