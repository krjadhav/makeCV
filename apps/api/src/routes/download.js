import { getLatestSuccessfulArtifact } from "../services/compileService.js";

export function getPdfDownload(documentId) {
  const artifact = getLatestSuccessfulArtifact(documentId);
  if (!artifact) {
    return {
      statusCode: 409,
      body: { message: "no successful compile artifact" }
    };
  }

  return {
    statusCode: 200,
    body: {
      documentId,
      revisionId: artifact.revisionId,
      pdfUrl: artifact.pdfUrl
    }
  };
}
