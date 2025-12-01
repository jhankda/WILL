export const rootNotionPageId = process.env.ROOT_PAGE_ID
export const rootNotionSpaceId = undefined

export const previewImagesEnabled = true

export const useOfficialNotionAPI =
  process.env.USE_OFFICIAL_NOTION_API === 'true' && !!process.env.NOTION_TOKEN

export const isDev =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const port = process.env.PORT || 3000
export const rootDomain = isDev ? `localhost:${port}` : undefined
