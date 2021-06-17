import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { request } from "@/lib/datocms";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";
import markdownStyles from "@/components/markdown.module.css";
import Layout from "@/components/layout";
import Single from "@/components/images-single";
import Double from "@/components/images-double";
import { Image } from "react-datocms";

export async function getStaticPaths() {
  const data = await request({ query: `{ allProjects { slug } }` });

  return {
    paths: data.allProjects.map((project) => `/work/${project.slug}`),
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
          layout {
            ... on DoubleImageRecord {
              id
              double {
                id
                responsiveImage(imgixParams: {fm: jpg, w: 1800 }) {
                  ...responsiveImageFragment
                }
              }
            }
            ... on SingleImageRecord {
              id
              image {
                responsiveImage(imgixParams: {fm: jpg, w: 1800 }) {
                  ...responsiveImageFragment
                }
              }
              imagePosition
              imageSize
            }
          }
        }
      }
      ${responsiveImageFragment}
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
      <div className="grid grid-cols-2 grid w-full my-16 gap-10">
        <h1 className="text-4xl">{project.title}</h1>
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </div>
      {project.layout.map((block) => {
        if (block.hasOwnProperty("image")) {
          return (
            <Single
              key={block.id}
              image={block.image}
              position={block.imagePosition}
              size={block.imageSize}
            />
          );
        }
        if (block.hasOwnProperty("double")) {
          return <Double key={block.id} images={block.double} />;
        }
      })}
    </Layout>
  );
}
