import Head from "next/head";

export default function Layout({ title, children }) {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen py-2 dark:text-white dark:bg-black">
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

      <main className="flex flex-col items-start justify-start flex-1 p-8 lg:p-20">
        {children}
      </main>
    </div>
  );
}
