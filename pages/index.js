import { request } from '@/lib/datocms';
import { renderMetaTags, useQuerySubscription } from 'react-datocms';
import { metaTagsFragment, responsiveImageFragment } from '@/lib/fragments';
import { Image } from 'react-datocms';
import Link from 'next/link';
import Layout from '@/components/layout';

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
      <ul className="grid md:grid-cols-2 w-full my-16 gap-16">
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
              <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                <h3 className="inline-block text-2xl font-thin tracking-wide border-b border-transparent group-hover:border-white/75 mr-8">
                  {project.title}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <div className="text-sm font-thin border rounded-full py-1 px-4 flex items-center leading-none">
                      {tag.name}
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
