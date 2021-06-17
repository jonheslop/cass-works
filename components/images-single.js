import { Image } from "react-datocms";

export default function Single({ image, position, size }) {
  const positionClasses = {
    left: "mr-auto",
    right: "ml-auto",
    center: "mx-auto",
  };
  const sizeClasses = {
    full: "w-full",
    "one-third": "w-1/3",
    "two-thirds": "w-2/3",
    quarter: "w-1/4",
    half: "w-1/2",
  };

  return (
    <div className="my-8 flex w-full">
      <Image
        data={{
          ...image.responsiveImage,
          alt: ``,
        }}
        className={`${sizeClasses[size]} ${positionClasses[position]}`}
      />
    </div>
  );
}
