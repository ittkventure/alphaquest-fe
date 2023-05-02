import { useEffect, useMemo, useRef } from "react";

export const DOTS = "...";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface usePaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
}

export const usePagination = ({
  totalCount,
  currentPage,
  pageSize,
  siblingCount = 1,
}: usePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const useHorizontalScroll = (
  speed: number = 1
): React.MutableRefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  useEffect(() => {
    const slider = ref.current;
    if (slider) {
      const onMouseDown = (e: MouseEvent) => {
        isDown.current = true;
        slider.classList.add("active");
        startX.current = e.pageX - slider.offsetLeft;
        scrollLeft.current = slider.scrollLeft;
      };
      const onMouseLeave = () => {
        isDown.current = false;
        slider.classList.remove("active");
      };
      const onMouseUp = () => {
        isDown.current = false;
        slider.classList.remove("active");
      };
      const onMouseMove = (e: MouseEvent) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX.current) * speed;
        slider.scrollLeft = scrollLeft.current - walk;
      };
      slider.addEventListener("mousedown", onMouseDown);
      slider.addEventListener("mouseleave", onMouseLeave);
      slider.addEventListener("mouseup", onMouseUp);
      slider.addEventListener("mousemove", onMouseMove);
      return () => {
        slider.removeEventListener("mousedown", onMouseDown);
        slider.removeEventListener("mouseleave", onMouseLeave);
        slider.removeEventListener("mouseup", onMouseUp);
        slider.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [speed]);
  return ref;
};

export const horizontalScroll = (
  speed: number = 1
): React.MutableRefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  useEffect(() => {
    const slider = ref.current;
    if (slider) {
      const onMouseDown = (e: MouseEvent) => {
        isDown.current = true;
        slider.classList.add("active");
        startX.current = e.pageX - slider.offsetLeft;
        scrollLeft.current = slider.scrollLeft;
      };
      const onMouseLeave = () => {
        isDown.current = false;
        slider.classList.remove("active");
      };
      const onMouseUp = () => {
        isDown.current = false;
        slider.classList.remove("active");
      };
      const onMouseMove = (e: MouseEvent) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX.current) * speed;
        slider.scrollLeft = scrollLeft.current - walk;
      };
      slider.addEventListener("mousedown", onMouseDown);
      slider.addEventListener("mouseleave", onMouseLeave);
      slider.addEventListener("mouseup", onMouseUp);
      slider.addEventListener("mousemove", onMouseMove);
      return () => {
        slider.removeEventListener("mousedown", onMouseDown);
        slider.removeEventListener("mouseleave", onMouseLeave);
        slider.removeEventListener("mouseup", onMouseUp);
        slider.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [speed]);
  return ref;
};
export default useHorizontalScroll;
