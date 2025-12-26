import Box from "@/components/layout/Box";
import MainLayoutComponent from "@/components/layout/MainLayoutComponent";
import PressableComponent from "@/components/pressable/PressableComponent";
import TextComponent from "@/components/text/TextComponent";
import Card from "@/components/utils/Card";
import SkeletonComponent from "@/components/utils/SkeletonComponent";
import { scale } from "@/constants/scale";
import { ChangeCase } from "@/constants/utils";
import globalStyle from "@/globalstyle/globalStyle";
import { AppQueryKeys } from "@/service/shared/AppQueryKeys";
import { Card as CardType } from "@/service/types";
import { UserService } from "@/service/UserService";
import { useLoggedInStore } from "@/store/loginSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import { FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { UnistylesRuntime, useUnistyles } from "react-native-unistyles";
const _gap = scale(20);
const _cardWidth = UnistylesRuntime.screen.width * 0.8;
const _cardWidthFull = UnistylesRuntime.screen.width - scale(40);
const Home = () => {
  const { userId } = useLoggedInStore();
  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: [AppQueryKeys.user],
    queryFn: () => UserService.getUserById(userId),
  });
  const { data, isLoading } = useQuery({
    queryKey: [AppQueryKeys.cards],
    queryFn: UserService.getCards,
  });
  const {
    theme: { colors },
  } = useUnistyles();
  const quickItems = [
    {
      title: "Send",
      icon: (
        <AntDesign name="arrow-up" size={20} color={colors.textDefaultBody} />
      ),
    },
    {
      title: "Add funds",
      icon: <AntDesign name="plus" size={20} color={colors.textDefaultBody} />,
    },
    {
      title: "Request",
      icon: (
        <AntDesign name="arrow-down" size={20} color={colors.textDefaultBody} />
      ),
    },
    {
      title: "More",
      icon: (
        <AntDesign name="ellipsis" size={20} color={colors.textDefaultBody} />
      ),
    },
  ];
  return (
    <MainLayoutComponent
      hideTouchable
      backgroundColor="pastel200"
      variant="secondary"
      edges={["top"]}
      scrollEnabled={false}
    >
      <Box flex={1} style={[globalStyle.pt2, globalStyle.gap16]}>
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.justifyBetween,
            globalStyle.px2,
          ]}
        >
          {isLoadingProfile ? (
            <SkeletonComponent height={scale(14)} width={scale(80)} />
          ) : (
            <TextComponent>
              Welcome back,&nbsp;
              {ChangeCase.capitalCase(profileData?.firstName ?? "")}
            </TextComponent>
          )}

          <Card style={[globalStyle.br, globalStyle.p0p6]}>
            <FontAwesome
              name="bell-o"
              size={20}
              color={colors.textDefaultBody}
            />
          </Card>
        </Box>
        <Box style={[globalStyle.flexrow, isLoading && globalStyle.ml2]}>
          {isLoading && (
            <SkeletonComponent
              width={_cardWidthFull}
              height={scale(120)}
              radius={scale(12)}
            />
          )}
          {!isLoading && (
            <ScrollView
              horizontal
              pagingEnabled
              scrollEventThrottle={16}
              decelerationRate={"fast"}
              snapToInterval={_cardWidth + _gap / 2}
              style={[]}
              snapToAlignment="start"
              contentContainerStyle={[
                {
                  gap: _gap,
                  paddingHorizontal: _gap,
                },
              ]}
              showsHorizontalScrollIndicator={false}
            >
              {data?.map((card) => (
                <CardItem item={card} key={card.id} />
              ))}
            </ScrollView>
          )}
        </Box>
        <Box style={[globalStyle.px2, globalStyle.gap16]}>
          <Card
            style={[
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
              globalStyle.justifyBetween,
            ]}
          >
            {quickItems.map(({ icon, title }) => (
              <Box
                key={title}
                style={[
                  // globalStyle.w2p5,
                  globalStyle.center,
                  globalStyle.gap4,
                ]}
              >
                <Box
                  style={[
                    globalStyle.br,
                    globalStyle.center,
                    {
                      width: scale(38),
                      aspectRatio: 1,
                    },
                  ]}
                  backgroundColor="pastel100"
                >
                  {icon}
                </Box>
                <TextComponent>{title}</TextComponent>
              </Box>
            ))}
          </Card>
          <Box
            style={[
              globalStyle.flexrow,
              globalStyle.alignItemsCenter,
              globalStyle.justifyBetween,
            ]}
          >
            <TextComponent
              style={[globalStyle.fontSatoshiBold, globalStyle.fontSize15]}
            >
              Transactions
            </TextComponent>

            <Card style={[globalStyle.br, globalStyle.py0p6]}>
              <TextComponent
                style={[globalStyle.fontSatoshiBold, globalStyle.fontSize11]}
              >
                See all
              </TextComponent>
            </Card>
          </Box>
        </Box>
        <FlatList
          contentContainerStyle={[
            globalStyle.px2,
            globalStyle.pb2,
            globalStyle.gap16,
          ]}
          style={[globalStyle.flexOne]}
          data={Array(10).fill("a")}
          renderItem={({ index }) => (
            <Card
              key={index}
              style={[
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.gap8,
                globalStyle.p1p2,
                globalStyle.w10,
              ]}
            >
              <Box
                style={[
                  globalStyle.br,
                  globalStyle.center,
                  {
                    width: scale(30),
                    aspectRatio: 1,
                  },
                ]}
                backgroundColor="pastel100"
              >
                {index % 2 === 0 ? (
                  <AntDesign
                    name="arrow-down"
                    size={16}
                    color={colors.textDefaultBody}
                  />
                ) : (
                  <AntDesign
                    name="arrow-up"
                    size={16}
                    color={colors.textDefaultBody}
                  />
                )}
              </Box>
              <Box flex={1} style={[]}>
                <Box
                  style={[
                    globalStyle.flexrow,
                    globalStyle.alignItemsCenter,
                    globalStyle.justifyBetween,
                  ]}
                >
                  <TextComponent
                    style={[
                      globalStyle.fontSatoshiBold,
                      globalStyle.fontSize12,
                    ]}
                  >
                    {faker.person.fullName()}
                  </TextComponent>
                  <TextComponent
                    style={[
                      globalStyle.fontSatoshiBold,
                      globalStyle.fontSize12,
                    ]}
                  >
                    ₦{faker.commerce.price()}
                  </TextComponent>
                </Box>
                <Box
                  style={[
                    globalStyle.flexrow,
                    globalStyle.alignItemsCenter,
                    globalStyle.justifyBetween,
                  ]}
                >
                  <TextComponent
                    style={[globalStyle.fontSize10]}
                    variantColor="textDefaultPlaceholder"
                  >
                    {index % 2 !== 0 ? "Sent " : "Received "} by you on&nbsp;
                    {dayjs(faker.date.anytime()).format("MMM DD")}
                  </TextComponent>
                  <TextComponent
                    style={[globalStyle.fontSize10]}
                    variantColor={index % 2 === 0 ? "success500" : "error500"}
                  >
                    {index % 2 === 0 ? "Credit " : "Debit "}
                  </TextComponent>
                </Box>
              </Box>
            </Card>
          )}
        />
      </Box>
    </MainLayoutComponent>
  );
};

export const CardItem = ({ item }: { item: CardType }) => {
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <Card
      style={[
        globalStyle.borderRadius,
        globalStyle.overflowHidden,
        globalStyle.center,
        globalStyle.gap2,
        {
          // height: scale(68),
          width: _cardWidth,
        },
      ]}
    >
      <TextComponent variantColor="textDefaultPlaceholder" style={[]}>
        Account Balance
      </TextComponent>
      <TextComponent
        style={[globalStyle.fontSize32, globalStyle.fontSatoshiBold]}
      >
        {item?.balance ?? ""}
      </TextComponent>
      <Box
        style={[
          globalStyle.flexrow,
          globalStyle.alignItemsCenter,
          globalStyle.gap4,
        ]}
      >
        <TextComponent variantColor="textDefaultPlaceholder" style={[]}>
          {item?.uuid?.slice(0, 10) ?? ""}
        </TextComponent>
        <PressableComponent>
          <FontAwesome6
            name="copy"
            size={14}
            color={colors.textDefaultPlaceholder}
          />
        </PressableComponent>
      </Box>
    </Card>
  );
};

export default Home;
