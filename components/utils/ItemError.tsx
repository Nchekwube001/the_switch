import { textInputProps } from "@/constants/types";
import globalStyle from "@/globalstyle/globalStyle";
import React, { FC } from "react";
import TextComponent from "../text/TextComponent";

interface errorProps extends Pick<textInputProps, "errorText"> {
  hidePadding?: boolean;
}
const ItemError: FC<errorProps> = ({ errorText, hidePadding }) => {
  return (
    <TextComponent
      variantColor="error500"
      style={[
        globalStyle.fontSize12,
        globalStyle.ml1,
        !hidePadding && globalStyle.mt1,
      ]}
    >
      {`${errorText}`}
    </TextComponent>
  );
};

export default ItemError;
