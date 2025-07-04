import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="profilePage"
        options={{
          title: "Profile Page",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SharedImages"
        options={{
          title: "Shared Images Page",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default _layout;