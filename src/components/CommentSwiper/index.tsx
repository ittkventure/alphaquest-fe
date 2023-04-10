import { User1, User2 } from "@/assets/images";
import useResponsive from "@/hooks/useWindowDimensions";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CommentItem from "../Home/CommentItem";

const CommentSwiper = () => {
  const { isMd, isSm, isXl, isXxl } = useResponsive();
  const _slidesPerViewValue = () => {
    if (isSm) return 1;
    if (isMd) return 2;
    return 2;
  };
  return (
    <Swiper
      spaceBetween={25}
      slidesPerView={_slidesPerViewValue()}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <CommentItem
          avatar={User1}
          content={
            "This has been our secret weapon for identifying early-stage crypto projects since 2021. We’re thrilled to finally release this powerful tool to the public, offering everyone the opportunity to benefit from our in-house expertise and insights."
          }
          name="Shayne"
          des="Head of Ventures at TK Ventures"
        />
      </SwiperSlide>
      <SwiperSlide>
        <CommentItem
          avatar={User2}
          content={
            "AlphaQuest is my go-to resource for discovering promising crypto projects in their infancy. Their weekly newsletter keeps me updated and ready to capitalize on greatest alpha. Highly recommended!"
          }
          name="James R., Degen"
          des="CEO @ FeedHive"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default CommentSwiper;
