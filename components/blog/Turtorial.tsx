import { blogList } from "@/mocks/blog";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import PostItem from "./PostItem";

const responsive = {
  desktop: {
    breakpoint: { max: 2880, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function Tutorial() {
  return (
    <div className="mt-20">
      <div className="flex gap-3 items-center mb-6">
        <Image
          src="/icons/turtorial.svg"
          alt="tutorial"
          width={32}
          height={32}
        />
        <span className="text-3xl font-semibold">Tutorial</span>
      </div>
      <Carousel
        responsive={responsive}
        transitionDuration={500}
        customTransition="all 1s"
        itemClass="px-3"
      >
        {blogList.map((blog, index) => (
          <PostItem
            title={blog.title}
            content={blog.content}
            time={blog.time}
            key={index}
          />
        ))}
      </Carousel>
    </div>
  );
}
