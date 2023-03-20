import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CommentItem from "../Home/CommentItem";

const CommentSwiper = () => {
  return (
    <Swiper
      spaceBetween={25}
      slidesPerView={2}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <CommentItem />
      </SwiperSlide>
      <SwiperSlide>
        <CommentItem />
      </SwiperSlide>
      <SwiperSlide>
        <CommentItem />
      </SwiperSlide>
      <SwiperSlide>
        <CommentItem />
      </SwiperSlide>
    </Swiper>
  );
};

export default CommentSwiper;
