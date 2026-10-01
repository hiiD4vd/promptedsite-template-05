import re

with open(r'd:\daud\sourcecode\scrape\lacoste\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract script blocks containing window.__DATA and window.projectConfig
scripts = re.findall(r'<script>(window\.__DATA.*?)<\/script>', content, re.DOTALL)
if scripts:
    with open(r'd:\daud\sourcecode\scrape\lacoste-next\public\init-data.js', 'w', encoding='utf-8') as f:
        for s in scripts:
            f.write(s + '\n')
    print("Extracted init-data.js")
else:
    print("Could not find window.__DATA script")
