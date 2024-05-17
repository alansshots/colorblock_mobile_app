import { View, Text, SafeAreaView, ScrollView, Image, StatusBar } from 'react-native'
import React from 'react'

const Card = () => {
  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView contentContainerStyle= {{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          
        </View>
        <StatusBar style='light'/>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Card