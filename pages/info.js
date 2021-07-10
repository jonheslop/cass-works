import { request } from "@/lib/datocms";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Link from "next/link";
import Layout from "@/components/layout";
import markdownStyles from "@/components/markdown.module.css";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      {
        info {
          title
          body(markdown: true)
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
  console.log(info)
  return (
    <Layout title="Info" preview={subscription.preview}>
      <div className="grid md:grid-cols-2 w-full my-16 gap-16">
        <article className="">
          <h2 className="text-2xl">{info.title}</h2>
          <div
            className={`font-extralight opacity-50 ${markdownStyles["markdown"]} max-w-xl`}
            dangerouslySetInnerHTML={{ __html: info.body }}
          />
        </article>
        <aside>
          <h3 className="text-2xl">Contact:</h3>
          <a
            className="block text-base md:text-2xl font-extralight hover:underline"
            href="mailto:cassie@cass.works"
          >
            cassie@cass.works
          </a>
          <a
            className="block text-base md:text-2xl font-extralight hover:underline"
            href="tel:07976304186"
          >
            07976 304186
          </a>
        </aside>
      </div>
    </Layout>
  );
}
