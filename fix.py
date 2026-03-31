import os
import glob
import re

directories = ['src/components', 'src/pages']

def fix_colors(content):
    content = content.replace('bg-forest-dark', 'bg-[#0A1E11]')
    content = content.replace('text-forest-dark', 'text-[#0A1E11]')
    content = content.replace('border-forest-dark', 'border-[#0A1E11]')
    content = content.replace('bg-forest-green', 'bg-[#113F2B]')
    content = content.replace('text-forest-green', 'text-[#113F2B]')
    content = content.replace('text-accent-orange', 'text-[#E65C00]')
    content = content.replace('bg-accent-orange', 'bg-[#E65C00]')
    content = content.replace('border-accent-orange', 'border-[#E65C00]')
    content = content.replace('text-accent-green', 'text-[#34D399]')
    content = content.replace('bg-accent-green', 'bg-[#34D399]')
    
    # Fix opacity modifiers if needed, but since we use arbitrary values like text-[#0A1E11]/80,
    # Tailwind 4 fully supports them! Hex with slash opacity parses perfectly: text-[#0A1E11]/80.
    
    # Fix Hero Video path
    content = content.replace('/Hero Video.mp4', '/hero_video.mp4')
    
    return content

for d in directories:
    for filepath in glob.glob(os.path.join(d, '*.tsx')):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = fix_colors(content)
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Updated", filepath)
