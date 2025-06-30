const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, 'docs', 'browser');
const docsDir = path.join(__dirname, 'docs');

if (fs.existsSync(browserDir)) {
  fs.readdirSync(browserDir).forEach(file => {
    fs.renameSync(
      path.join(browserDir, file),
      path.join(docsDir, file)
    );
  });
  fs.rmdirSync(browserDir);
  console.log('Moved files from docs/browser to docs/');
} else {
  console.log('No docs/browser directory found.');
} 