import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/app/Header";
import BgImage from "../../assets/images/BgImage.png";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const ZikrCounter = () => {
  const { item } = useLocalSearchParams();
  const zikrData = item ? JSON.parse(item) : null;

  const [tasbeehCounter, setTasbeehCounter] = useState(0);
  const [totalCount, setTotalCount] = useState(zikrData ? parseInt(zikrData.count) : 10);
  const [remainingCount, setRemainingCount] = useState(zikrData ? parseInt(zikrData.count) : 10);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 0, centiseconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (zikrData) {
      setTotalCount(parseInt(zikrData.count));
      setRemainingCount(parseInt(zikrData.count));
    }
  }, []);

  // Start and stop timer
  const toggleTimer = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
    } else {
      startTimeRef.current =
        Date.now() -
        (time.minutes * 60000 + time.seconds * 1000 + time.centiseconds * 10);

      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const centiseconds = Math.floor((elapsedTime % 1000) / 10);

        // Stop at 59:59:99
        if (minutes >= 59 && seconds >= 59 && centiseconds >= 99) {
          clearInterval(intervalRef.current);
          setIsActive(false);
          return;
        }

        setTime({
          minutes: minutes % 60,
          seconds: seconds % 60,
          centiseconds: centiseconds,
        });
      }, 10);
    }
    setIsActive(!isActive);
  };

  // Reset timer and counter
  const resetAll = () => {
    clearInterval(intervalRef.current);
    startTimeRef.current = null;
    setTime({ minutes: 0, seconds: 0, centiseconds: 0 });
    setTasbeehCounter(0);
    setRemainingCount(totalCount);
    setShowCompletionMessage(false);
    setIsActive(false);

    // Reset animation
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Format timer display
  const formatTime = ({ minutes, seconds, centiseconds }) => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(centiseconds).padStart(2, "0")}`;
  };

  // Handle counter toggle with timer check
  const handleCounterPress = () => {
    if (!isActive || remainingCount === 0) return;

    const newValue = translateX._value === 0 ? 1 : 0;
    const offset = newValue === 1 ? 75 : 0;

    Animated.timing(translateX, {
      toValue: offset,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTasbeehCounter((prev) => {
      const newCount = prev + 1;
      if (newCount === totalCount) {
        clearInterval(intervalRef.current);
        setIsActive(false);
        setShowCompletionMessage(true);
        // Hide completion message after 3 seconds
        setTimeout(() => {
          setShowCompletionMessage(false);
        }, 3000);
      }
      return newCount;
    });
    setRemainingCount((prev) => prev - 1);
  };

  return (
    <SafeAreaView>
        <ImageBackground
          source={BgImage}
          resizeMode="cover"
          className="min-h-full w-full"
        >
          <Header version={4} />
          <View className="py-14 px-7">
            {/* Top Counter Stats */}
            <View className="flex flex-row justify-between mb-6">
              <Text className="text-white text-xl font-pmedium">
                Total : {totalCount}
              </Text>
              <Text className="text-white text-xl">
                Remaining : {remainingCount}
              </Text>
            </View>

            {/* Tasbih Name */}
            <View className="justify-center items-center py-5 mt-4 mb-2">
              <Text
                className="text-white text-[45px] font-psemibold text-center"
                minimumFontScale={0.8}
                allowFontScaling={true}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {zikrData ? zikrData.name : "Subhan Allah"}
              </Text>
            </View>

            {/* Timer */}
            <View className="bg-[#8b4b63]/80 py-2 px-5 rounded-xl self-center mb-6">
              <Text className="text-white font-semibold text-2xl tracking-wide">
                {formatTime(time)}
              </Text>
            </View>

            {/* Tasbih Counter Label */}
            <Text className="text-[#f7d0e4] text-center font-bold text-3xl mt-2 mb-4 font-pextralight ">
              Tasbih Counter
            </Text>

            {/* The tasbeeh Counter */}
            <Text className="text-[#f7d0e4] text-center font-bold text-7xl  my-9 font-pextralight  ">
              {tasbeehCounter}
            </Text>

            {/* Counter Button */}
            <TouchableOpacity
              onPress={handleCounterPress}
              activeOpacity={0.9}
              className={`bg-[#8b4b63]/40 mx-auto w-[120px] h-[45px] rounded-full justify-center px-1 my-7 ${
                !isActive || remainingCount === 0 ? "opacity-50" : "opacity-100"
              }`}
              disabled={!isActive || remainingCount === 0}
            >
              <Animated.View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 100,
                  backgroundColor:
                    translateX._value === 75 ? "#f7d0e4" : "#fff",
                  transform: [{ translateX }],
                }}
              />
            </TouchableOpacity>

            {/* Completion Message */}
            {showCompletionMessage && (
              <View className="bg-[#8b4b63]/80 py-3 px-5 rounded-xl self-center mb-6">
                <Text className="text-white font-semibold text-lg text-center">
                  Alhamdulillah! You have completed your tasbeeh.
                </Text>
              </View>
            )}

            {/* Bottom Buttons */}
            <View className="flex flex-row justify-between items-center px-6 py-2 rounded-full mt-10 bg-[#8b4b63]/80">
              {/* Edit */}
              <TouchableOpacity>
                <View className="items-center">
                  <FontAwesome5 name="edit" size={30} color="white" />
                  <Text className="text-white text-xs mt-1">Edit</Text>
                </View>
              </TouchableOpacity>

              {/* Start / Stop */}
              <TouchableOpacity
                onPress={toggleTimer}
                disabled={tasbeehCounter === totalCount}
                className={
                  tasbeehCounter === totalCount ? "opacity-50" : "opacity-100"
                }
              >
                <View className="items-center">
                  {isActive ? (
                    <MaterialIcons
                      name="pause-circle-outline"
                      size={37}
                      color="white"
                    />
                  ) : (
                    <MaterialIcons
                      name="play-circle-outline"
                      size={37}
                      color="white"
                    />
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

    </SafeAreaView>
  );
};

export default ZikrCounter;
