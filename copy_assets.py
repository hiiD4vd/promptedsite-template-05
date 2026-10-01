import os
import shutil

src_dir = r'd:\daud\sourcecode\scrape\lacoste'
dest_dir = r'd:\daud\sourcecode\scrape\lacoste-next\public'

# Files to copy exactly
files_to_copy = [
    'main.bde6de19526f9beb.css',
    'vendor.9fe35287526f9beb.css',
    'mona-sans-regular.713fcaa7526f9beb.woff2',
    'mona-sans-medium.c9b12174526f9beb.woff2',
    'main.47e034a4526f9beb.js',
    'vendor.6be70aa8526f9beb.js',
    'webgl.a9816380526f9beb.js',
    'PhysicsWorker.cc067449526f9beb.js',
    'model.a91ccef3526f9beb.glb',
    'leveldesign.3584a385526f9beb.dat',
    'sprites.2b4a6611526f9beb.json',
    'sprites.cb470a98526f9beb.jpg',
    'floor-color.4a6fe46d526f9beb.jpg',
    'floor-height.e8f84b88526f9beb.jpg',
    'floor-normal.068212cd526f9beb.jpg',
    'floor-roughness.647961b0526f9beb.jpg',
    'ground.4a21dcf0526f9beb.png',
    'groundSDF.3b712345526f9beb.png',
    'stadiumRoughness-v2.66efc130526f9beb.png',
    'noise.bc6d9141526f9beb.png',
    'noise-darkest_512.d2118db8526f9beb.png',
    'promptedsiteSDF.6b047f16526f9beb.png',
    'sponsorpromptedsite.af9ef25f526f9beb.png'
]

dirs_to_copy = [
    'draco',
    'sdk.privacy-center.org',
    'assets'
]

for f in files_to_copy:
    src_f = os.path.join(src_dir, f)
    dst_f = os.path.join(dest_dir, f)
    if os.path.exists(src_f):
        shutil.copy2(src_f, dst_f)
        print(f"Copied {f}")

for d in dirs_to_copy:
    src_d = os.path.join(src_dir, d)
    dst_d = os.path.join(dest_dir, d)
    if os.path.exists(src_d):
        if os.path.exists(dst_d):
            shutil.rmtree(dst_d)
        shutil.copytree(src_d, dst_d)
        print(f"Copied directory {d}")

print("Assets copied successfully to Next.js public folder.")
