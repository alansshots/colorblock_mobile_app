import React from 'react'
import { useState } from 'react'
import { View, Text, SafeAreaView ,ScrollView, Image, StatusBar, StyleSheet } from 'react-native'
import { images } from '../../constants'


import { supabase } from '../../lib/supabase'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200, // Adjust height as needed
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 0, // Adjust for sharper top-left corner
    borderTopRightRadius: 0, // A
    borderBottomLeftRadius: 300, // Adjust for sharper top-left corner
    borderBottomRightRadius: 25, 
    transform: [{ skewX: '2deg' }]
  },
});

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
    // <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView className="bg-[#161622] h-full" >
      <View className="flex items-center justify-center">
      <View className="w-full">
        <View className="relative">
          <View className="h-56 overflow-hidden">
            <Image source={images.thumbnail}
            style={styles.backgroundImage}
            className="w-full h-full"/>
          </View>
          <View className="absolute bottom-0 left-0">
            <Image source={images.profile} className='w-24 h-24 ml-2 mb-2 border-4 border-white rounded-full'/>
          </View>
        </View>
        <View className="px-4">
          <View className="mb-2">
            <FormField 
            title="Name"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType="default"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Location"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType="default"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Bio"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7 '
            keyboardType="default"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Phone"
            // value={form.email}
            // handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType="number-pad"
            />
          </View>

          <CustomButton
            title="Update Card"
            // handlePress={submit}
            containerStyles="mt-7 mb-5"
            // isLoading={isSubmitting}
          />

        </View>
      </View>
    </View>
    <StatusBar style='light'/>
      </ScrollView>
    // </SafeAreaView>
  )
}

export default Card