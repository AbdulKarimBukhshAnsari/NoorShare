import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title , handlePress , isLoading , textStyle , containerStyle  }) => {
  return (
    <TouchableOpacity 
    className = {`bg-secondary-muted rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
    onPress={handlePress}
    activeOpacity={0.7}
    disabled = {isLoading}    
    >
        <Text className = {`text-white font-psemibold text-2xl ${textStyle} font-bold cursor-pointer`}>
            {title} 
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton