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
          tags {
            id
            name
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
      <ul className="my-16 grid w-full gap-16 md:grid-cols-2">
        {allProjects.map((project) => (
          <Link
            as={`/work/${project.slug}`}
            href="/work/[slug]"
            key={project.id}
          >
            <a className="group">
              <Image
                data={{
                  ...project.coverImage.responsiveImage,
                  alt: ``,
                }}
                className="shadow-small"
              />
              <div className="mt-4 flex flex-col gap-3">
                <h3 className="mr-8 inline-block text-2xl font-thin tracking-wide">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center rounded-full border px-4 py-1 text-sm font-light leading-none"
                    >
                      <span className="-mt-px">{tag.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </ul>
    </Layout>
  );
}
