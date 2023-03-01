import { useEffect, useState } from "react";

function useResponsive() {
  const [width, setWindowWidth] = useState(0);
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isXl, setIsXl] = useState(false);
  const [isXxl, setIsXxl] = useState(false);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    setTypeSize();
  }, [width]);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const setTypeSize = () => {
    if (width >= 1280) {
      setIsXxl(true);
      setIsMd(false);
      setIsSm(false);
      setIsXl(false);
    } else if (width < 1280 && width >= 1024) {
      setIsXxl(false);
      setIsMd(false);
      setIsSm(false);
      setIsXl(true);
    } else if (width < 1024 && width >= 540) {
      setIsXxl(false);
      setIsMd(true);
      setIsSm(false);
      setIsXl(false);
    } else if (width < 610) {
      setIsXxl(false);
      setIsMd(false);
      setIsSm(true);
      setIsXl(false);
    }
  };

  return { width, isSm, isMd, isXl, isXxl };
}

export default useResponsive;
