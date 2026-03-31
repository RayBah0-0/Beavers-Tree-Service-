import fs from 'fs';
import path from 'path';

const dirs = ['src/components', 'src/pages'];

function fixColors(content) {
    let newContent = content.replace(/bg-forest-dark/g, 'bg-[#0A1E11]');
    newContent = newContent.replace(/text-forest-dark/g, 'text-[#0A1E11]');
    newContent = newContent.replace(/border-forest-dark/g, 'border-[#0A1E11]');
    newContent = newContent.replace(/bg-forest-green/g, 'bg-[#113F2B]');
    newContent = newContent.replace(/text-forest-green/g, 'text-[#113F2B]');
    newContent = newContent.replace(/text-accent-orange/g, 'text-[#E65C00]');
    newContent = newContent.replace(/bg-accent-orange/g, 'bg-[#E65C00]');
    newContent = newContent.replace(/border-accent-orange/g, 'border-[#E65C00]');
    newContent = newContent.replace(/text-accent-green/g, 'text-[#34D399]');
    newContent = newContent.replace(/bg-accent-green/g, 'bg-[#34D399]');

    // Fix Hero Video.mp4 path
    newContent = newContent.replace(/\/Hero Video\.mp4/g, '/hero_video.mp4');
    return newContent;
}

dirs.forEach(d => {
    const fullPath = path.resolve(process.cwd(), d);
    fs.readdirSync(fullPath).forEach(file => {
        if (file.endsWith('.tsx')) {
            const filepath = path.join(fullPath, file);
            const content = fs.readFileSync(filepath, 'utf-8');
            const newContent = fixColors(content);
            if (content !== newContent) {
                fs.writeFileSync(filepath, newContent, 'utf-8');
                console.log('Updated ' + filepath);
            }
        }
    });
});
