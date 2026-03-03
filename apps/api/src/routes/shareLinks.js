const links = new Map();
let linkCounter = 0;

function nextShareId() {
  linkCounter += 1;
  return `share_${String(linkCounter).padStart(6, "0")}`;
}

export function createShareLink({ documentId, permission }) {
  if (permission !== "view" && permission !== "edit") {
    throw new Error("permission must be view or edit");
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
  return value;
}

export function resolveShareLink(token) {
  return links.get(token) ?? null;
}

export function resetShareState() {
  links.clear();
  linkCounter = 0;
}
