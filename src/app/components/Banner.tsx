import Image from "next/image";
import BannerImage from "../../../public/Banner/banner-image.jpg";

export default function Banner() {
  return (
    <div className="w-full h-[95vh]">
      <Image
        src={BannerImage}
        alt="banner-image"
        className="w-full  object-cover h-full"
      />
    </div>
  );
}
