import { dirname } from "path"
import * as path from "path"
export default {
  staticPageGenerationTimeout: 300,
   turbopack: {

    root: dirname(path.join(__dirname))
  },
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'abs.twimg.com',
      'pbs.twimg.com',
      's3.us-west-2.amazonaws.com'
    ],
    formats: ['image/avif', 'image/webp']
  }
}
