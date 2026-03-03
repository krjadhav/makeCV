const compileJobs = new Map();
const documents = new Map();
let compileCounter = 0;

function nextCompileId() {
  compileCounter += 1;
  return `cmp_${String(compileCounter).padStart(6, "0")}`;
}

function buildErrors(source) {
  const errors = [];
  const lines = source.split("\n");
  let balance = 0;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    for (let col = 0; col < line.length; col += 1) {
      const char = line[col];
      if (char === "{") balance += 1;
      if (char === "}") balance -= 1;
      if (balance < 0) {
        errors.push({
          line: lineIndex + 1,
          column: col + 1,
          message: "unmatched closing brace"
        });
        balance = 0;
      }
    }

    if (line.includes("\\begin{document}") === false && lineIndex === 0) {
      errors.push({
        line: 1,
        column: 1,
        message: "missing \\begin{document}"
      });
    }
  }

  if (balance > 0) {
    errors.push({
      line: lines.length,
      column: lines[lines.length - 1].length + 1,
      message: "unmatched opening brace"
    });
  }

  return errors;
}

export function requestCompile({ documentId, revisionId, source }) {
  const compileId = nextCompileId();
  const errors = buildErrors(source);

  if (errors.length > 0) {
    const failed = {
      compileId,
      revisionId,
      status: "failed",
      errors
    };
    compileJobs.set(compileId, failed);
    return { compileId, status: "queued" };
  }

  const artifact = {
    revisionId,
    previewUrl: `/artifacts/${documentId}/${revisionId}/preview.pdf`,
    pdfUrl: `/artifacts/${documentId}/${revisionId}/download.pdf`
  };

  documents.set(documentId, {
    latestSuccessful: artifact
  });

  const succeeded = {
    compileId,
    revisionId,
    status: "succeeded",
    previewUrl: artifact.previewUrl,
    pdfUrl: artifact.pdfUrl
  };
  compileJobs.set(compileId, succeeded);
  return { compileId, status: "queued" };
}

export function getCompileStatus(compileId) {
  return compileJobs.get(compileId) ?? null;
}

export function getLatestSuccessfulArtifact(documentId) {
  return documents.get(documentId)?.latestSuccessful ?? null;
}

export function resetCompileState() {
  compileJobs.clear();
  documents.clear();
  compileCounter = 0;
}
