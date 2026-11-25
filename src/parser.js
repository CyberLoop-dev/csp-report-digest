const first = (...values) => values.find(value => value !== undefined && value !== null && value !== "");

function cleanUri(value) {
  if (!value) return "(unknown)";
  const raw = String(value);
  if (/^(data|blob):/i.test(raw)) return raw.split(":")[0].toLowerCase() + ":";
  if (/^(inline|eval)$/i.test(raw)) return raw.toLowerCase();
  try {
    const url = new URL(raw);
    if (url.protocol === "http:" || url.protocol === "https:") return url.origin + url.pathname;
    return url.protocol;
  } catch {
    return raw.split(/[?#]/, 1)[0] || "(unknown)";
  }
}

export function normalizeRecord(record) {
  const body = record?.["csp-report"] ?? record?.body ?? record ?? {};
  return {
    directive: String(first(body.effectiveDirective, body["effective-directive"], body.violatedDirective, body["violated-directive"], "unknown")),
    blocked: cleanUri(first(body.blockedURL, body.blockedUri, body["blocked-uri"], body.blockedURI)),
    document: cleanUri(first(body.documentURL, body.documentUri, body["document-uri"], body.documentURI)),
    disposition: String(first(body.disposition, "unknown")).toLowerCase(),
    source: cleanUri(first(body.sourceFile, body["source-file"], body.source, ""))
  };
}

export function parseReports(text) {
  const input = text.trim();
  if (!input) return [];
  try {
    const parsed = JSON.parse(input);
    return (Array.isArray(parsed) ? parsed : [parsed]).map(normalizeRecord);
  } catch {
    const records = [];
    for (const [index, line] of input.split(/\r?\n/).entries()) {
      if (!line.trim()) continue;
      try { records.push(normalizeRecord(JSON.parse(line))); }
      catch (error) { throw new Error("Invalid JSON on line " + (index + 1) + ": " + error.message); }
    }
    return records;
  }
}

export function summarize(records) {
  const count = map => Object.fromEntries([...map.entries()].sort((a,b) => b[1] - a[1] || a[0].localeCompare(b[0])));
  const directives = new Map(), dispositions = new Map(), blocked = new Map();
  for (const row of records) {
    directives.set(row.directive, (directives.get(row.directive) ?? 0) + 1);
    dispositions.set(row.disposition, (dispositions.get(row.disposition) ?? 0) + 1);
    blocked.set(row.blocked, (blocked.get(row.blocked) ?? 0) + 1);
  }
  return {total: records.length, byDirective: count(directives), byDisposition: count(dispositions), blockedResources: count(blocked)};
}
