import ArrowBack from "@/assets/svgs/ArrowBack.svg";
import globalStyle from "@/globalstyle/globalStyle";
import { router } from "expo-router";
import React, { FC, ReactNode } from "react";
import Box from "../layout/Box";
import PressableComponent from "../pressable/PressableComponent";
import TextComponent from "../text/TextComponent";
interface headerProps {
  title?: string;
  desc?: string;
  hideBackIcon?: boolean;
  onBackPress?: () => void;
  addOn?: ReactNode;
}

const HeaderComponent: FC<headerProps> = ({
  onBackPress,
  hideBackIcon,
  title,
}) => {
  return (
    <Box
      style={[
        globalStyle.flexrow,
        globalStyle.alignItemsCenter,
        globalStyle.gap8,
        globalStyle.mt1p2,
      ]}
    >
      {router.canGoBack() && !hideBackIcon && (
        <PressableComponent onPress={onBackPress ? onBackPress : router.back}>
          <ArrowBack />
        </PressableComponent>
      )}

      <TextComponent
        style={[globalStyle.fontSize16, globalStyle.fontSatoshiBold]}
      >
        {title}
      </TextComponent>
    </Box>
  );
};

export default HeaderComponent;
