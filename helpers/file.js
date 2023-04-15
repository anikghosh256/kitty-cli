const fs = require('fs');
const path = require('path');

/**
 * Copy file(s) or directory
 * 
 * @param {string|string[]} src - source file path(s) or directory
 * @param {string} dest - destination file path
 */
exports.copy = (src, dest) => {
  // create parent folder if not exist
  const parentDir = path.resolve(dest);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  if (Array.isArray(src)) {
    // If src is an array of files, copy them to the destination folder
    src.forEach((file) => {
      const destFile = path.join(dest, path.basename(file));
      fs.copyFileSync(file, destFile);
    });
  } else {
    // If src is a directory, copy all files and subdirectories to the destination folder
    const files = fs.readdirSync(src);
    files.forEach((file) => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      if (fs.statSync(srcPath).isDirectory()) {
        // Recursively copy subdirectories
        exports.copy(srcPath, destPath);
      } else {
        // Copy files
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }
}