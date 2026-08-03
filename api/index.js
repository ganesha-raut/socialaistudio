// This file is the Vercel serverless entrypoint.
// It imports the pre-compiled CJS bundle (api/server.cjs) built by esbuild.
// Using __dirname ensures the path resolves correctly in Vercel's serverless runtime.
"use strict";
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { app } = require(path.join(__dirname, "server.cjs"));

module.exports = app;
