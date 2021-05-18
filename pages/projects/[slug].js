import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { request } from "../../lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments";
import markdownStyles from "../../components/markdown.module.css";

export async function getStaticPaths() {
  const data = await request({ query: `{ allProjects { slug } }` });

  return {
    paths: data.allProjects.map((project) => `/projects/${project.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query ProjectBySlug($slug: String) {
        project(filter: {slug: {eq: $slug}}) {
          id
          slug
          title
          description(markdown: true)
        }
      }
    `,
    preview,
    variables: {
      slug: params.slug,
    },
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

export default function Post({ subscription, preview }) {
  const {
    data: { project },
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
        <h1 className="text-4xl ">{project.title}</h1>
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </main>
    </div>
  );
}
