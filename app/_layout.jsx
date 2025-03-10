import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'
import '../global.css'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen 
        name = 'index'
        options={{
            title : 'Home',
            headerShown : false,
        }}
         />
        <Stack.Screen
        name='(auth)'
        options={{
            title : 'Auth',
        }}
        
        />
    </Stack>
  )
}

export default _layout