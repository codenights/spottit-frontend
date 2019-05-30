import React, { useState } from "react";
import { animated, useSpring } from "react-spring";

import { Wrapper, Svg, Text } from "./styles";

export interface LoadingAnimationProps {}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = () => {
  const [reverse, setReverse] = useState(false);
  const svgAnimation = useSpring({
    from: { strokeDashoffset: reverse ? 0 : 45 },
    to: { strokeDashoffset: reverse ? 45 : 0 },
    onRest: () => setReverse(!reverse)
  });
  const textAnimation = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(15px)"
    },
    to: {
      opacity: 1,
      transform: "translateY(0)"
    }
  });

  return (
    <Wrapper>
      <Svg className="svg-icon" viewBox="0 0 20 20">
        <animated.path
          style={svgAnimation}
          fill="#fff"
          stroke="rgb(0, 118, 255)"
          strokeWidth={0.15}
          strokeDasharray={45}
          d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"
        />
      </Svg>
      <Text style={textAnimation}>Aquiring your position...</Text>
    </Wrapper>
  );
};
