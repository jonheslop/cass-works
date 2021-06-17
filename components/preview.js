export default function Preview({ preview = false }) {
  if (preview) {
    return (
      <div className="border-b bg-yellow-100 border-yellow-100 w-full ">
        <div className="py-2 text-center text-sm">
          This is page is showing unpublished content.{" "}
          <a
            href="/api/exit-preview"
            className="underline hover:text- duration-200 transition-colors"
          >
            Click here
          </a>{" "}
          to exit preview mode.
        </div>
      </div>
    );
  } else {
    return null;
  }
}
