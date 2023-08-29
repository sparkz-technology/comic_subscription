import { useState } from "react";

export function useShow() {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
    console.log(show);
  };
  return { show, toggleShow };
}
