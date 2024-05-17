import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link, router, Redirect } from 'expo-router'
import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants'
import CustomButton from '../components/CustomButton';

const RootLayout = () => {
  return (
    <SafeAreaView className="bg-default h-full">
      <ScrollView contentContainerStyle= {{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image 
            source={images.logo}
            className="w-[225px] h-[85px]"
            resizeMode="contain"
          />

          <Image
           source={images.cards}
           className="max-w-[380px] w-full h-[300px]"
           resizeMode="contain"
          />

          <View className='relative mt-5'>
            <Text className="text-3xl text-white font-bold text-center">
                Create and Share digital cards{' '}
                <Text className="text-primary">effortlessly</Text>
            </Text>

            <Image 
              source={images.path}
              className='w-[160px] h-[15px] absolute -bottom-2 right-10'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 text-center mt-7'>
          Go Digital, Share Everywhere, Make Every Connection Count with Ease.
          </Text>

          <CustomButton 
            title="Get Started"
            handlePress={() => router.push('/sign-in')}
            containerStyles='w-full mt-7'
          />

        </View>
        <StatusBar style='light'/>
      </ScrollView>

    </SafeAreaView>
  )
}

export default RootLayout
