import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index_page"
        options={{
          title: "Reading Page",
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="tilawat_page"
        options={{
          title : "Tilawat Page",
          headerShown : false,
        }}/>
    </Stack>
  );
};

export default _layout;
