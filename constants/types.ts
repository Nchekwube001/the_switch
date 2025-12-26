import { textProps } from "@/components/text/TextComponent";
import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export type variantType = textProps["variant"];

export interface textInputProps extends TextInputProps {
  variant?:
    | "text"
    | "password"
    | "search"
    | "user"
    | "password"
    | "referral"
    | "email";
  errorText?: string;
  title?: string;
  titleVariant?: variantType;
  placeholder: string;
  multiLine?: boolean;
  editable?: boolean;
  loading?: boolean;
  required?: boolean;
  showIcon?: boolean;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  setVal?: React.Dispatch<React.SetStateAction<string>>;
}
