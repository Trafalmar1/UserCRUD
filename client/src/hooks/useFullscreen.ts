import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useFullscreen = () => {
  let location = useLocation();
  const [isFullscreen, setIsFullscreen] = useState(true);
  useEffect(() => {
    if (
      location.pathname.includes("login") ||
      location.pathname.includes("logout")
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  }, [location.pathname]);

  return { isFullscreen };
};

export default useFullscreen;
