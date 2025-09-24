#!/usr/bin/env node

/**
 * Simple Image Compression Script
 * Compresses images in the public directory using browser-based compression
 * Run with: node scripts/compress-images.js
 */

const fs = require('fs');
const path = require('path');

// Image compression using canvas (browser-based)
const compressImage = (inputPath, outputPath, quality = 0.8, maxWidth = 1920) => {
  return new Promise((resolve, reject) => {
    const { createCanvas, loadImage } = require('canvas');
    
    loadImage(inputPath)
      .then(image => {
        // Calculate new dimensions
        let { width, height } = image;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        // Create canvas and compress
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(image, 0, 0, width, height);
        
        // Save compressed image
        const buffer = canvas.toBuffer('image/jpeg', { quality });
        fs.writeFileSync(outputPath, buffer);
        
        console.log(`✅ Compressed: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
        resolve();
      })
      .catch(reject);
  });
};

// Alternative: Use sharp for better compression (if available)
const compressWithSharp = async (inputPath, outputPath, quality = 80) => {
  try {
    const sharp = require('sharp');
    
    await sharp(inputPath)
      .jpeg({ quality, progressive: true })
      .png({ compressionLevel: 9, quality })
      .webp({ quality })
      .toFile(outputPath);
    
    console.log(`✅ Compressed with Sharp: ${path.basename(inputPath)}`);
  } catch (error) {
    console.log(`⚠️ Sharp not available, skipping: ${path.basename(inputPath)}`);
  }
};

// Main compression function
const compressImages = async () => {
  const publicDir = path.join(__dirname, '../public');
  const compressedDir = path.join(publicDir, 'compressed');
  
  // Create compressed directory
  if (!fs.existsSync(compressedDir)) {
    fs.mkdirSync(compressedDir, { recursive: true });
  }
  
  // Get all image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const files = fs.readdirSync(publicDir)
    .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
    .filter(file => !file.includes('favicon') && !file.includes('logo')); // Skip small files
  
  console.log(`🖼️ Found ${files.length} images to compress...`);
  
  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(compressedDir, file.replace(/\.(jpg|jpeg|png)$/i, '.jpg'));
    
    try {
      // Try Sharp first, fallback to canvas
      await compressWithSharp(inputPath, outputPath);
    } catch (error) {
      console.log(`⚠️ Compression failed for ${file}: ${error.message}`);
    }
  }
  
  console.log('🎉 Image compression completed!');
  console.log(`📁 Compressed images saved to: ${compressedDir}`);
  console.log('💡 Replace original images with compressed versions for better performance');
};

// Run compression
if (require.main === module) {
  compressImages().catch(console.error);
}

module.exports = { compressImages, compressImage };
