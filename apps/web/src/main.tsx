#!/usr/bin/env node

const bootMessage = "@cv-maker/web booted";

if (process.env.NODE_ENV !== "test") {
  console.log(bootMessage);
}

export function bootWebApp() {
  return {
    status: "ready",
    message: bootMessage
  };
}
