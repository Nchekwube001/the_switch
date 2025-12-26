import globalStyle from "@/globalstyle/globalStyle";
import React, { FC, PropsWithChildren } from "react";
import { ViewProps } from "react-native";
import Box, { ColorToken } from "../layout/Box";

interface cardType extends ViewProps {
  backgroundColor?: ColorToken;
  borderColor?: ColorToken;
}
const Card: FC<PropsWithChildren<cardType>> = ({
  children,
  style,
  backgroundColor = "surfaceDefault",
  borderColor,
  ...props
}) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      {...props}
      style={[
        globalStyle.borderRadius,
        globalStyle.gap8,
        globalStyle.p1p6,
        style,
      ]}
    >
      {children}
    </Box>
  );
};

export default Card;
