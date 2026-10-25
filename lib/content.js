import fs from "fs";
import path from "path";
import defaultContent from "@/data/defaultContent.json";

export async function getSiteContent() {
  try {
    const filePath = path.join(process.cwd(), "data", "siteContent.json");
    if (fs.existsSync(filePath)) {
      const fileData = await fs.promises.readFile(filePath, "utf-8");
      const parsed = JSON.parse(fileData);
      return { ...defaultContent, ...parsed };
    }
  } catch (error) {
    console.error("Error reading siteContent.json, falling back to default:", error);
  }
  return defaultContent;
}
