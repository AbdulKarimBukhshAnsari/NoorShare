import { Text, View, ImageBackground, Image, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import images from "../constants/images";

export default function App() {
  const [showExtraContent, setShowExtraContent] = useState(false);

  // Animation values (use pixels instead of vh)
  const minHeight = useRef(new Animated.Value(450)).current; // 65vh ka approx px
  const textSize = useRef(new Animated.Value(48)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(minHeight, {
        toValue: 200, // 30vh ka approx px
        duration: 100,
        useNativeDriver: false, 
      }).start();

      Animated.timing(textSize, {
        toValue: 55,
        duration: 1000,
        useNativeDriver: false, 
      }).start();

      setShowExtraContent(true);
    }, 1500);
  }, []);

  return (
    <ImageBackground source={images.Main} className="flex-1 justify-center bg-cover">
      <Animated.View style={{ minHeight: minHeight }} className="items-center gap-7 px-4">
        <Image source={images.Logo} className="w-[100px] h-[100px]" />
        <Animated.Text style={{ fontSize: textSize }} className="font-sorga text-white text-8xl">
          NoorShare
        </Animated.Text>
        {showExtraContent && (
          <Text className="text-white text-lg">
            Welcome to the app! 🌟
          </Text>
        )}
      </Animated.View>
    </ImageBackground>
  );
}
