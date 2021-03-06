import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen py-2">
      <Head>
        <title>Cassie Leavers - cass.works</title>

        <meta
          name="description"
          content="Cassie Leavers is a graphic designer based in London."
        />
      </Head>

      <main className="flex flex-col items-start justify-start flex-1 p-8 lg:p-20">
        <h1 className="text-xl md:text-4xl lg:text-8xl font-medium">
          cass.works/when-she-wants
          <br />
          <span className="text-white">cass.works</span>/on-branding
          <br />
          <span className="text-white">cass.works</span>/on-wayfinding
          <br />
          <span className="text-white">cass.works</span>/f*!king-hard
          <br />
          <span className="text-white">cass.works</span>/for-you
        </h1>
      </main>
    </div>
  );
}
