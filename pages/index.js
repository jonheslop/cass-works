import Head from "next/head";

export default function Home() {
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
        <h1 className="text-xl md:text-4xl lg:text-8xl font-medium">
          cass.works/when-she-wants
          <br />
          <span className="opacity-0">cass.works</span>/on-branding
          <br />
          <span className="opacity-0">cass.works</span>/on-wayfinding
          <br />
          <span className="opacity-0">cass.works</span>/f*!king-hard
          <br />
          <span className="opacity-0">cass.works</span>/for-you
        </h1>
      </main>
    </div>
  );
}
