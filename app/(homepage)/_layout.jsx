import React from 'react'
import { Stack } from 'expo-router';


const newHomeLayout = () => {
  return (
    <>
    <Stack
    >
      <Stack.Screen
      name = 'HomePage'
      options={{
        headerShown :false
      }}
      />
      
    </Stack>
    </>
  )
}

export default newHomeLayout;