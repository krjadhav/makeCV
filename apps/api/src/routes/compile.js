import { getCompileStatus, requestCompile } from "../services/compileService.js";

export function postCompile(payload) {
  return requestCompile(payload);
}

export function getCompile(compileId) {
  return getCompileStatus(compileId);
}
