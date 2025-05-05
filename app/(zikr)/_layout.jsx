import React from 'react'
import { Stack } from 'expo-router';


const zikrLayout = () => {
  return (
    <>
    <Stack
    >
      <Stack.Screen
      name = 'ZikrCounter'
      options={{
        headerShown :false
      }}
      />
    </Stack>
    </>
  )
}

export default zikrLayout;