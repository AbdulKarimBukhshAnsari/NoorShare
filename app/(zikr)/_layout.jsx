import React from 'react'
import { Stack } from 'expo-router';


const zikrListLayout = () => {
  return (
    <>
    <Stack
    >
      <Stack.Screen
      name = 'ZikrList'
      options={{
        headerShown :false
      }}
      />
    </Stack>
    </>
  )
}

export default zikrListLayout;