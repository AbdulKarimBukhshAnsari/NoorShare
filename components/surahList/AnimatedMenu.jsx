import React, { useState, useRef, useMemo, useCallback, useLayoutEffect } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import ListGenerator from "./ListGenerator";

const ScrollMenu = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  // for better performance and so that we don't have to render it each and every time
  const listComponents = useMemo(() => {
    if (tabs.length === 2) {
      return [
        <ListGenerator type={4} />
      ];
    } else {
      return [
        <ListGenerator type={1} />,
        <ListGenerator type={2} />,
        <ListGenerator type={3} />
      ];
    }
  }, [tabs]);
  

  // Calculate tabWidth based on container width
  const tabWidth = containerWidth / tabs.length;

  const handlePress = useCallback((index) => {
    if (index !== activeIndex) {
      Animated.timing(translateX, {
        toValue: tabWidth * index,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();

      setActiveIndex(index);
    }
  }, [activeIndex, tabWidth, translateX]);

  // Get the width of the container on layout
  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View className="flex-1 items-center">
      <View
        className="flex-row justify-evenly mt-5 w-[70%] py-[10px]"
        onLayout={handleLayout}
      >
        {tabs.map((tab, index) => (
          <Pressable 
              key={index} 
              onPress={() => handlePress(index)} 
              className="flex-1 items-center"
          >
            <Text className={`text-4 font-osregular ${activeIndex === index ? "text-burgundy" : "text-gray-400"}`}>
              {tab}
            </Text>
          </Pressable>
        ))}

        {/* underline */}
        <Animated.View
          style={{
            width: tabWidth,
            transform: [{ translateX }],
          }}
          className="absolute bottom-0 left-0 h-[2px] bg-burgundy"
        />
      </View>

      {listComponents[activeIndex]}
    </View>
  );
};

export default ScrollMenu;
