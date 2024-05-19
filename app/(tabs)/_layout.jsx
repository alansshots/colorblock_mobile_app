import React from 'react'
import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import 'react-native-reanimated';

import {icons} from '../../constants'
import {images} from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className= {`${focused ? 'font-psemibold': 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View> 
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#14b8a6',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopColor: 1,
          borderTopColor: '#232533',
          height: 87,
        }

      }}
      >
          <Tabs.Screen name="share"
          options={{
            title: 'Share',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.qr}
                color={color}
                name="Share"
                focused={focused}
              />
            )
          }}
          />
            <Tabs.Screen name="card"
          options={{
            title: 'My Card',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={images.logoSmall}
                color={color}
                name="My Card"
                focused={focused}
              />
            )
          }}
          />
            <Tabs.Screen name="settings"
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.cog}
                color={color}
                name="Settings"
                focused={focused}
              />
            )
          }}
          />
          
      </Tabs>
    </>
  )
}

export default TabsLayout