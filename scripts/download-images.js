import fs from "fs";
import path from "path";
import https from "https";
import sharp from "sharp";

const images = [
  {
    url: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg",
    filename: "hero-bg.jpg",
    width: 1920,
    height: 1080,
  },
  {
    url: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
    filename: "computer-training.jpg",
    width: 800,
    height: 600,
  },
  {
    url: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    filename: "stitching-training.jpg",
    width: 800,
    height: 600,
  },
  {
    url: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    filename: "placement.jpg",
    width: 800,
    height: 600,
  },
];

const outputDir = path.join(process.cwd(), "static", "images");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Download and optimize images
async function downloadAndOptimizeImage(image) {
  return new Promise((resolve, reject) => {
    https
      .get(image.url, (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", async () => {
          const buffer = Buffer.concat(chunks);
          const outputPath = path.join(outputDir, image.filename);

          try {
            await sharp(buffer)
              .resize(image.width, image.height, {
                fit: "cover",
                position: "center",
              })
              .jpeg({ quality: 80 })
              .toFile(outputPath);

            console.log(`Downloaded and optimized: ${image.filename}`);
            resolve();
          } catch (error) {
            console.error(`Error processing ${image.filename}:`, error);
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        console.error(`Error downloading ${image.filename}:`, error);
        reject(error);
      });
  });
}

// Process all images
async function processImages() {
  try {
    for (const image of images) {
      await downloadAndOptimizeImage(image);
    }
    console.log("All images processed successfully!");
  } catch (error) {
    console.error("Error processing images:", error);
    process.exit(1);
  }
}

processImages();
