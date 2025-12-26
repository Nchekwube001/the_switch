import { scale } from "@/constants/scale";
import { StyleSheet } from "react-native-unistyles";

const buttonStyle = StyleSheet.create({
  buttonBr: {
    borderRadius: scale(8),
    height: scale(46),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(8),
    // backgroundColor: Pallete.passCodeGray,
    marginRight: scale(8),
  },
});

export default buttonStyle;
