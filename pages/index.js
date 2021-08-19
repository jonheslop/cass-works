import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout title="Hello" showHomeLink={false}>
      <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-light">
        cass.works<span class="opacity-50">/with-you</span>
        <br />
        <span className="opacity-0">cass.works</span>
        <span class="opacity-50">/on-branding</span>
        <br />
        <span className="opacity-0">cass.works</span>
        <span class="opacity-50 truncate">/on-environmental</span>
        <br />
        <span className="opacity-0">cass.works</span>
        <span class="opacity-50">/on-wayfinding</span>
      </h1>
    </Layout>
  );
}
