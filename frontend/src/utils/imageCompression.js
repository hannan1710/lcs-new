/**
 * Automatic Image Compression Utility
 * Compresses images automatically when uploaded or processed
 */

// Client-side image compression using Canvas API
export const compressImage = (file, options = {}) => {
  const {
    quality = 0.8,
    maxWidth = 1920,
    maxHeight = 1080,
    outputFormat = 'image/jpeg'
  } = options;

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, outputFormat, quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Batch compress multiple images
export const compressImages = async (files, options = {}) => {
  const compressedFiles = [];
  
  for (const file of files) {
    try {
      const compressedBlob = await compressImage(file, options);
      const compressedFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
        lastModified: Date.now()
      });
      compressedFiles.push(compressedFile);
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
      compressedFiles.push(file); // Use original if compression fails
    }
  }
  
  return compressedFiles;
};

// Get file size in MB
export const getFileSize = (file) => {
  return (file.size / (1024 * 1024)).toFixed(2);
};

// Check if image needs compression (larger than 1MB)
export const needsCompression = (file) => {
  return file.size > 1024 * 1024; // 1MB
};

// Auto-compress image if it's too large
export const autoCompressIfNeeded = async (file, options = {}) => {
  if (needsCompression(file)) {
    console.log(`🖼️ Compressing large image: ${file.name} (${getFileSize(file)}MB)`);
    const compressedBlob = await compressImage(file, options);
    const compressedFile = new File([compressedBlob], file.name, {
      type: compressedBlob.type,
      lastModified: Date.now()
    });
    
    console.log(`✅ Compressed to: ${getFileSize(compressedFile)}MB`);
    return compressedFile;
  }
  
  return file;
};

// Convert image to WebP format
export const convertToWebP = async (file, quality = 0.8) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(resolve, 'image/webp', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Smart compression based on image type and size
export const smartCompress = async (file) => {
  const isJPEG = file.type === 'image/jpeg' || file.name.toLowerCase().includes('.jpg');
  const isPNG = file.type === 'image/png';
  
  let options = {
    quality: 0.8,
    maxWidth: 1920,
    maxHeight: 1080
  };
  
  // Adjust settings based on image type
  if (isJPEG) {
    options.outputFormat = 'image/jpeg';
    options.quality = 0.85; // Higher quality for JPEG
  } else if (isPNG) {
    options.outputFormat = 'image/png';
    options.quality = 0.9; // Higher quality for PNG
  }
  
  // Adjust quality based on file size
  if (file.size > 5 * 1024 * 1024) { // > 5MB
    options.quality = 0.7;
    options.maxWidth = 1600;
    options.maxHeight = 900;
  } else if (file.size > 2 * 1024 * 1024) { // > 2MB
    options.quality = 0.75;
  }
  
  return await compressImage(file, options);
};
