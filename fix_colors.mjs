import fs from 'fs';
import path from 'path';

function replaceColors(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceColors(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/#0A1E11/gi, 'black');
      content = content.replace(/#113F2B/gi, 'black');
      content = content.replace(/#E2D4C1/gi, 'white');
      content = content.replace(/#DFD1BD/gi, 'white');
      content = content.replace(/#FAF9F6/gi, 'white');
      content = content.replace(/#34D399/gi, '#E65C00');
      content = content.replace(/#8B6538/gi, 'black');
      content = content.replace(/#2D2D2D/gi, 'black');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

replaceColors('./src');
console.log("Colors replaced successfully.");
