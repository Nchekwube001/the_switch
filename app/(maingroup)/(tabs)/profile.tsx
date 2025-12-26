import ChevronRightGray from "@/assets/svgs/ChevronRightGray.svg";
import Logout from "@/assets/svgs/Logout.svg";
import ProfileIcon from "@/assets/svgs/Profile.svg";
import HeaderComponent from "@/components/header/HeaderComponent";
import Box from "@/components/layout/Box";
import MainLayoutComponent from "@/components/layout/MainLayoutComponent";
import PressableComponent from "@/components/pressable/PressableComponent";
import TextComponent from "@/components/text/TextComponent";
import Card from "@/components/utils/Card";
import globalStyle from "@/globalstyle/globalStyle";
import { useLogoutHook } from "@/hooks";
import React from "react";

const Profile = () => {
  const { logUserOut } = useLogoutHook();
  const profileList: {
    heading: string;
    items: {
      icon: React.JSX.Element;
      title: string;
      variant?: "icon" | "switch";
      value?: boolean;
      onPress: () => void;
    }[];
  }[] = [
    {
      heading: "Personal",
      items: [
        {
          icon: <ProfileIcon />,
          title: "Profile Details",
          variant: "icon",
          onPress: () => {},
        },
      ],
    },
    {
      heading: "Preferences",
      items: [
        {
          icon: <Logout />,
          title: "Logout",
          onPress: () => {
            logUserOut();
          },
        },
      ],
    },
  ];
  return (
    <MainLayoutComponent
      hideTouchable
      backgroundColor="pastel200"
      variant="secondary"
      edges={["top"]}
    >
      <Box flex={1} style={[globalStyle.gap16, globalStyle.pb1p6]}>
        <Box style={[globalStyle.px2, globalStyle.gap16]}>
          <HeaderComponent hideBackIcon title="Profile" />
          <Box style={[]}>
            {profileList.map(({ items, heading }) => (
              <Box key={heading} style={[globalStyle.pt0p8]}>
                <TextComponent
                  style={[
                    globalStyle.fontSize15,
                    globalStyle.fontSatoshiMedium,
                  ]}
                >
                  {heading}
                </TextComponent>

                <Box style={[globalStyle.pt1p2, globalStyle.gap16]}>
                  {items.map(({ icon, onPress, title, value, variant }) => (
                    <PressableComponent key={title} onPress={onPress}>
                      <Card>
                        <Box
                          style={[
                            globalStyle.flexrow,
                            globalStyle.alignItemsCenter,
                            globalStyle.gap12,
                          ]}
                        >
                          {icon}
                          <Box flex={1}>
                            <TextComponent
                              variantColor={
                                variant ? "textDefaultBody" : "error500"
                              }
                              style={[globalStyle.fontSatoshiMedium]}
                            >
                              {title}
                            </TextComponent>
                          </Box>

                          {variant === "icon" && <ChevronRightGray />}
                        </Box>
                      </Card>
                    </PressableComponent>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </MainLayoutComponent>
  );
};

export default Profile;
