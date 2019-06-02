import { useState } from "react";
import { useSpring } from "react-spring";

export const useAnimations = () => {
  const [reverse, setReverse] = useState(false);
  const svg = useSpring({
    from: { strokeDashoffset: reverse ? 0 : 45 },
    to: { strokeDashoffset: reverse ? 45 : 0 },
    onRest: () => setReverse(!reverse)
  });
  const text = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(15px)"
    },
    to: {
      opacity: 1,
      transform: "translateY(0)"
    }
  });

  return { svg, text };
};
