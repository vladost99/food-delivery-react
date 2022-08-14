import { readAndCompressImage } from 'browser-image-resizer';

const config = {
    quality: 0.7,
    width: 800,
    height: 600
  };
  

export const compressImage = async (file)  => {
    const resizeImage = await readAndCompressImage(file, config);
    return resizeImage;
}