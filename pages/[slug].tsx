import { type ExtendedRecordMap } from 'notion-types'
import { getAllPosts } from '../lib/db'
import { NotionPage } from '../components/NotionPage'
import {
  previewImagesEnabled,
  rootDomain,
  rootNotionPageId,
} from '../lib/config'
import * as notion from '../lib/notion'
import type { rows } from '.'

export const getStaticProps = async (context: any) => {
  const slug = context.params.slug as string

  const posts = await getAllPosts();

  console.log("POSTS", posts.length)

  const post = posts.find((p: rows) => p.Slug === slug)

  if (!post) {
    return { notFound: true }
  }


  const recordMap = await notion.getPage(post.id)


  return {
    props: {
      recordMap
    },
    revalidate: 36000
  }
}


export async function getStaticPaths() {
  const posts = await getAllPosts()

  const paths = posts.map((p: rows) => ({
    params: { slug: p.Slug }
  }))


  return {
    paths,
    fallback: 'blocking'
  }
}

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootNotionPageId}
      previewImagesEnabled={previewImagesEnabled}
    />
  )
}
