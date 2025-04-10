import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  inputDir: path.join(process.cwd(), "static", "videos", "input"),
  outputDir: path.join(process.cwd(), "static", "videos", "output"),
  formats: [
    {
      name: "mp4-h264",
      extension: "mp4",
      codec: "libx264",
      crf: 23,
      preset: "slow",
    },
    {
      name: "mp4-h265",
      extension: "mp4",
      codec: "libx265",
      crf: 28,
      preset: "slow",
    },
  ],
  resolutions: [
    { width: 1920, height: 1080 },
    { width: 1280, height: 720 },
    { width: 854, height: 480 },
  ],
};

if (!fs.existsSync(config.inputDir)) {
  fs.mkdirSync(config.inputDir, { recursive: true });
}
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

async function optimizeVideo(inputFile) {
  const filename = path.basename(inputFile, path.extname(inputFile));

  for (const format of config.formats) {
    for (const resolution of config.resolutions) {
      const outputFilename = `${filename}-${resolution.width}p-${format.name}.${format.extension}`;
      const outputPath = path.join(config.outputDir, outputFilename);

      const command = `ffmpeg -i "${inputFile}" -c:v ${format.codec} -crf ${format.crf} -preset ${format.preset} -vf scale=${resolution.width}:${resolution.height} -c:a aac -b:a 128k "${outputPath}"`;

      try {
        console.log(`Processing ${outputFilename}...`);
        await new Promise((resolve, reject) => {
          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error processing ${outputFilename}:`, error);
              reject(error);
            } else {
              console.log(`Successfully created ${outputFilename}`);
              resolve();
            }
          });
        });
      } catch (error) {
        console.error(`Failed to process ${outputFilename}`);
      }
    }
  }
}

async function processVideos() {
  try {
    const files = fs.readdirSync(config.inputDir);
    const videoFiles = files.filter((file) =>
      [".mp4", ".mov", ".avi", ".mkv"].includes(
        path.extname(file).toLowerCase()
      )
    );

    if (videoFiles.length === 0) {
      console.log("No video files found in input directory");
      return;
    }

    console.log(`Found ${videoFiles.length} video files to process`);

    for (const file of videoFiles) {
      const inputPath = path.join(config.inputDir, file);
      console.log(`\nProcessing ${file}...`);
      await optimizeVideo(inputPath);
    }

    console.log("\nAll videos processed successfully!");
  } catch (error) {
    console.error("Error processing videos:", error);
  }
}

processVideos();
