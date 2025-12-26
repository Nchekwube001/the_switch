import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
export * as ChangeCase from "change-case";
export class Trigger {
  static readonly ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle;
  static trigger = (
    style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light
  ) => {
    Haptics.impactAsync(style).catch((err) =>
      console.error("Haptic feedback error:", err)
    );
  };
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern =
  /^(080|081|090|070|091|071|090|092|80|81|90|70|91|71|90|92|\+234|234)[0-9]{8}$/;

export function setOpacity(color: string, alpha: number) {
  // Clamp alpha
  const a = Math.max(0, Math.min(1, alpha));

  // Helper: parse a 0–255 int
  const to255 = (v: number) => Math.max(0, Math.min(255, Math.round(v)));

  // 1) HEX formats
  if (color[0] === "#") {
    let hex = color.slice(1);
    // Expand shorthand (#RGB) to full (#RRGGBB)
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    // If #RRGGBBAA is provided, drop its own alpha
    if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }
    const intVal = parseInt(hex, 16);
    const r = (intVal >> 16) & 0xff;
    const g = (intVal >> 8) & 0xff;
    const b = intVal & 0xff;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // 2) rgb(...) / rgba(...) formats
  const rgbMatch = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/
  );
  if (rgbMatch) {
    const r = to255(Number(rgbMatch[1]));
    const g = to255(Number(rgbMatch[2]));
    const b = to255(Number(rgbMatch[3]));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // 3) fallback: return input untouched
  console.warn(`setOpacity: unrecognized color format "${color}"`);
  return color;
}
export const trimString = (str: string) => str.replace(/\s+/g, "");

export const isIos = Platform.OS === "ios";
