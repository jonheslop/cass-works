import { Image } from "react-datocms";

export default function Double({ images }) {
  return (
    <div className="my-2 md:my-8 grid grid-cols-2 gap-4 md:gap-16">
      {images.map((image, index) => (
        <Image
          key={index}
          data={{
            ...image.responsiveImage,
            alt: ``,
          }}
          className="shadow-small self-start"
        />
      ))}
    </div>
  );
}
