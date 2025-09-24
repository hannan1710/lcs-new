import React, { useState } from 'react';
import { useImageCompression } from '../hooks/useImageCompression';
import Icon from './AppIcon';

/**
 * Image Uploader Component with Automatic Compression
 * Automatically compresses images when uploaded
 */
const ImageUploader = ({ onImagesUploaded, maxFiles = 10 }) => {
  const [dragActive, setDragActive] = useState(false);
  const { compressMultipleImages, isCompressing, compressionProgress } = useImageCompression();

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    
    if (fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Filter only image files
    const imageFiles = fileArray.filter(file => 
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      alert('Please select image files only');
      return;
    }

    try {
      // Automatically compress images
      const compressedImages = await compressMultipleImages(imageFiles);
      
      // Call callback with compressed images
      if (onImagesUploaded) {
        onImagesUploaded(compressedImages);
      }
      
      console.log(`✅ Uploaded and compressed ${compressedImages.length} images`);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-accent bg-accent/5' 
            : 'border-border hover:border-accent/50'
        } ${isCompressing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isCompressing}
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Upload" size={32} className="text-accent" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isCompressing ? 'Compressing Images...' : 'Upload Images'}
            </h3>
            <p className="text-muted-foreground">
              {isCompressing 
                ? `Processing... ${Math.round(compressionProgress)}%`
                : 'Drag and drop images here or click to browse'
              }
            </p>
          </div>
          
          {isCompressing && (
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${compressionProgress}%` }}
              />
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>• Images will be automatically compressed</p>
            <p>• Supported formats: JPG, PNG, WebP</p>
            <p>• Maximum {maxFiles} files</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
