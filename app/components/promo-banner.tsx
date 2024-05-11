import Image, { ImageProps } from "next/image";

export default function PromoBanner(props: ImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      height={0}
      width={0}
      className="w-full h-auto object-contain"
      sizes="100vw"
      quality={100}
      {...props}
    />
  );
}
