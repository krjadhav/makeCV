export type Permission = "view" | "edit";

export type CompileError = {
  line: number;
  column: number;
  message: string;
};

export type CompileAccepted = {
  compileId: string;
  status: "queued";
};

export type CompileSuccess = {
  compileId: string;
  status: "succeeded";
  revisionId: string;
  previewUrl: string;
  pdfUrl: string;
};

export type CompileFailure = {
  compileId: string;
  status: "failed";
  revisionId: string;
  errors: CompileError[];
};
