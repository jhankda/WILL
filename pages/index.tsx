import { getAllPosts } from '../lib/db'

export type rows = {
  lastEditedTime?: number;
  Published?: "Done";
  id: string;
  Summary?: string;
  Tags?: string[];
  Name?: string;
  'Cover Image'?: string;
  Slug?: string;
  Links: string[];
}

export const getStaticProps = async () => {
  const rows = await getAllPosts();

  rows.forEach(row => console.log(row.Name,"::",row.id));



  return {
    props: {
      rows
    },
    revalidate: 60
  }
}


export default function Page({ rows }: { rows: rows[] }) {
  return (
    <><head><title>WILL</title></head>
      <svg width="0" height="0" className="absolute">
        <filter id="grainy">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.75"
            stitchTiles="stitch"
            numOctaves="1"
          />
        </filter>
      </svg>

          <div className="relative  min-h-screen bg-[#242424]">

        <div className="absolute  inset-0 pointer-events-none grain-layer"></div>

        <div className="relative z-10 container mx-auto px-xl">

          <div className="py-8 flex gap-6 items-end ">
            <h1 className="text-5xl text-[darkGoldenRod] frijole-regular font-bold">
              WILL
            </h1>

            <h2 className="text-4xl text-[darkGoldenRod] rock-3d-regular">
              WHAT I LEARNED, LOUDER
            </h2>
          </div>

          <div className="grid gap-6">
            {rows.map((post: rows) => (
              <article key={post.id} className="justify-center justify-self-center px-6 py-12 rounded-lg">

                <div className="h-[2vw] my-2 rounded-t-xl flex justify-end  items-center">
                  <p className="text-sm text-bold text-[#898B8A] p-2 grain-fade  flex-shrink-0">
                    {new Date(post.lastEditedTime || "").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>

                <div className="w-[56vw] aspect-[5/3] overflow-hidden rounded-xl justify-self-center">
                  <img src={`${post["Cover Image"]}`} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-row items-center">
                  <h2 className="text-3xl py-4 text-[#ADAEAD] font-semibold flex-shrink-0">
                    {post.Name || ""}
                  </h2>

                  <div className="border m-2 rounded-md h-0 border-[#898B8A] border-l border-dashed border-opacity-10 flex-grow min-w-[80px]"></div>

                  <div className="flex flex-wrap gap-6">
                    {post.Links.map((site) => {
                      const iconUrl = `https://geticon.io/img?url=${site}&size=64`;
                      return (
                        <div key={site}>
                          <a href={site} target='_blank'>
                            <img
                              src={iconUrl}
                              alt={`${site} icon`}
                              className="w-5 h-5 p-0 m-0 flex-shrink-0"
                            />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <p className="text-md text-[darkGoldenRod] tracking-wide">
                  {post.Tags?.join(" - ")}
                </p>
                <p className='text-[#ADAEAD] w-[56vw] '>
                  {post.Summary?.slice(0, 320)}
                  <a className="text-[darkGoldenRod] text-md" href={`/${post.Slug}`}> Learn more {'>'} </a>
                </p>

              </article>


            ))}

          </div>

        </div>
        <div className='py-10 bg-black  flex items-center  justify-end px-10 '>
          <h1 className='text-[#FFFFFF]  z-100   flex-wrap flex-shrink text-3xl  justify-self-center modak-regular'>
            असंशयम महाबाहो मनो दुर्निग्रहं चलम्। 
             अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥ ६-३५॥<br />
            असंगवशातः सर्वत्र असमथात्मनः मनः।
            न शक्योऽवाप्युमानो वा स्पृशत्यनास्थितः॥ ६-३६॥<br />
          </h1>
        </div>
      </div>




    </>
  )
}

