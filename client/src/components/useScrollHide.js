import { useState, useEffect } from "react";

const useScrollHide = () => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.pageYOffset;
    const handleScroll = () => {
      const currentY = window.pageYOffset;
      setHidden(currentY > lastY && currentY > 50);
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return hidden;
};

export default useScrollHide;
