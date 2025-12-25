import * as Haptics from "expo-haptics";
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
