import globalStyle from "@/globalstyle/globalStyle";
import { router } from "expo-router";
import Box from "../layout/Box";
import PressableComponent from "../pressable/PressableComponent";
import TextComponent from "../text/TextComponent";

type variant = {
  variant?: "login" | "register";
  text?: string;
};
const AlreadyHaveComponent = ({ variant = "login", text }: variant) => {
  const isLogin = variant === "login";

  return (
    <Box
      style={[
        globalStyle.w10,
        globalStyle.justifyCenter,
        globalStyle.flexrow,
        globalStyle.alignItemsCenter,
      ]}
    >
      <TextComponent>
        {text
          ? text
          : isLogin
            ? "Already have an account "
            : "Don't have an account "}
      </TextComponent>
      <PressableComponent
        onPress={() => {
          if (isLogin) {
            router.push("/loginscreen");
          } else {
            router.push("/register");
          }
        }}
      >
        <TextComponent
          style={[globalStyle.fontSatoshiBold, globalStyle.fontWeight600]}
          variant="primary"
        >
          {isLogin ? "Sign in" : " Sign Up"}
        </TextComponent>
      </PressableComponent>
    </Box>
  );
};

export default AlreadyHaveComponent;
