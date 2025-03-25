import { Text, View, ImageBackground, Image, Animated, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import images from "../constants/images";
import CustomInput from "../components/main/CustomInput";
import { TouchableOpacity } from "react-native";

export default function App() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  // Animation values
  const minHeight = useRef(new Animated.Value(450)).current; // Initial height
  const textSize = useRef(new Animated.Value(60)).current;
  const logoSize = useRef(new Animated.Value(100)).current; // Initial size

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(minHeight, {
        toValue: 600,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      Animated.timing(textSize, {
        toValue: 50,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      Animated.timing(logoSize, {
        toValue: 70,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 1500);
    setTimeout(() => {
      setShowExtraContent(true);
    }, 2500);
  }, []);

  return (
    <ImageBackground
      source={images.Main}
      className="flex-1 justify-center bg-cover"
    >
      <Animated.View
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 px-4"
        style={{ minHeight }}
      >
        <Animated.Image
          source={images.Logo}
          style={{
            width: logoSize,
            height: logoSize,
          }}
        />
        <Animated.Text
          style={{ fontSize: textSize }}
          className="font-sorga text-white text-8xl"
        >
          NoorShare
        </Animated.Text>
      </Animated.View>

      {/* Sign-in Section */}

      {showExtraContent && (
        <View className="w-[85vw] items-center bg-white/30 self-center  rounded-lg mt-14">
          <View className="flex-row justify-between w-full items-stretch">
            <Text className="flex-1 text-center h-full flex items-center justify-center py-5 rounded-lg text-[20px] font-ossemibold bg-pinkLavender/70">
              Sign In
            </Text>
            <Text className="flex-1 text-center h-full flex items-center justify-center py-5  rounded-lg text-[20px] font-ossemibold">
              Sign Up
            </Text>
          </View>
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
            className="font-ossemibold w-[90%] my-4  "
          />
          <CustomInput
            placeholder="Password"
            value={password}
            secureTextEntry={showPassword}
            onChangeText={(e) => setPassword(e)}
            setSecureTextEntry={setShowPassword}
            className="font-ossemibold w-[90%] my-4  "
          />
          <TouchableOpacity
            className="bg-white my-7 px-14 py-4 rounded-3xl"
            activeOpacity={0.7}
          >
            <Text className="text-2xl font-osmedium">Sign in</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}
