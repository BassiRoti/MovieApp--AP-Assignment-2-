import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // Load the JSON data
    const filePath = path.join(process.cwd(), "Data", "Movies.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const parsedData = JSON.parse(fileData);

    // Find the director with the given ID
    const director = parsedData.directors.find((d) => d.id === id);

    if (director) {
      res.status(200).json(director);
    } else {
      res.status(404).json({ error: "Director not found" });
    }
  } catch (error) {
    console.error("Error reading director data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
