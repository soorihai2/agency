import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

const QUALITY = 80; // WebP quality setting
const SOURCE_DIR = "static/images";
const EXTENSIONS = [".jpg", ".jpeg", ".png"];

async function convertToWebP(filePath) {
  const ext = path.extname(filePath);
  if (!EXTENSIONS.includes(ext.toLowerCase())) return;

  const webpPath = filePath.replace(ext, ".webp");

  // Skip if WebP version already exists
  try {
    await fs.access(webpPath);
    console.log(`Skipping ${filePath} - WebP version already exists`);
    return;
  } catch {
    // File doesn't exist, proceed with conversion
  }

  try {
    const command = `convert "${filePath}" -quality ${QUALITY} "${webpPath}"`;
    await execAsync(command);
    console.log(`Converted: ${filePath} -> ${webpPath}`);

    // Get file sizes for comparison
    const originalSize = (await fs.stat(filePath)).size;
    const webpSize = (await fs.stat(webpPath)).size;
    const savings = (((originalSize - webpSize) / originalSize) * 100).toFixed(
      2
    );
    console.log(
      `Size reduction: ${savings}% (${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(webpSize / 1024 / 1024).toFixed(2)}MB)`
    );
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error.message);
  }
}

async function processDirectory(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        await convertToWebP(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error.message);
  }
}

// Start the conversion process
console.log("Starting image conversion to WebP...");
processDirectory(SOURCE_DIR)
  .then(() => console.log("Conversion complete!"))
  .catch((error) => console.error("Conversion failed:", error));
