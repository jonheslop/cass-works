import Head from "next/head";
import Nav from "@/components/nav";
import Preview from "@/components/preview";

export default function Layout({
  title,
  preview = false,
  showHomeLink = true,
  children,
}) {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen">
      <Head>
        <title>{title} - Cassie Leavers is cass.works</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Cassie Leavers is a graphic designer based in London."
        />
        <meta property="og:url" content="https://cass.works/" />
        <meta
          property="og:title"
          content={`${title} - Cassie Leavers is cass.works`}
        />
        <meta
          property="og:description"
          content="Cassie Leavers is a graphic designer based in London."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className="flex flex-col items-start justify-start flex-1 px-8 lg:px-24 w-full">
        <Preview preview={preview} />
        <Nav showHomeLink={showHomeLink} />
        {children}
      </main>
    </div>
  );
}
