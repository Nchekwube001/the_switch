import globalStyle from "@/globalstyle/globalStyle";
import React, { FC } from "react";
import { StyleProp, TextStyle } from "react-native";
import Box, { ColorToken } from "../layout/Box";
import TextComponent from "../text/TextComponent";
interface titleTextProps {
  title: string;
  desc?: string;
  bigText?: boolean;
  isCenter?: boolean;
  titleColor?: ColorToken;
  descColor?: ColorToken;
  titleStyle?: StyleProp<TextStyle>;
  descStyle?: StyleProp<TextStyle>;
}
const TitleText: FC<titleTextProps> = ({
  title,
  isCenter,
  desc,
  bigText,
  descColor,
  descStyle,
  titleColor,
  titleStyle,
}) => {
  return (
    <Box style={[isCenter && globalStyle.center, globalStyle.gap2]}>
      {title && (
        <TextComponent
          variantColor={titleColor ?? "textDefaultHeading"}
          style={[
            globalStyle.fontSize22,
            globalStyle.fontSatoshiBold,
            bigText && globalStyle.fontSize24,
            isCenter && globalStyle.textCenter,
            titleStyle,
          ]}
        >
          {title}
        </TextComponent>
      )}
      {desc && (
        <TextComponent
          variantColor={descColor ?? "textDefaultBody"}
          style={[
            globalStyle.fontSatoshiRegular,
            isCenter && globalStyle.textCenter,
            descStyle,
          ]}
        >
          {desc}
        </TextComponent>
      )}
    </Box>
  );
};

export default TitleText;
