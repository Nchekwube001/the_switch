import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { Skeleton } from "moti/skeleton";
import { FC } from "react";
import { useUnistyles } from "react-native-unistyles";

interface skeletonProps extends Omit<MotiSkeletonProps, "Gradient"> {
  colors?: string[];
}
const SkeletonComponent: FC<skeletonProps> = ({ colors, ...rest }) => {
  const { theme } = useUnistyles();
  return (
    <Skeleton
      {...rest}
      colors={colors ?? [theme.colors.neutral100, theme.colors.neutral150]}
    />
  );
};

export default SkeletonComponent;
