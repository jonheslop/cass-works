import { request } from "@/lib/datocms";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";
import { Image } from "react-datocms";
import Link from "next/link";
import Layout from "@/components/layout";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      {
        allProjects {
          id
          title
          slug
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 800, h: 600 }) {
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
    <Layout title="Work" preview={subscription.preview}>
      <ul className="grid md:grid-cols-2 w-full my-16 gap-16">
        {allProjects.map((project) => (
          <Link
            as={`/work/${project.slug}`}
            href="/work/[slug]"
            key={project.id}
          >
            <a className="hover:underline">
              <Image
                data={{
                  ...project.coverImage.responsiveImage,
                  alt: ``,
                }}
                className="shadow-small"
              />
              <h3 className="mt-4 text-2xl font-thin tracking-wide">
                {project.title}
              </h3>
            </a>
          </Link>
        ))}
      </ul>
    </Layout>
  );
}
