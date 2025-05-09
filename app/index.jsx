import {
  Text,
  View,
  ImageBackground,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import images from "../constants/images";
import CustomInput from "../components/main/CustomInput";
import { useGlobalContext } from "../context/GlobalProvider";
import supabase from "../lib/supabase";
import { router } from "expo-router";
import { Alert } from "react-native";
export default function App() {
  const { setIsLoggedIn } = useGlobalContext();
  const [session, setSession] = useState(null);
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const slideAnim = useRef(new Animated.Value(0)).current;
  const minHeight = useRef(new Animated.Value(450)).current; // Start height
  const textSize = useRef(new Animated.Value(60)).current;
  const logoSize = useRef(new Animated.Value(100)).current;

  // Handle Sign In and Sign Up submission
  const submit = async () => {
    if (!isSignInPage) {
      if (!email || !password || !userName) {
        Alert.alert("Error", "Email, Username, and password are required.");
        return;
      }

      if (password.length < 6) {
        Alert.alert("Error", "Password must be at least 6 characters long.");
        return;
      }

      setIsLoading(true);
      try {
        const {
          data: { user, session },
          error,
        } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          Alert.alert("Sign Up Failed", error.message);
        } else {
          // Insert user data into 'users' table
          const { error: insertError } = await supabase.from("users").insert([
            {
              id: user.id, // Auth-generated ID
              name: userName, // User's name
              email: email,
              bio: "", // Optional: bio or other info
            },
          ]);

          if (insertError) {
            Alert.alert("Error", insertError.message);
          } else {
            // Once data is inserted, handle session change
            Alert.alert("Success", "User created and logged in!");

            // Wait for session change before redirecting
            const { data: authListener } = supabase.auth.onAuthStateChange(
              (_event, session) => {
                if (session) {
                  setSession(session);
                  setIsLoggedIn(true); // Update login status
                  console.log("Session ready, redirecting...");
                  router.replace("/HomePage"); // Redirect after user creation
                }
              }
            );

            // Clean up listener after session is handled
            return () => authListener.subscription.unsubscribe();
          }
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong during sign up.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle sign-in logic here
      setIsLoading(true);
      try {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          Alert.alert("Login Failed", error.message);
        } else {
          console.log("Login Successful:", data);
          router.replace("/HomePage"); // Redirect after successful login
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Session check on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session) {
            setSession(session);
            setIsLoggedIn(true);
            console.log("Logged in by checking");
            router.replace("/ZikrCounter"); // Redirect if the user is already logged in
          }
        }
      );

      // Clean up listener when the component is unmounted
      return () => authListener.subscription.unsubscribe();
    };

    checkSession(); // Run the session check once when app loads
  }, []);

  // Animation on mount
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

  // Toggle between Sign In and Sign Up pages
  const toggleSignInPage = (value) => {
    Animated.timing(slideAnim, {
      toValue: value ? 0 : 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
    setIsSignInPage(value);
    console.log(value);
  };

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
        <View
          className={`w-[85vw] items-center bg-white/40 self-center  rounded-lg ${
            isSignInPage ? "mt-14" : "mt-36"
          } `}
        >
          <View className="flex-row justify-between w-full items-stretch relative">
            <TouchableOpacity
              onPress={() => toggleSignInPage(true)}
              className="flex-1"
            >
              <Text
                className={`text-center py-5 text-[20px] font-ossemibold ${
                  isSignInPage ? "bg-pinkLavender/70 text-black" : "text-white"
                } rounded-lg`}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleSignInPage(false)}
              className="flex-1"
            >
              <Text
                className={`text-center py-5 text-[20px] font-ossemibold ${
                  !isSignInPage ? "bg-pinkLavender/70 text-black" : "text-white"
                } rounded-lg`}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <Animated.View
              className="absolute h-full bg-pinkLavender/70 rounded-lg"
              style={{
                width: "50%",
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, "100%"],
                    }),
                  },
                ],
              }}
            />
          </View>

          {/* Conditionally render UserName field */}
          {!isSignInPage && (
            <CustomInput
              placeholder="Username"
              value={userName}
              onChangeText={(e) => setUserName(e)}
              className="font-ossemibold w-[90%] my-4"
            />
          )}

          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
            className="font-ossemibold w-[90%] my-4"
          />
          <CustomInput
            placeholder="Password"
            value={password}
            secureTextEntry={showPassword}
            onChangeText={(e) => setPassword(e)}
            setSecureTextEntry={setShowPassword}
            className="font-ossemibold w-[90%] my-4"
          />
          <TouchableOpacity
            className={`bg-white my-7 px-14 py-4 rounded-3xl ${
              isLoading ? "opacity-70" : ""
            }`}
            activeOpacity={0.7}
            onPress={submit}
            disabled={isLoading}
          >
            <Text className="text-2xl font-osmedium">
              {isLoading
                ? isSignInPage
                  ? "Signing in..."
                  : "Creating..."
                : isSignInPage
                ? "Sign In"
                : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}
