import * as React from "react";
import { View } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import Carousel, { TAnimationStyle } from "react-native-reanimated-carousel";

import { SBItem } from "@/components/SBItem";
import { window } from "@/constants/sizes";
import { CaptureWrapper } from "@/store/CaptureProvider";

const PAGE_WIDTH = window.width;

interface ItemProps {
  index: number;
  animationValue: Animated.SharedValue<number>;
}
const CustomItem: React.FC<ItemProps> = ({ index, animationValue }) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#000000dd", "transparent", "#000000dd"]
    );

    return {
      backgroundColor,
    };
  }, [animationValue]);

  return (
    <View style={{ flex: 1 }}>
      <SBItem rounded={false} key={index} index={index} style={{ borderRadius: 0 }} />
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
    </View>
  );
};
function Index() {
  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(value, [-2, 0, 1], [-PAGE_WIDTH, 0, PAGE_WIDTH]);

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);

  return (
    <View
      id="carousel-component"
      dataSet={{ kind: "custom-animations", name: "advanced-parallax" }}
    >
      <CaptureWrapper>
        <Carousel
          loop={true}
          style={{ width: PAGE_WIDTH, height: 240 }}
          width={PAGE_WIDTH}
          data={[...new Array(6).keys()]}
          renderItem={({ index, animationValue }) => {
            return <CustomItem key={index} index={index} animationValue={animationValue} />;
          }}
          customAnimation={animationStyle}
          scrollAnimationDuration={1200}
        />
      </CaptureWrapper>
    </View>
  );
}

export default Index;
