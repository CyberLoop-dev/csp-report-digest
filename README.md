<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:111827,100:0f766e&height=170&section=header&text=CSP%20Report%20Digest&fontSize=38&fontColor=ffffff" alt="CSP Report Digest header"/></p>
<p align="center"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=19&duration=2800&pause=900&center=true&vCenter=true&width=760&lines=Make+CSP+violations+readable;Local-first+defensive+reporting" alt="Typing title"/></p>
<p align="center">
  <img src="https://img.shields.io/github/license/CyberLoop-dev/csp-report-digest?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/github/languages/top/CyberLoop-dev/csp-report-digest?style=flat-square" alt="Language"/>
  <img src="https://img.shields.io/github/stars/CyberLoop-dev/csp-report-digest?style=flat-square" alt="Stars"/>
  <img src="https://img.shields.io/github/last-commit/CyberLoop-dev/csp-report-digest?style=flat-square" alt="Last commit"/>
</p>

![Project illustration](assets/mark.svg)

## 🔎 Overview
A dependency-free Node.js CLI for summarizing saved Content Security Policy (CSP) violation reports. It accepts legacy csp-report records and Reporting API-style records, then groups violations into a compact local report. It never contacts a remote endpoint.

## ✨ Features
- 🧾 Reads JSON arrays, single JSON objects, and JSON Lines files
- 🛡️ Groups reports by effective directive and disposition
- 🔒 Reduces HTTP(S) resource URLs to origin and path to avoid printing query strings or fragments
- 📊 Emits a readable terminal summary or machine-readable JSON

## 🎬 Demo
No hosted demo is published. Try the included sample file locally:

    node src/cli.js examples/reports.jsonl

## 🚀 Quick Start
Requires Node.js 18 or newer. No package installation is required.

    git clone https://github.com/CyberLoop-dev/csp-report-digest.git
    cd csp-report-digest
    npm start -- examples/reports.jsonl

To analyze your own report export:

    node src/cli.js ./csp-reports.jsonl --json

## 🧰 Tech Stack
- Node.js 18+
- JavaScript ES modules
- Node.js built-in test runner

## 🗂️ Folder Structure
    src/                 Parser and CLI
    test/                Parser tests
    examples/            Small sample report set
    assets/              README illustration
    package.json         Scripts and project metadata

## 🛣️ Roadmap
- [ ] Add CSV output
- [ ] Add optional grouping by source file
- [ ] Support streamed input for very large JSONL exports

## 🤝 Contributing
Issues and pull requests are welcome. Keep parsing local, preserve privacy by default, and add tests for new report shapes.

## 📄 License
Released under the MIT License. See LICENSE.

<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f766e,100:111827&height=110&section=footer" alt="Animated footer wave"/></p>
