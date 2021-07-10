import { Image } from "react-datocms";

export default function Single({ image, position, size }) {
  const gridClasses = {
    full: "w-full",
    "one-third": "grid-cols-3",
    "two-thirds": "grid-cols-3",
    quarter: "grid-cols-4",
    half: "grid-cols-2",
  };
  const itemClasses = {
    full: {
      left: "",
      right: "",
      center: "",
    },
    "one-third": {
      left: "",
      right: "col-start-3",
      center: "col-start-2",
    },
    "two-thirds": {
      left: "col-span-2",
      right: "col-start-2 col-span-2",
      center: "",
    },
    quarter: {
      left: "",
      right: "col-start-3",
      center: "col-start-2",
    },
    half: {
      left: "",
      right: "col-start-2",
      center: "",
    },
  };

  return (
    <div className={`my-8 grid gap-16 w-full ${gridClasses[size]}`}>
      <Image
        data={{
          ...image.responsiveImage,
          alt: ``,
        }}
        className={`${itemClasses[size][position]}`}
      />
    </div>
  );
}
