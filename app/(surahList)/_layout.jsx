import React from 'react'
import { Stack } from 'expo-router';


const surahListLayout = () => {
  return (
    <>
    <Stack
    >
      <Stack.Screen
      name = 'AllSurahs'
      options={{
        headerShown :false
      }}
      />
    </Stack>
    </>
  )
}

export default surahListLayout;