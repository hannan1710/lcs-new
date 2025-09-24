import { useState, useCallback } from 'react';
import { compressImage, autoCompressIfNeeded, smartCompress, getFileSize } from '../utils/imageCompression';

/**
 * React Hook for Automatic Image Compression
 * Automatically compresses images when uploaded
 */
export const useImageCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const compressSingleImage = useCallback(async (file, options = {}) => {
    setIsCompressing(true);
    setCompressionProgress(0);
    
    try {
      const originalSize = getFileSize(file);
      console.log(`🖼️ Original image: ${file.name} (${originalSize}MB)`);
      
      // Auto-compress if needed
      const compressedFile = await autoCompressIfNeeded(file, options);
      
      setCompressionProgress(100);
      const compressedSize = getFileSize(compressedFile);
      
      console.log(`✅ Compressed image: ${file.name} (${compressedSize}MB)`);
      
      return compressedFile;
    } catch (error) {
      console.error('Image compression failed:', error);
      return file; // Return original if compression fails
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  }, []);

  const compressMultipleImages = useCallback(async (files, options = {}) => {
    setIsCompressing(true);
    setCompressionProgress(0);
    
    const compressedFiles = [];
    const totalFiles = files.length;
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progress = ((i + 1) / totalFiles) * 100;
        setCompressionProgress(progress);
        
        const compressedFile = await autoCompressIfNeeded(file, options);
        compressedFiles.push(compressedFile);
      }
      
      console.log(`✅ Compressed ${compressedFiles.length} images`);
      return compressedFiles;
    } catch (error) {
      console.error('Batch compression failed:', error);
      return files; // Return original files if compression fails
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  }, []);

  const smartCompressImage = useCallback(async (file) => {
    setIsCompressing(true);
    setCompressionProgress(0);
    
    try {
      const originalSize = getFileSize(file);
      console.log(`🧠 Smart compressing: ${file.name} (${originalSize}MB)`);
      
      const compressedFile = await smartCompress(file);
      
      setCompressionProgress(100);
      const compressedSize = getFileSize(compressedFile);
      
      console.log(`✅ Smart compressed: ${file.name} (${compressedSize}MB)`);
      
      return compressedFile;
    } catch (error) {
      console.error('Smart compression failed:', error);
      return file;
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  }, []);

  return {
    compressSingleImage,
    compressMultipleImages,
    smartCompressImage,
    isCompressing,
    compressionProgress
  };
};
