"""Organize extracted PDF images into proper directories."""
import os
import shutil
import glob

IMG_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')
os.chdir(IMG_DIR)

moves = {
    'pdf_p1_img1.jpeg': 'logo.jpeg',
    # Architecture (pages 3-7)
    'pdf_p3_img1.jpeg': 'portfolio/architecture/icon_01.jpeg',
    'pdf_p3_img2.jpeg': 'portfolio/architecture/icon_02.jpeg',
    'pdf_p3_img3.jpeg': 'portfolio/architecture/icon_03.jpeg',
    'pdf_p3_img4.jpeg': 'portfolio/architecture/icon_04.jpeg',
    'pdf_p4_img1.jpeg': 'portfolio/architecture/arch_01.jpeg',
    'pdf_p4_img2.jpeg': 'portfolio/architecture/arch_02.jpeg',
    'pdf_p4_img3.jpeg': 'portfolio/architecture/arch_03.jpeg',
    'pdf_p4_img4.jpeg': 'portfolio/architecture/arch_04.jpeg',
    'pdf_p4_img5.jpeg': 'portfolio/architecture/arch_05.jpeg',
    'pdf_p4_img6.jpeg': 'portfolio/architecture/arch_06.jpeg',
    'pdf_p4_img7.jpeg': 'portfolio/architecture/arch_07.jpeg',
    'pdf_p5_img1.jpeg': 'portfolio/architecture/arch_08.jpeg',
    'pdf_p5_img2.jpeg': 'portfolio/architecture/arch_09.jpeg',
    'pdf_p5_img3.jpeg': 'portfolio/architecture/arch_10.jpeg',
    'pdf_p5_img4.jpeg': 'portfolio/architecture/arch_11.jpeg',
    'pdf_p5_img5.jpeg': 'portfolio/architecture/arch_12.jpeg',
    'pdf_p5_img6.jpeg': 'portfolio/architecture/arch_13.jpeg',
    'pdf_p5_img7.jpeg': 'portfolio/architecture/arch_14.jpeg',
    'pdf_p5_img8.jpeg': 'portfolio/architecture/arch_15.jpeg',
    'pdf_p5_img9.jpeg': 'portfolio/architecture/arch_16.jpeg',
    'pdf_p6_img1.jpeg': 'portfolio/architecture/arch_17.jpeg',
    'pdf_p6_img2.jpeg': 'portfolio/architecture/arch_18.jpeg',
    'pdf_p6_img3.jpeg': 'portfolio/architecture/arch_19.jpeg',
    'pdf_p6_img4.jpeg': 'portfolio/architecture/arch_20.jpeg',
    'pdf_p6_img5.jpeg': 'portfolio/architecture/arch_21.jpeg',
    'pdf_p6_img6.jpeg': 'portfolio/architecture/arch_22.jpeg',
    'pdf_p6_img7.jpeg': 'portfolio/architecture/arch_23.jpeg',
    'pdf_p7_img1.jpeg': 'portfolio/architecture/arch_24.jpeg',
    'pdf_p7_img2.jpeg': 'portfolio/architecture/arch_25.jpeg',
    'pdf_p7_img3.jpeg': 'portfolio/architecture/arch_26.jpeg',
    'pdf_p7_img4.jpeg': 'portfolio/architecture/arch_27.jpeg',
    'pdf_p7_img5.jpeg': 'portfolio/architecture/arch_28.jpeg',
    'pdf_p7_img6.jpeg': 'portfolio/architecture/arch_29.jpeg',
    'pdf_p7_img7.jpeg': 'portfolio/architecture/arch_30.jpeg',
    'pdf_p7_img8.jpeg': 'portfolio/architecture/arch_31.jpeg',
    'pdf_p7_img9.jpeg': 'portfolio/architecture/arch_32.jpeg',
    'pdf_p7_img10.jpeg': 'portfolio/architecture/arch_33.jpeg',
    'pdf_p7_img11.jpeg': 'portfolio/architecture/arch_34.jpeg',
    'pdf_p7_img12.jpeg': 'portfolio/architecture/arch_35.jpeg',
    'pdf_p7_img13.jpeg': 'portfolio/architecture/arch_36.jpeg',
    # Structural (pages 8-11)
    'pdf_p8_img1.jpeg': 'portfolio/structural/struct_01.jpeg',
    'pdf_p8_img2.jpeg': 'portfolio/structural/struct_02.jpeg',
    'pdf_p8_img3.jpeg': 'portfolio/structural/struct_03.jpeg',
    'pdf_p8_img4.jpeg': 'portfolio/structural/struct_04.jpeg',
    'pdf_p8_img5.jpeg': 'portfolio/structural/struct_05.jpeg',
    'pdf_p8_img6.jpeg': 'portfolio/structural/struct_06.jpeg',
    'pdf_p8_img7.jpeg': 'portfolio/structural/struct_07.jpeg',
    'pdf_p8_img8.jpeg': 'portfolio/structural/struct_08.jpeg',
    'pdf_p8_img9.jpeg': 'portfolio/structural/struct_09.jpeg',
    'pdf_p9_img1.jpeg': 'portfolio/structural/struct_10.jpeg',
    'pdf_p9_img2.jpeg': 'portfolio/structural/struct_11.jpeg',
    'pdf_p9_img3.jpeg': 'portfolio/structural/struct_12.jpeg',
    'pdf_p9_img4.jpeg': 'portfolio/structural/struct_13.jpeg',
    'pdf_p9_img5.jpeg': 'portfolio/structural/struct_14.jpeg',
    'pdf_p9_img6.jpeg': 'portfolio/structural/struct_15.jpeg',
    'pdf_p9_img7.jpeg': 'portfolio/structural/struct_16.jpeg',
    'pdf_p9_img8.png': 'portfolio/structural/struct_17.png',
    'pdf_p9_img9.jpeg': 'portfolio/structural/struct_18.jpeg',
    'pdf_p9_img10.jpeg': 'portfolio/structural/struct_19.jpeg',
    'pdf_p10_img1.jpeg': 'portfolio/structural/struct_20.jpeg',
    'pdf_p10_img2.jpeg': 'portfolio/structural/struct_21.jpeg',
    'pdf_p10_img3.jpeg': 'portfolio/structural/struct_22.jpeg',
    'pdf_p10_img4.jpeg': 'portfolio/structural/struct_23.jpeg',
    'pdf_p10_img5.jpeg': 'portfolio/structural/struct_24.jpeg',
    'pdf_p10_img6.jpeg': 'portfolio/structural/struct_25.jpeg',
    'pdf_p10_img7.jpeg': 'portfolio/structural/struct_26.jpeg',
    'pdf_p10_img8.jpeg': 'portfolio/structural/struct_27.jpeg',
    'pdf_p10_img9.jpeg': 'portfolio/structural/struct_28.jpeg',
    'pdf_p10_img10.jpeg': 'portfolio/structural/struct_29.jpeg',
    'pdf_p10_img11.jpeg': 'portfolio/structural/struct_30.jpeg',
    'pdf_p11_img1.jpeg': 'portfolio/structural/struct_31.jpeg',
    'pdf_p11_img2.jpeg': 'portfolio/structural/struct_32.jpeg',
    'pdf_p11_img3.jpeg': 'portfolio/structural/struct_33.jpeg',
    'pdf_p11_img4.jpeg': 'portfolio/structural/struct_34.jpeg',
    'pdf_p11_img5.jpeg': 'portfolio/structural/struct_35.jpeg',
    'pdf_p11_img6.jpeg': 'portfolio/structural/struct_36.jpeg',
    'pdf_p11_img7.jpeg': 'portfolio/structural/struct_37.jpeg',
    'pdf_p11_img8.jpeg': 'portfolio/structural/struct_38.jpeg',
    'pdf_p11_img9.jpeg': 'portfolio/structural/struct_39.jpeg',
    'pdf_p11_img10.jpeg': 'portfolio/structural/struct_40.jpeg',
    'pdf_p11_img11.jpeg': 'portfolio/structural/struct_41.jpeg',
    'pdf_p11_img12.jpeg': 'portfolio/structural/struct_42.jpeg',
    'pdf_p11_img13.jpeg': 'portfolio/structural/struct_43.jpeg',
    # Solar (pages 12-13)
    'pdf_p12_img1.jpeg': 'portfolio/solar/solar_01.jpeg',
    'pdf_p12_img2.jpeg': 'portfolio/solar/solar_02.jpeg',
    'pdf_p12_img3.jpeg': 'portfolio/solar/solar_03.jpeg',
    'pdf_p12_img4.jpeg': 'portfolio/solar/solar_04.jpeg',
    'pdf_p12_img5.jpeg': 'portfolio/solar/solar_05.jpeg',
    'pdf_p12_img6.jpeg': 'portfolio/solar/solar_06.jpeg',
    'pdf_p12_img7.jpeg': 'portfolio/solar/solar_07.jpeg',
    'pdf_p13_img1.jpeg': 'portfolio/solar/solar_08.jpeg',
    'pdf_p13_img2.jpeg': 'portfolio/solar/solar_09.jpeg',
    'pdf_p13_img3.jpeg': 'portfolio/solar/solar_10.jpeg',
    'pdf_p13_img4.jpeg': 'portfolio/solar/solar_11.jpeg',
    'pdf_p13_img5.jpeg': 'portfolio/solar/solar_12.jpeg',
    'pdf_p13_img6.jpeg': 'portfolio/solar/solar_13.jpeg',
    'pdf_p13_img7.jpeg': 'portfolio/solar/solar_14.jpeg',
    'pdf_p13_img8.jpeg': 'portfolio/solar/solar_15.jpeg',
    'pdf_p13_img9.jpeg': 'portfolio/solar/solar_16.jpeg',
    'pdf_p13_img10.jpeg': 'portfolio/solar/solar_17.jpeg',
    # Safety (page 14)
    'pdf_p14_img1.jpeg': 'safety/safety_01.jpeg',
    'pdf_p14_img2.jpeg': 'safety/safety_02.jpeg',
    'pdf_p14_img3.jpeg': 'safety/safety_03.jpeg',
    # Client logos (page 15)
    'pdf_p15_img1.png': 'clients/client_01.png',
    'pdf_p15_img2.png': 'clients/client_02.png',
    'pdf_p15_img3.png': 'clients/client_03.png',
    'pdf_p15_img4.jpeg': 'clients/client_04.jpeg',
    'pdf_p15_img5.png': 'clients/client_05.png',
    'pdf_p15_img6.png': 'clients/client_06.png',
    'pdf_p15_img7.png': 'clients/client_07.png',
    'pdf_p15_img8.png': 'clients/client_08.png',
    'pdf_p15_img9.jpeg': 'clients/client_09.jpeg',
    'pdf_p15_img10.jpeg': 'clients/client_10.jpeg',
    'pdf_p15_img11.png': 'clients/client_11.png',
    'pdf_p15_img12.png': 'clients/client_12.png',
    'pdf_p15_img13.jpeg': 'clients/client_13.jpeg',
    'pdf_p15_img14.jpeg': 'clients/client_14.jpeg',
    'pdf_p15_img15.png': 'clients/client_15.png',
    'pdf_p15_img16.jpeg': 'clients/client_16.jpeg',
    'pdf_p15_img17.png': 'clients/client_17.png',
    'pdf_p15_img18.png': 'clients/client_18.png',
    'pdf_p15_img19.jpeg': 'clients/client_19.jpeg',
    'pdf_p15_img20.png': 'clients/client_20.png',
    'pdf_p15_img21.jpeg': 'clients/client_21.jpeg',
    'pdf_p15_img22.png': 'clients/client_22.png',
    'pdf_p15_img23.jpeg': 'clients/client_23.jpeg',
}

count = 0
for src, dst in moves.items():
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst) if os.path.dirname(dst) else '.', exist_ok=True)
        shutil.copy2(src, dst)
        count += 1

# Hero background
shutil.copy2('portfolio/solar/solar_01.jpeg', 'hero/hero_bg.jpeg')
count += 1

# Clean up originals
for f in glob.glob('pdf_p*'):
    os.remove(f)

print(f'Organized {count} images, cleaned up originals')
