import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack>
            <Stack.Screen 
            name = 'sign-up'
            options={{
                title : 'signup',
                headerShown :false,
               
            }}
             />
            <Stack.Screen
            name='sign-in'
            options={{
                title : 'sign-in',
            }}
            
            />
        </Stack>
  )
}

export default _layout