import { getCompileStatus, requestCompile } from "../services/compileService.js";

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

export function postCompile(payload) {
  if (!payload || typeof payload !== "object") {
    return {
      statusCode: 400,
      body: errorEnvelope("bad_request", "compile payload is required")
    };
  }

  const { documentId, revisionId, source } = payload;
  if (!isNonEmptyString(documentId) || !isNonEmptyString(revisionId) || !isNonEmptyString(source)) {
    return {
      statusCode: 400,
      body: errorEnvelope("validation_error", "documentId, revisionId, and source are required strings")
    };
  }

  const accepted = requestCompile({ documentId, revisionId, source });
  return {
    statusCode: 202,
    body: accepted
  };
}

export function getCompile(compileId) {
  if (!isNonEmptyString(compileId)) {
    return {
      statusCode: 400,
      body: errorEnvelope("validation_error", "compileId is required")
    };
  }

  const status = getCompileStatus(compileId);
  if (!status) {
    return {
      statusCode: 404,
      body: errorEnvelope("not_found", "compile job not found")
    };
  }

  return {
    statusCode: 200,
    body: status
  };
}
