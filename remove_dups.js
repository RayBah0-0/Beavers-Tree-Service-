const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function checkDups() {
  const file = path.join(process.cwd(), 'src/data/projectGallery.ts');
  let content = fs.readFileSync(file, 'utf8');
  
  const categories = ['concrete', 'excavation', 'foundation', 'retaining-walls', 'hardscaping'];
  const toRemove = [];

  for (const cat of categories) {
    const dir = path.join(process.cwd(), 'public/project-gallery', cat);
    if (!fs.existsSync(dir)) continue;
    
    console.log('Checking', cat);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    
    // Process shorter filenames first (1.jpg will be kept over large filenames if they're identical)
    files.sort((a,b) => a.length - b.length || a.localeCompare(b));
    
    const hashes = {};
    for (const f of files) {
      const p = path.join(dir, f);
      try {
        const img = await Jimp.read(p);
        img.resize({ w: 8, h: 8 });
        img.greyscale();
        const buf = Buffer.from(img.image.data);
        const h = buf.toString('hex'); // Just stringify the pixels
        
        if (hashes[h]) {
          console.log('  Duplicate found:', f, 'matches', hashes[h]);
          toRemove.push(f);
        } else {
          hashes[h] = f;
        }
      } catch (e) {
        console.error('Error on', f, e.message);
      }
    }
  }

  console.log('ToRemove =', toRemove);
  
  if (toRemove.length > 0) {
    for (const rm of toRemove) {
      // Remove occurrences in arrays
      const regex1 = new RegExp(`'${rm}',?\\s*`, 'g');
      content = content.replace(regex1, '');
      
      // Remove occurrences in imageMeta
      // 'IMG_6564.jpg': { width: 1200, height: 1600 },
      const metaRegex = new RegExp(`^\\s*'${rm}':\\s*{.*?},\\r?\\n`, 'gm');
      content = content.replace(metaRegex, '');
    }
    
    // Clean up trailing commas in arrays: [, ] -> []
    content = content.replace(/,\\s*\\]/g, ']');

    fs.writeFileSync(file, content);
    console.log('Duplicate IDs removed from projectGallery.ts');
  }
}

checkDups();
