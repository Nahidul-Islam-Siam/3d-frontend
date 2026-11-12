export interface OptimizeImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  skipThresholdBytes?: number;
}

export interface OptimizedImageResult {
  file: File;
  originalBytes: number;
  optimizedBytes: number;
  width: number;
  height: number;
  wasCompressed: boolean;
}

/**
 * Downscales large raster images and re-encodes them as compact WebP (with JPEG fallback)
 * before sending to Cloudinary so uploads stay lightweight and fast.
 */
export async function optimizeImageForUpload(
  file: File,
  options: OptimizeImageOptions = {},
): Promise<OptimizedImageResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.84,
    skipThresholdBytes = 120 * 1024,
  } = options;

  // Preserve animated GIFs or SVGs unmodified
  if (file.type === 'image/gif' || file.type === 'image/svg+xml') {
    return {
      file,
      originalBytes: file.size,
      optimizedBytes: file.size,
      width: 0,
      height: 0,
      wasCompressed: false,
    };
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to decode selected image.'));
      image.src = objectUrl;
    });

    const scale = Math.min(
      1,
      maxWidth / (img.naturalWidth || maxWidth),
      maxHeight / (img.naturalHeight || maxHeight),
    );
    const targetWidth = Math.max(1, Math.round(img.naturalWidth * scale));
    const targetHeight = Math.max(1, Math.round(img.naturalHeight * scale));

    // Already small WebP/AVIF within bounding box
    if (
      scale === 1 &&
      file.size <= skipThresholdBytes &&
      (file.type === 'image/webp' || file.type === 'image/avif')
    ) {
      return {
        file,
        originalBytes: file.size,
        optimizedBytes: file.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
        wasCompressed: false,
      };
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return {
        file,
        originalBytes: file.size,
        optimizedBytes: file.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
        wasCompressed: false,
      };
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    const encode = (mime: string): Promise<Blob | null> =>
      new Promise((resolve) => canvas.toBlob(resolve, mime, quality));

    let targetMime = 'image/webp';
    let blob = await encode(targetMime);

    if (!blob || blob.type !== 'image/webp') {
      targetMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      blob = await encode(targetMime);
    }

    if (!blob || (scale === 1 && blob.size >= file.size)) {
      return {
        file,
        originalBytes: file.size,
        optimizedBytes: file.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
        wasCompressed: false,
      };
    }

    const ext =
      targetMime === 'image/webp'
        ? 'webp'
        : targetMime === 'image/png'
          ? 'png'
          : 'jpg';
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'image';
    const optimizedFile = new File([blob], `${baseName}.${ext}`, {
      type: targetMime,
      lastModified: Date.now(),
    });

    return {
      file: optimizedFile,
      originalBytes: file.size,
      optimizedBytes: optimizedFile.size,
      width: targetWidth,
      height: targetHeight,
      wasCompressed: true,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

