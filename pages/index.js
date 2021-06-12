import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout title="Hello" showHomeLink={false}>
      <h1 className="text-xl md:text-4xl lg:text-8xl font-medium">
        cass.works/freelance
        <br />
        <span className="opacity-0">cass.works</span>/on-branding
        <br />
        <span className="opacity-0">cass.works</span>/on-environmental
        <br />
        <span className="opacity-0">cass.works</span>/on-wayfinding
        <br />
        <span className="opacity-0">cass.works</span>/with-you
      </h1>
    </Layout>
  );
}
