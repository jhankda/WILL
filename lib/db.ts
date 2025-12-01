import { rootNotionPageId } from './config'
import * as notion from './notion'
import { extractDatabase } from './extractDatabase'

let cachedRows: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; 

export async function getAllPosts() {
  const now = Date.now();

  if (cachedRows && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedRows;
  }

  try {
    const recordMap = await notion.getPage(rootNotionPageId!);
    
    const { rows } = extractDatabase(recordMap);

    const validRows = rows.filter((row: any) => row.Slug && row.Published === "Done");

    cachedRows = validRows;
    lastFetchTime = now;

    return validRows;
  } catch (error) {
    console.error("Failed to fetch database:", error);
    if (cachedRows) return cachedRows;
    throw error;
  }
}