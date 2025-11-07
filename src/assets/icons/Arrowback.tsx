import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface ArrowbackProps extends SvgProps {
  width?: number | string
  height?: number | string
  color?: string
}

export const Arrowback: React.FC<ArrowbackProps> = ({
  width = 24,
  height = 24,
  color = "black",
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 -960 960 960"
      fill={color}
      {...props}
    >
      <Path d="M400-80L0-480l400-400 71 71-329 329 329 329-71 71z" />
    </Svg>
  )
}
