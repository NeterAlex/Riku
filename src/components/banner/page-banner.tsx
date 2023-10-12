interface props {
  image: string;
}
export default function PageBanner({ image }: props) {
  return (
    <div
      className="h-[15vh] min-h-[10vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
}
