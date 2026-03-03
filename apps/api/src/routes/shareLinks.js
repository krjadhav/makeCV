const links = new Map();
let linkCounter = 0;

function nextShareId() {
  linkCounter += 1;
  return `share_${String(linkCounter).padStart(6, "0")}`;
}

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

export function createShareLink({ documentId, permission }) {
  if (!isNonEmptyString(documentId)) {
    return {
      statusCode: 400,
      body: errorEnvelope("validation_error", "documentId is required")
    };
  }

  if (permission !== "view" && permission !== "edit") {
    return {
      statusCode: 400,
      body: errorEnvelope("validation_error", "permission must be view or edit")
    };
  }

  const id = nextShareId();
  const token = `${id}_token`;
  const value = {
    id,
    token,
    documentId,
    permission,
    url: `https://app.example.com/share/${token}`
  };
  links.set(token, value);

  return {
    statusCode: 201,
    body: value
  };
}

export function resolveShareLink(token) {
  if (!isNonEmptyString(token)) {
    return {
      statusCode: 400,
      body: errorEnvelope("validation_error", "token is required")
    };
  }

  const value = links.get(token);
  if (!value) {
    return {
      statusCode: 404,
      body: errorEnvelope("not_found", "share link not found")
    };
  }

  return {
    statusCode: 200,
    body: value
  };
}

export function resetShareState() {
  links.clear();
  linkCounter = 0;
}
