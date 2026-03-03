import { getLatestSuccessfulArtifact } from "../services/compileService.js";

function errorEnvelope(code, message, details = null) {
  return {
    error: {
      code,
      message,
      details
    }
  };
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function getPdfDownload(documentId) {
  if (!isNonEmptyString(documentId)) {
    return {
      statusCode: 400,
      body: errorEnvelope("validation_error", "documentId is required")
    };
  }

  const artifact = getLatestSuccessfulArtifact(documentId);
  if (!artifact) {
    return {
      statusCode: 409,
      body: errorEnvelope("compile_required", "no successful compile artifact")
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
