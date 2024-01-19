import React, { FC } from "react";
import SkeletonRow from "./SkeletonRow";

interface SkeletonLoadingTypes {
  numberOfRow?: number;
}

const SkeletonLoading: FC<SkeletonLoadingTypes> = ({ numberOfRow }) => {
  return (
    <div>
      {Array.from(Array(numberOfRow ?? 10).keys()).map((value) => (
        <SkeletonRow key={value} />
      ))}
    </div>
  );
};

export default SkeletonLoading;
