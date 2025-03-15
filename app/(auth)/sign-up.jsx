import { View, Text, ScrollView, Image , Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import images from "../../constants/images";
import { useState } from "react";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link , Redirect, router } from "expo-router";
import supabase from "../../lib/supabase";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false)

  
  const submit = async () => {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
     await supabase.auth.signOut();
    if(session) router.replace('/sign-in')
  };

  return (
    <>
      <SafeAreaView className="bg-primary-softwhite h-full ">
        <ScrollView className="px-5  ">
          <View className="gap-2 justify-center min-h-[95vh]">
            <View className="flex-row gap-3 items-center">
              <Image
                source={images.Quran}
                className="w-[50px] h-[50px]"
                resizeMode="contain"
              />
              <Text className="text-4xl font-psemibold self-end">
                Noor Share
              </Text>
            </View>
            <View className="w-full justify-center min-h-[50vh] px-4 my-6 gap-3">
              <Text className="text-2xl text-secondary-dark font-semibold mt-10 font-psemibold">
                Sign Up to Noor Share
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
                title="Sign Up"
                isLoading={loading}

              />
              <View className="justify-center pt-5 flex-row gap-2 mt-3">
                <Text className="text-lg text-black font-pregular">
                  Already have an account ?
                </Text>
                <Link
                  href="/sign-in"
                  className="text-lg font-psemibold text-secondary"
                >
                  Sign In
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
