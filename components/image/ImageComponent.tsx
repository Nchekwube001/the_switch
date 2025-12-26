import globalStyle from "@/globalstyle/globalStyle";
import { Image, ImageProps } from "expo-image";
import React, { FC, useState } from "react";
import Box from "../layout/Box";

interface imageProp {
  isVisible?: boolean;
}
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const ImageComponent: FC<ImageProps & imageProp> = ({
  isVisible,
  placeholder,
  ...rest
}) => {
  const [showLoad, setShowLoad] = useState(true);

  return (
    <Box
      style={[
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
        globalStyle.w10,
        rest.style,
      ]}
    >
      <>
        <Box zIndex={2} style={[globalStyle.w10, globalStyle.h10]}>
          <Image
            onLoad={() => {
              setShowLoad(false);
            }}
            onError={() => {
              setShowLoad(false);
            }}
            placeholder={placeholder ?? blurhash}
            {...rest}
          />
        </Box>
      </>
    </Box>
  );
};

export default ImageComponent;
