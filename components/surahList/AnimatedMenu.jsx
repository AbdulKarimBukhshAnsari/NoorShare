import React, { useState, useRef, useMemo, useCallback } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import ListGenerator from "./ListGenerator";

const ScrollMenu = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const containerWidth = 250;
  const tabWidth = containerWidth / tabs.length;

  // for better performance and so that we don't have to render it each and every time
  const listComponents = useMemo(
    () => [
      <ListGenerator type={1} />,
      <ListGenerator type={2} />,
      <ListGenerator type={3} />
    ],
    []
  );

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

  return (
    <View className="flex-1 items-center">

      <View className="flex-row justify-evenly absolute top-[265px] w-[250px] py-[10px]">
        {tabs.map((tab, index) => (
          <Pressable 
              key={index} 
              onPress={() => handlePress(index)} 
              className="flex-1 items-center"
          >
            <Text className={`text-[16px] font-osregular ${activeIndex === index ? "text-burgundy" : "text-gray-400"}`}>
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