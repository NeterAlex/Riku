import Image from "next/image";

interface props {
  image: string;
}
export default function PageBanner({ image }: props) {
  return (
    <div className="relative h-[15vh] max-h-[15vh] min-h-[10vh]">
      <Image
        fill
        src={image}
        objectFit="cover"
        alt="banner image"
        priority={true}
      />
    </div>
  );
}
