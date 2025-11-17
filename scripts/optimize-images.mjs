import { mkdir, readdir, stat, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve(process.cwd(), "src/assets/img");

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch {
    // no-op
  }
}

async function optimizePng(filePath) {
  const originalStats = await stat(filePath);
  const originalSize = originalStats.size;

  const optimizedBuffer = await sharp(filePath)
    .png({
      compressionLevel: 9,
      effort: 10,
      palette: true,
      quality: 80,
    })
    .toBuffer();

  if (optimizedBuffer.length < originalSize) {
    await writeFile(filePath, optimizedBuffer);
    return {
      optimized: true,
      saved: originalSize - optimizedBuffer.length,
      size: optimizedBuffer.length,
      originalSize,
    };
  }

  return {
    optimized: false,
    saved: 0,
    size: originalSize,
    originalSize,
  };
}

async function optimizeDir(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  let totalSaved = 0;
  let processed = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const { saved, count } = await optimizeDir(fullPath);
      totalSaved += saved;
      processed += count;
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      const result = await optimizePng(fullPath);
      totalSaved += result.saved;
      processed += 1;
      const status = result.optimized ? "✓" : "–";
      console.log(
        `${status} ${entry.name}: ${(result.originalSize / 1024).toFixed(1)}KB → ${(result.size / 1024).toFixed(1)}KB`
      );
    }
  }

  return { saved: totalSaved, count: processed };
}

async function main() {
  await ensureDir(SOURCE_DIR);
  const { saved, count } = await optimizeDir(SOURCE_DIR);
  console.log(`Optimized ${count} images, saved ${(saved / 1024).toFixed(1)}KB total.`);
}

main().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exitCode = 1;
});

