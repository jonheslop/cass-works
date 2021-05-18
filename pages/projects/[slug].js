import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { request } from "@/lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";
import markdownStyles from "@/components/markdown.module.css";
import Layout from "@/components/layout";

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
    <Layout title={project.title}>
      <h1 className="text-4xl ">{project.title}</h1>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: project.description }}
      />
    </Layout>
  );
}
