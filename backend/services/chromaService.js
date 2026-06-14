import { ChromaClient } from "chromadb";

export async function getCollection() {
  const client = new ChromaClient({
    host: "localhost",
    port: 8000,
    ssl: false,
  });

  const embedder = () => {};
  return await client.getOrCreateCollection({
    name: "resumes",
  });
}
