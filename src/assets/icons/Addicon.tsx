import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const AddIcon = (props: SvgProps) => (
<Svg
      height="16px"
      viewBox="0 -960 960 960"
      width="16px"
      fill="white"
      {...props}
    >
      <Path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240z" />
    </Svg>
);
