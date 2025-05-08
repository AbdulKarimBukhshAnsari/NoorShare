import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/app/Header";
import BgImage from "../../assets/images/BgImage.png";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

const ZikrCounter = () => {
  const [totalCount, setTotalCount] = useState(100);
  const [remainingCount, setRemainingCount] = useState(36);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;

  // Start and stop timer
  const toggleTimer = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    setIsActive(!isActive);
  };

  // Reset timer and counter
  const resetAll = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
    setRemainingCount(totalCount);
    setIsActive(false);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Handle counter toggle
  const handleCounterPress = () => {
    const newValue = translateX._value === 0 ? 1 : 0;
    const offset = newValue === 1 ? 50 : 0;

    Animated.timing(translateX, {
      toValue: offset,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (newValue === 1 && remainingCount > 0) {
      setRemainingCount((prev) => prev - 1);
    }
  };

  // Format timer display
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <ImageBackground source={BgImage} resizeMode="cover" className="min-h-full w-full">
          <Header version={4} />
          <View className="py-14 px-7">
            {/* Top Counter Stats */}
            <View className="flex flex-row justify-between mb-6">
              <Text className="text-white text-xl font-pmedium">Total : {totalCount}</Text>
              <Text className="text-white text-xl">Remaining : {remainingCount}</Text>
            </View>

            {/* Tasbih Name */}
            <View className="flex-1 justify-center items-center py-5">
              <Text
                className="text-white text-[40px] font-psemibold"
                minimumFontScale={0.8}
                allowFontScaling={true}
              >
                Subhan Allah
              </Text>
            </View>

            {/* Timer */}
            <View className="bg-[#8b4b63]/80 py-2 px-5 rounded-xl self-center mb-4">
              <Text className="text-white font-semibold text-lg tracking-wide">
                {formatTime(seconds)}
              </Text>
            </View>

            {/* Tasbih Counter Label */}
            <Text className="text-white text-center font-bold text-xl mt-2 mb-4">
              Tasbih Counter
            </Text>

            {/* Counter Button */}
            <TouchableOpacity
              onPress={handleCounterPress}
              activeOpacity={0.9}
              className="bg-[#8b4b63]/40 mx-auto w-[90px] h-[45px] rounded-full justify-center px-1"
            >
              <Animated.View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 100,
                  backgroundColor: translateX._value === 50 ? "#8b4b63" : "#fff",
                  transform: [{ translateX }],
                }}
              />
            </TouchableOpacity>

            {/* Bottom Buttons */}
            <View className="flex flex-row justify-between items-center px-6 mt-10">
              {/* Edit */}
              <TouchableOpacity>
                <View className="items-center">
                  <FontAwesome5 name="edit" size={24} color="white" />
                  <Text className="text-white text-xs mt-1">Edit</Text>
                </View>
              </TouchableOpacity>

              {/* Start / Stop */}
              <TouchableOpacity onPress={toggleTimer}>
                <View className="items-center">
                  {isActive ? (
                    <MaterialIcons name="pause-circle-outline" size={28} color="white" />
                  ) : (
                    <MaterialIcons name="play-circle-outline" size={28} color="white" />
                  )}
                  <Text className="text-white text-xs mt-1">
                    {isActive ? "Stop" : "Start"}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Reset */}
              <TouchableOpacity onPress={resetAll}>
                <View className="items-center">
                  <Ionicons name="refresh-circle" size={28} color="white" />
                  <Text className="text-white text-xs mt-1">Reset</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ZikrCounter;
