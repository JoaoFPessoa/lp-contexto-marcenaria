import Image from "next/image";
import BannerImage from "../../../public/Banner/banner-image.jpg";

export default function Banner() {
  return (
    <div className="w-full h-[95vh] parallax bg-[url('/Banner/banner-image.jpg')] bg-cover"></div>
  );
}
