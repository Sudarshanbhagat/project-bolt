import re
from pathlib import Path
p = Path('src/components/Certifications.tsx')
text = p.read_text(encoding='utf-8')
open_re = re.compile(r"<div\b")
close_re = re.compile(r"</div>")
# Find occurrences in order
occurrences = []
for i,line in enumerate(text.splitlines(), start=1):
    for m in open_re.finditer(line):
        occurrences.append((i, 'open', line.strip()))
    for m in close_re.finditer(line):
        occurrences.append((i, 'close', line.strip()))

stack = []
unmatched = []
for ln, typ, content in occurrences:
    if typ == 'open':
        stack.append((ln, content))
    else:
        if stack:
            stack.pop()
        else:
            unmatched.append((ln, content))

print('Remaining opens (unclosed):')
for ln, content in stack:
    print(ln, content)
print('\nUnmatched closes:')
for ln, content in unmatched:
    print(ln, content)
print('\nTotal opens:', sum(1 for _,t,_ in occurrences if t=='open'))
print('Total closes:', sum(1 for _,t,_ in occurrences if t=='close'))
