import React, { useState, useEffect } from 'react';
import { router, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';
import { View, Text, TouchableOpacity, Switch, Image, SafeAreaView, ScrollView, Alert, Linking} from 'react-native';
import '../../localization/i18n/i18n.config'
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const [user, setUser] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    profileImg: ''
  });
  const {t} = useTranslation();


  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
        if(user) {
          setUser(user);
          fetchUserInfoFromCard(user.id);
        } else {
          Alert.alert("Error Accessing User");
        }
      })

      console.log(userInfo)
  }, [])

  const fetchUserInfoFromCard = async (userId) => {
    let { data, error } = await supabase
      .from('cards')
      .select("*")
      .eq('user_id', userId);

      setUserInfo({
        name: data[0].name || '',
        email: data[0].email || '',
        profileImg: data[0].profile_img_url || '',
      });
  };

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
          <Text className="text-xl text-gray-200 font-psemibold font-semibold mt-5">{t('Settings')}</Text>
        </View>

        <ScrollView className="px-4">
          <View className="py-4">
            <Text className="m-2 text-md font-psemibold font-semibold text-gray-100">Account</Text>

            <View className="rounded-lg shadow bg-[#1E1E2D]">
              <View
                className="flex-row items-center justify-between p-3">
                <Image
                  source={{uri: userInfo.profileImg}}
                  className="w-14 h-14 rounded-full border-2 border-white"
                />

                <View className="flex-grow ml-2 mr-auto ">
                  <Text className="text-lg font-psemibold text-gray-100">{userInfo.name}</Text>
                  <Text className="text-primary font-psemibold ">{user.email}</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="py-4">
          <Text className="m-2 text-md font-psemibold font-semibold text-gray-100">Preferences</Text>

          <View className="rounded-lg shadow bg-[#1E1E2D]">
            <View className="p-3">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">Language</Text>
                <Text className="text-white">English</Text>
              </TouchableOpacity>
            </View>

            <View className="p-3 border-t border-gray-700">
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
                  Linking.openURL('https://policies.google.com/')
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
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Settings
