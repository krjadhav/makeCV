#!/usr/bin/env node

const bootMessage = "@cv-maker/api booted";

if (process.env.NODE_ENV !== "test") {
  console.log(bootMessage);
}

export function bootApiServer() {
  return {
    status: "ready",
    message: bootMessage
  };
}
