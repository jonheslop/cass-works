import { Image } from "react-datocms";

export default function Double({ images }) {
  return (
    <div className="my-8 grid grid-cols-2 gap-16">
      {images.map((image, index) => (
        <Image
          key={index}
          data={{
            ...image.responsiveImage,
            alt: ``,
          }}
          className="shadow-small"
        />
      ))}
    </div>
  );
}
