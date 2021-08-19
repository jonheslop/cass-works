import { request } from "@/lib/datocms";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Layout from "@/components/layout";
import markdownStyles from "@/components/markdown.module.css";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      {
        info {
          title
          body(markdown: true)
          rightSide(markdown: true)
          email
          phone
        }
      }
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

export default function Info({ subscription }) {
  const {
    data: { info },
  } = useQuerySubscription(subscription);

  return (
    <Layout title="Info" preview={subscription.preview}>
      <div className="sm:flex justify-between w-full my-16 gap-8 md:gap-16 xl:gap-32">
        <article className="">
          <div
            className={`font-extralight ${markdownStyles["markdown"]} max-w-xl`}
            dangerouslySetInnerHTML={{ __html: info.body }}
          />
        </article>
        <aside>
          <div
            className={`font-extralight ${markdownStyles["markdown"]} max-w-xl`}
          >
            <div dangerouslySetInnerHTML={{ __html: info.rightSide }} />
            <a
              className="block text-base md:text-2xl font-extralight hover:underline"
              href={`mailto:${info.email}`}
            >
              {info.email}
            </a>
            <a
              className="block text-base md:text-2xl font-extralight hover:underline"
              href={`tel:${info.phone}`}
            >
              {info.phone}
            </a>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
