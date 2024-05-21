import React, { useState, useEffect } from 'react';
import { router, Redirect } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { View, Text, TouchableOpacity, Switch, Image, SafeAreaView, ScrollView, Alert} from 'react-native';

const Settings = () => {

  const doLogOut = async () => {
   const {error} = await supabase.auth.signOut();
   router.replace('/')
    if(error) {
      Alert.alert("Error Signing Out", error.message);
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-[#161622]">
      <View className="p-0 flex-grow flex-shrink flex-basis">
        <View className="flex-row items-center justify-center w-full px-4">
          <Text className="text-xl text-gray-200 font-psemibold font-semibold mt-5">Settings</Text>
        </View>

        <ScrollView className="px-4">
          <View className="py-4">
            <Text className="m-2 text-md font-psemibold font-semibold text-gray-100">Account</Text>

            <View className="rounded-lg shadow bg-[#1E1E2D]">
              <View
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-between p-3">
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                  }}
                  className="w-14 h-14 rounded-full"
                />

                <View className="flex-grow ml-2 mr-auto ">
                  <Text className="text-lg font-psemibold text-gray-100">John Doe</Text>
                  <Text className="text-primary">john.doe@mail.com</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="py-4">
          <Text className="m-2 text-md font-psemibold font-semibold text-gray-100">Preferences</Text>

          <View className="rounded-lg shadow bg-[#1E1E2D]">
            <View className="p-3 border-b border-gray-700">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">Language</Text>
                <Text className="text-white">English</Text>
              </TouchableOpacity>
            </View>

            <View className="p-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg text-white">Dark / Light Mode</Text>
                <Switch
                  // onValueChange={emailNotifications =>
                  //   setForm({ ...form, emailNotifications })
                  // }
                  // className="transform scale-95"
                  // value={form.emailNotifications}
                />
              </View>
            </View>

          </View>
        </View>

        <View className="py-4">
          <Text className="m-2 text-md font-psemibold font-semibold text-gray-100">Resources</Text>

          <View className="rounded-lg shadow bg-[#1E1E2D]">
            <View className="p-3 border-b border-gray-700">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">Contact Us</Text>
    
              </TouchableOpacity>
            </View>

            <View className="p-3 border-b border-gray-700">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">Report Bug</Text>
              
              </TouchableOpacity>
            </View>

            <View className="p-3 border-b border-gray-700">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">Rate in App Store</Text>
                
              </TouchableOpacity>
            </View>

            <View className="p-3">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">Terms and Privacy</Text>
                
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="py-4">
          <View className="rounded-lg shadow bg-red-900">
            <View className="p-3">
              <TouchableOpacity
                onPress={() => {doLogOut()}}
                className="flex-row items-center justify-center">
                <Text className="text-lg font-semibold text-white">Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Settings
