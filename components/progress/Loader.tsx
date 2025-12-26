import globalStyle from "@/globalstyle/globalStyle";
import React, { FC } from "react";
import Box from "../layout/Box";
import { Spinner, spinnerStyle } from "./Spinner";

interface loaderProp {
  isTransparent?: boolean;
}
const Loader: FC<loaderProp> = ({ isTransparent }) => {
  return (
    <Box
      backgroundColor={"surfaceDefault"}
      style={[
        globalStyle.center,
        globalStyle.height,
        globalStyle.width,
        globalStyle.absolute,
        {
          zIndex: 30,
        },
        isTransparent && {
          backgroundColor: "transparent",
        },
      ]}
    >
      <Box style={[spinnerStyle.spin]}>
        <Spinner isPrimary />
      </Box>
    </Box>
  );
};

export default Loader;
