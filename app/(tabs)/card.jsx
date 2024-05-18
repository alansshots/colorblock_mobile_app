import React from 'react'
import { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import { images } from '../../constants'

import { supabase } from '../../lib/supabase'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const Card = () => {
  const [avatar, setAvatar] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitted:', { avatar, coverPhoto, name, location, bio, email, phone });
  };


  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView >
      <View className="flex items-center justify-center">
      <View className="w-80">
        <View className="relative">
          <View className="bg-primary h-48 rounded-lg overflow-hidden">
            <Image source={{ uri: coverPhoto || 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png' }} className='w-full h-full'/>
          </View>
          <View className="absolute bottom-0 left-0">
            <Image source={{ uri: avatar }} className='w-16 h-16 ml-2 mb-2 border-4 border-white rounded-full'/>
          </View>
        </View>
        <View className="px-4">
          <View className="mb-2">
            <FormField 
            title="Name"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType="email-address"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Location"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType="email-address"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Bio"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType="email-address"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Phone"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType="email-address"
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} className='bg-primary py-2 px-4 rounded-lg'>
            <Text className='text-white font-bold'>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

      </ScrollView>
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Card