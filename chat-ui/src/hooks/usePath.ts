import { useEffect, useState } from "react";

import route from "../components/Routes";

const usePath = () => {
  const [path, $path] = useState(window.location.pathname);

  useEffect(() => {
    route.subscribe((state) => {
      $path(state.location.pathname);
    });
  }, []);

  return { path };
};

export { usePath };
