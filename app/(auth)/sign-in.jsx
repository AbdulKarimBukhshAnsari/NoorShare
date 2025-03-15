import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import supabase from "../../lib/supabase";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import images from "../../constants/images";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {

  const {setIsLoggedIn} = useGlobalContext();
  const [session, setSession] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Check session when component mounts
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          setIsLoggedIn((prev)=>!prev);
          router.replace("/index_page"); // Redirect when session updates
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []); // Empty dependency to prevent infinite re-renders

  const submit = async () => {
    setLoading(true);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        Alert.alert("Login Failed", error.message);
      } else {
        console.log("Login Successful:", data);
        router.replace("/index_page"); // Redirect after successful login
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary-softwhite h-full">
      <ScrollView className="px-5">
        <View className="gap-2 justify-center min-h-[95vh]">
          <View className="flex-row gap-3 items-center">
            <Image
              source={images.Quran}
              className="w-[50px] h-[50px]"
              resizeMode="contain"
            />
            <Text className="text-4xl font-psemibold self-end">Noor Share</Text>
          </View>
          <View className="w-full justify-center min-h-[60vh] px-4 my-6 gap-3">
            <Text className="text-2xl text-secondary-dark font-semibold mt-10 font-psemibold">
              Log in to Noor Share
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              placeholder="Enter Your Email"
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              placeholder="Enter Your Password"
              otherStyles="mt-7"
            />

            <CustomButton
              handlePress={submit}
              containerStyle="mt-8 w-full"
              title="Sign in"
              isLoading={loading}
            />

            <View className="justify-center pt-5 flex-row gap-2 mt-3">
              <Text className="text-lg text-black font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-secondary"
              >
                Sign up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
