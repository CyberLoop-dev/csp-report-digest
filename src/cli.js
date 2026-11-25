import {readFile} from "node:fs/promises";
import {parseReports, summarize} from "./parser.js";

const args = process.argv.slice(2);
const file = args.find(arg => !arg.startsWith("--"));
if (!file || args.includes("--help")) {
  console.log("Usage: node src/cli.js <report-file> [--json]");
  process.exit(file ? 0 : 2);
}
try {
  const reports = parseReports(await readFile(file, "utf8"));
  const result = summarize(reports);
  if (args.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else {
    console.log("CSP report digest — " + result.total + " violation(s)\n");
    for (const [title, values] of [["By directive", result.byDirective], ["By disposition", result.byDisposition], ["Blocked resources", result.blockedResources]]) {
      console.log(title);
      const rows = Object.entries(values);
      if (!rows.length) console.log("  (none)");
      for (const [key, value] of rows) console.log("  " + String(value).padStart(4) + "  " + key);
      console.log("");
    }
  }
} catch (error) {
  console.error("Error: " + error.message);
  process.exitCode = 1;
}
