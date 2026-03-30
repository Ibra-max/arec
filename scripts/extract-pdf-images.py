"""Extract all images from AREC Business profile PDF."""
import fitz
import os
import sys

PDF_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'Business profile.pdf')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')

doc = fitz.open(PDF_PATH)
total = 0

for page_num in range(len(doc)):
    page = doc[page_num]
    images = page.get_images(full=True)
    for img_idx, img in enumerate(images):
        xref = img[0]
        try:
            base_image = doc.extract_image(xref)
            image_bytes = base_image['image']
            ext = base_image['ext']
            w = base_image.get('width', 0)
            h = base_image.get('height', 0)
            size_kb = len(image_bytes) / 1024

            filename = f'pdf_p{page_num+1}_img{img_idx+1}.{ext}'
            filepath = os.path.join(OUTPUT_DIR, filename)

            with open(filepath, 'wb') as f:
                f.write(image_bytes)

            print(f'Page {page_num+1}, Image {img_idx+1}: {w}x{h}, {size_kb:.1f}KB -> {filename}')
            total += 1
        except Exception as e:
            print(f'Page {page_num+1}, Image {img_idx+1}: FAILED - {e}')

print(f'\nTotal extracted: {total} images')
doc.close()
