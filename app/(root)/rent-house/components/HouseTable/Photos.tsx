import React from "react";
import Image from "next/image";
import Slider from "react-slick";

interface PhotosProps {
  id: string;
  photos: string[];
}
function Photos({ id, photos }: PhotosProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {photos.map((e) => (
        <div key={id} className="mx-auto w-[300px] h-[150px] relative mb-5">
          <Image
            src={`https://jhpvantiskndecjywdon.supabase.co/storage/v1/object/public/images/${e}`}
            alt="image"
            className="bg-contain mx-auto aspect-video object-cover rounded-md"
            fill
          />
        </div>
      ))}
    </Slider>
  );
}

export default Photos;
