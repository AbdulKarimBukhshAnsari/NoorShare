import React from 'react'
import { Stack } from 'expo-router';


const EditorLayout = () => {
  return (
    <>
    <Stack
    >
      <Stack.Screen
      name = 'Editor'
      options={{
        headerShown :false
      }}
      />
    </Stack>
    </>
  )
}

export default EditorLayout;