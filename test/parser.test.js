import test from "node:test";
import assert from "node:assert/strict";
import {parseReports, summarize} from "../src/parser.js";

test("parses legacy reports and redacts URL query strings", () => {
  const rows = parseReports(JSON.stringify({"csp-report":{"effective-directive":"script-src","blocked-uri":"https://cdn.example/app.js?token=secret","disposition":"enforce"}}));
  assert.equal(rows[0].blocked, "https://cdn.example/app.js");
  assert.equal(rows[0].directive, "script-src");
});

test("parses JSON Lines and summarizes directives", () => {
  const rows = parseReports([
    JSON.stringify({body:{effectiveDirective:"img-src",blockedURL:"https://img.example/a.png"}}),
    JSON.stringify({body:{effectiveDirective:"img-src",blockedURL:"https://img.example/b.png"}})
  ].join("\n"));
  assert.equal(summarize(rows).byDirective["img-src"], 2);
});
