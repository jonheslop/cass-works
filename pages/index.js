import Head from "next/head";
import { request } from "../lib/datocms";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { metaTagsFragment, responsiveImageFragment } from "../lib/fragments";
import { Image } from "react-datocms";
import Link from "next/link";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      {
        allProjects {
          id
          title
          slug
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 400 }) {
              ...responsiveImageFragment
            }
          }
        }
      }
      ${responsiveImageFragment}
    `,
    preview,
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.CMS_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function Home({ subscription }) {
  const {
    data: { allProjects },
  } = useQuerySubscription(subscription);

  return (
    <div className="flex flex-col items-start justify-start min-h-screen py-2 dark:text-white dark:bg-black">
      <Head>
        <title>Cassie Leavers is cass.works</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Cassie Leavers is a graphic designer based in London."
        />
        <meta property="og:url" content="https://cass.works/" />
        <meta property="og:title" content="Cassie Leavers is cass.works" />
        <meta
          property="og:description"
          content="Cassie Leavers is a graphic designer based in London."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className="flex flex-col items-start justify-start flex-1 p-8 lg:p-20">
        <h1 className="text-xl md:text-4xl lg:text-8xl font-medium">
          cass.works/when-she-wants
          <br />
          <span className="opacity-0">cass.works</span>/on-branding
          <br />
          <span className="opacity-0">cass.works</span>/on-wayfinding
          <br />
          <span className="opacity-0">cass.works</span>/f*!king-hard
          <br />
          <span className="opacity-0">cass.works</span>/for-you
        </h1>

        <h2 className="mt-16 text-2xl font font-medium">Recent work</h2>
        <ul className="grid grid-cols-3 grid w-full my-16 gap-8">
          {allProjects.map((project) => (
            <Link as={`/projects/${project.slug}`} href="/projects/[slug]">
              <a className="hover:underline" key={project.id}>
                <Image
                  data={{
                    ...project.coverImage.responsiveImage,
                    alt: ``,
                  }}
                  className="shadow-small"
                />
                <h3 className="mt-4">{project.title}</h3>
              </a>
            </Link>
          ))}
        </ul>
      </main>
    </div>
  );
}
