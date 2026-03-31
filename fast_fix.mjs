import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    for (const [searchValue, replaceValue] of replacements) {
        newContent = newContent.replace(searchValue, replaceValue);
    }
    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

// Fix Home.tsx
replaceInFile(path.join(process.cwd(), 'src/pages/Home.tsx'), [
    ['<source src="/hero_video.mp4"', '<source src="/showcasevid1.mp4"'],
    ['font-display font-black mb-12 uppercase leading-tight"', 'text-white font-display font-black mb-12 uppercase leading-tight"'], // applies to Why Choose Us & FAQ
    ['text-xl font-bold mb-2"', 'text-white text-xl font-bold mb-2"'] // applies to Why Choose Us h3s
]);

// Fix AboutUs.tsx
replaceInFile(path.join(process.cwd(), 'src/pages/AboutUs.tsx'), [
    ['font-display font-black mb-8 leading-tight"', 'text-white font-display font-black mb-8 leading-tight"']
]);

// Fix Services.tsx
replaceInFile(path.join(process.cwd(), 'src/pages/Services.tsx'), [
    ['<section className="py-24 bg-white relative">', '<section id="tree-services" className="py-24 bg-white relative">'],
    ['<section className="py-24 bg-[#FAF9F6] relative">', '<section id="landscaping-services" className="py-24 bg-[#FAF9F6] relative">'],
    ['font-display font-black mb-8 uppercase leading-tight"', 'text-white font-display font-black mb-8 uppercase leading-tight"']
]);

// Fix Navbar.tsx Dropdown Links
replaceInFile(path.join(process.cwd(), 'src/components/Navbar.tsx'), [
    [/"\/services"/g, '"/services#tree-services"'],
    [/"\/services#tree-services".*?Sod Installation/g, '"/services#landscaping-services" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/10 transition-colors">Sod Installation'],
    [/"\/services#tree-services".*?Paver/g, '"/services#landscaping-services" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/10 transition-colors">Paver'],
    [/"\/services#tree-services".*?Retaining/g, '"/services#landscaping-services" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/10 transition-colors">Retaining'],
    [/"\/services#tree-services".*?Fence/g, '"/services#landscaping-services" className="font-sans font-bold text-white px-6 py-3 hover:bg-black/10 transition-colors">Fence'],
    [/"\/services#tree-services".*?Lawn Maintenance/g, '"/services#landscaping-services" className="font-sans font-bold text-white px-6 pb-6 pt-3 hover:bg-black/10 transition-colors">Lawn Maintenance']
]);
