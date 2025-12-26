import { textInputProps, variantType } from "@/constants/types";
import globalStyle from "@/globalstyle/globalStyle";
import React, { FC } from "react";
import Box from "../layout/Box";
import TextComponent from "../text/TextComponent";

interface titleProps extends Pick<textInputProps, "title" | "required"> {
  variant?: "small" | "normal";
  titleVariant?: variantType;
}
const ItemTitle: FC<titleProps> = ({
  title,
  titleVariant = "gray",
  variant = "normal",
  required,
}) => {
  return (
    <Box
      style={[
        globalStyle.flexrow,
        globalStyle.mb0p8,
        globalStyle.alignItemsCenter,
      ]}
    >
      <TextComponent
        variant={titleVariant}
        style={[
          variant === "small" && globalStyle.fontSize11,
          variant === "normal" && globalStyle.fontSize13,
          globalStyle.fontSatoshiRegular,
        ]}
      >
        {title}
      </TextComponent>
      {required && (
        <TextComponent
          variant="error"
          style={[globalStyle.fontSize12, globalStyle.fontSatoshiLight]}
        >
          &nbsp;*
        </TextComponent>
      )}
    </Box>
  );
};

export default ItemTitle;
