import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import images from "../../constants/images";
import { useState } from "react";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {};

  return (
    <>
      <SafeAreaView className="bg-primary-softwhite h-full ">
        <ScrollView className="px-5">
          <View className="gap-2">
            
            <View className="flex-row gap-3 items-center ">
              <Image
                source={images.Quran}
                className="w-[50px] h-[50px]"
                resizeMode="contain"
              />
              <Text className="text-4xl font-psemibold self-end">
                Noor Share
              </Text>
            </View>
            <View className = 'w-full justify-center min-h-[60vh] px-4 my-6 gap-3'>
            <Text className="text-2xl text-secondary-dark font-semibold mt-10 font-psemibold">
              Log in to  Noor Share 
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
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2 mt-3">
            <Text className="text-lg text-black font-pregular">
              Don't have account ?
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
    </>
  );
};

export default SignIn;
