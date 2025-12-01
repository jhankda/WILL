export function extractDatabase(recordMap: any) {
  const collectionMap = recordMap.collection;

  if (!collectionMap) throw new Error("No collection found");
  const collectionId = Object.keys(collectionMap)[0];
  if (!collectionId) throw new Error("Empty collection map");
  const collection = collectionMap[collectionId]?.value;
  if (!collection) throw new Error("Collection has no value");
  const schema = collection.schema;

  const blocks = recordMap.block;

  const rows = Object.values(blocks)
    .map((b: any) => b.value)
    .filter(
      (block: any) =>
        block?.type === "page" &&
        block?.parent_id === collection.id
    );

  function parseProperties(row: any, schema: any) {
    const props: Record<string, any> = {};

    for (const key in row.properties) {
      const propertySchema = schema[key];
      const value = row.properties[key];

      if (!propertySchema || !value) continue;

      const type = propertySchema.type;

      if (type === "file") {
        
        const fileData = value[0]?.[1]?.[0]?.[1];
        const fileUrl = recordMap.signed_urls?.[fileData] || fileData;
        props[propertySchema.name] = fileUrl;
        continue;
      }

      if(propertySchema.name === "Tags"){
        props[propertySchema.name] = value?.[0]?.[0].split(',') ?? null;
        continue
      }
      if(propertySchema.name === "Links"){
        props[propertySchema.name] = value?.[0]?.[0].split(',') ?? null;
        continue
      }
    
      props[propertySchema.name] = value?.[0]?.[0] ?? null;
    }

    return props;
  }
  const table = rows.map((row: any) => ({
    id: row.id,
    lastEditedTime: row.last_edited_time,
    ...parseProperties(row, schema)
  })).filter((t:any) => t.Published==="Done")


  return { collection, rows: table };
}

