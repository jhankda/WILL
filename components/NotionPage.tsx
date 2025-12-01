import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'
import { NotionRenderer } from 'react-notion-x'
import TweetEmbed from 'react-tweet-embed'

import { Loading } from './Loading'

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-markup-templating.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-markup.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-bash.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-c.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-cpp.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-csharp.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-docker.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-java.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-js-templates.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-coffeescript.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-diff.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-git.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-go.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-graphql.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-handlebars.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-less.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-makefile.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-markdown.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-objectivec.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-ocaml.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-python.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-reason.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-rust.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-sass.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-scss.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-solidity.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-sql.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-stylus.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-swift.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-wasm.js'),
      // @ts-expect-error ignore no prisma types
      import('prismjs/components/prism-yaml.js')
    ])
    return m.Code
  }),{
    ssr:false
  }
)
const Collection = dynamic(
  () =>
    import('react-notion-x/build/third-party/collection').then(
      (m) => m.Collection
    ),
  {
    ssr: false
  }
)

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
  {
    ssr: false
  }
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)

function Tweet({ id }: { id: string }) {
  return <TweetEmbed tweetId={id} />

}

export function NotionPage({
  recordMap,
  previewImagesEnabled,
  rootPageId,
  rootDomain
}: {
  recordMap: ExtendedRecordMap
  previewImagesEnabled?: boolean
  rootPageId?: string
  rootDomain?: string
}) {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading />
  }

  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap) ?? 'WILL'

  const socialDescription = 'What I Learned Louder'
  const socialImage =
    'https://i.pinimg.com/1200x/29/6b/55/296b55527c47137309564bcf4c758073.jpg'

  return (
    <>
      <Head>
        {socialDescription && (
          <>
            <meta name='description' content={socialDescription} />
            <meta property='og:description' content={socialDescription} />
            <meta name='twitter:description' content={socialDescription} />
          </>
        )}

        {socialImage ? (
          <>
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:image' content={socialImage} />
            <meta property='og:image' content={socialImage} />
          </>
        ) : (
          <meta name='twitter:card' content='summary' />
        )}

        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:creator' content='@transitive_bs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        rootDomain={rootDomain}
        rootPageId={rootPageId}
        previewImages={previewImagesEnabled}
        components={{
          nextLegacyImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Equation,
          Pdf,
          Modal,
          Tweet
        }}

      />
    </>
  )
}
