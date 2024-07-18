import React, { useState, useEffect } from 'react';
import { router, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, ScrollView, Alert, Linking} from 'react-native';
import { useTranslation } from 'react-i18next';
import '../translation'
import i18n from "i18next";

const languages = [
  { id: 'en', name: 'English' },
  { id: 'de', name: 'Deutsch' },
  { id: 'bg', name: 'Български' },
];
const Settings = () => {
  const [user, setUser] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    profileImg: ''
  });

  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(languages.find(lang => lang.id === i18n.language) || languages[0]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLanguageSelect = async (language) => {
    setSelectedLanguage(language);
    setIsDropdownVisible(false);
    i18n.changeLanguage(language.id);
    try {
      await AsyncStorage.setItem('selectedLanguage', language.id);
    } catch (error) {
      console.error("Failed to save language preference", error);
    }
  };

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
          <Text className="text-xl text-gray-200 font-psemibold font-semibold mt-5">{t('settings')}</Text>
        </View>

        <ScrollView className="px-4">
          <View className="py-4">
            <Text className="m-2 text-md font-psemibold font-semibold text-gray-100">{t('account')}</Text>

            <View className="rounded-lg shadow bg-[#1E1E2D]">
              <View
                className="flex-row items-center justify-between p-3">
                <Image
                  source={{uri: userInfo.profileImg || 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png'}}
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
          <Text className="m-2 text-md font-psemibold font-semibold text-gray-100">{t('preferences')}</Text>

          <View className="rounded-lg shadow bg-[#1E1E2D]">
            <View className="p-3">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                   setIsDropdownVisible(!isDropdownVisible)
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">{t('language')}</Text>
                <Text className="text-white">{selectedLanguage.name}</Text>
              </TouchableOpacity>
            </View>

            {isDropdownVisible && (
              <View className="mt-1 rounded-lg shadow bg-[#1E1E2D] transition-200 ease-in">
                <FlatList
                  data={languages}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleLanguageSelect(item)}
                      className="p-3 border-b border-gray-700"
                    >
                      <Text className="text-white">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View> 
            )}
          
          {/* 
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
            </View>  */}

          </View>
        </View>

        <View className="py-4">
          <Text className="m-2 text-md font-psemibold font-semibold text-gray-100">{t('resources')}</Text>

          <View className="rounded-lg shadow bg-[#1E1E2D]">

          <View className="p-3 border-b border-gray-700">
            <TouchableOpacity
              onPress={() => {
                // handle onPress
                Linking.openURL('https://ko-fi.com/alansshots')
              }}
              className="flex-row items-center justify-between">
              <Text className="text-lg text-white">{t('byMeCoffee')}</Text>
              
            </TouchableOpacity>
           </View>

            <View className="p-3 border-b border-gray-700">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  Linking.openURL('https://getcolorblock.netlify.app/contact-us')
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">{t('contactUs')}</Text>
    
              </TouchableOpacity>
            </View>

            {/* <View className="p-3 border-b border-gray-700">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">Report Bug</Text>
              
              </TouchableOpacity>
            </View> */}

            <View className="p-3 border-b border-gray-700">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">{t('rateUsOntheAppStore')}</Text>
                
              </TouchableOpacity>
            </View>

            <View className="p-3">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  Linking.openURL('https://policies.google.com/')
                }}
                className="flex-row items-center justify-between">
                <Text className="text-lg text-white">{t('termsAndPricacy')}</Text>
                
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
                <Text className="text-lg font-semibold text-white">{t('logout')}</Text>
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
