import React from 'react'
import { Stack } from 'expo-router';


const asmaLayout = () => {
  return (
    <>
    <Stack
    >
      <Stack.Screen
      name = 'Asma'
      options={{
        headerShown :false
      }}
      />
    </Stack>
    </>
  )
}

export default asmaLayout;