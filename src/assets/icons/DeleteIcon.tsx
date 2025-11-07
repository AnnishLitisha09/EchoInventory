import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const DeleteIcon = (props: SvgProps) => {
  return (
    <Svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e3e3e3"
      {...props}
    >
      <Path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280zm400-600H280v520h400v-520zM360-280h80v-360h-80v360zm160 0h80v-360h-80v360zM280-720v520-520z" />
    </Svg>
  );
};
