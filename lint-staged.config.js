module.exports = {
  "**/*.{js, jsx, ts, tsx, html, css, md, json, yml}": ["yarn fmt", "yarn lint --fix", "git add"],
};
