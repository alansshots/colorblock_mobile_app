import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, SafeAreaView ,ScrollView, Image, StatusBar, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { PlusSquare, X } from 'lucide-react-native'

import { icons } from '../../constants'
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
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('');
  const [card, setCard] = useState('');

  const [form, setForm] = useState({
    name: '',
    location: '',
    bio: '',
    email: '',
    phone: '',
    profileImg: '',
    coverPhoto: '',
    links: []
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
        if(user) {
          setUser(user)
          fetchCard(user.id);
        } else {
          Alert.alert("Error Accessing User");
        }
      })
    }, [])
  
    const fetchCard = async (userId) => {
      let { data, error } = await supabase
        .from('cards')
        .select("*")
        .eq('user_id', userId);
  
        if (data && data.length > 0) {
          setCard(data[0]);
          setForm({
            name: data[0].name || '',
            location: data[0].location || '',
            bio: data[0].bio || '',
            email: data[0].email || '',
            phone: data[0].phone || '',
            profileImg: data[0].profile_img_url || '',
            coverPhoto: data[0].bg_img_url || '',
            // links: data[0].selected_links || [],
            links: JSON.parse(data[0].selected_links) || [],
          });
        } else {
          console.log('Could not fetch the offers')
        }
    };

    async function handleCardSubmit() {
      setIsLoading(true);
       const date = new Date();
       const { data, error } = await supabase
        .from('cards')
        .update([
          {
            user_id: user.id,
            name: form.name,
            created_at: date,
            phone: form.phone,
            location: form.location,
            bio: form.bio,
            profile_img_url: form.profileImg,
            bg_img_url: form.coverPhoto,
          },
        ])
        .eq('user_id', user.id);


        // if (error) {
        //   Alert.alert("Error updating card", error.message);
        // } else {
        //   console.log('Card updated successfully:', data);
        //   setCard(data[0]);
        // }

        Alert.alert('Card Updated Successfully.')

        setIsLoading(false);
     }

  return (
    // <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView className="bg-[#161622] h-full" >
      <View className="flex items-center justify-center">
      <View className="w-full">
        <View className="relative">
          <View className="h-56 overflow-hidden">
            <Image source={{uri: form.coverPhoto}}
            style={styles.backgroundImage}
            className="w-full h-full"/>
          </View>
          <View className="absolute bottom-0 left-0">
            <Image source={{uri: form.profileImg}} className='w-24 h-24 ml-2 mb-2 border-4 border-white rounded-full'/>
          </View>
        </View>
        <View className="px-4">
          
          <Text className="text-white">{JSON.stringify(form.phone)}</Text>

          <View className="mb-2">
            <FormField 
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e})}
            otherStyles='mt-7'
            keyboardType="default"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Location"
            value={form.location}
            handleChangeText={(e) => setForm({ ...form, location: e})}
            otherStyles='mt-7'
            keyboardType="default"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Bio"
            value={form.bio}
            handleChangeText={(e) => setForm({ ...form, bio: e})}
            otherStyles='mt-7 '
            keyboardType="default"
            />
          </View>
          <View className="mb-2">
            <FormField 
            title="Phone"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e})}
            otherStyles='mt-7'
            keyboardType="numeric"
            />
          </View>

          <Text className="text-gray-100 mt-7 text-[15px] font-psemibold mb-2">Links</Text>

          <View className="w-full flex flex-row flex-wrap justify-start items-center">
            <TouchableOpacity 
            className='bg-[#232533] w-[31%] mr-2 mb-2 h-24 p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {
              
            }}
          >
            <PlusSquare 
              className="text-primary p-6 mb-1"
            />
            <Text className='text-white font-pregular'>Add Link</Text>
          </TouchableOpacity>

          {form.links.map((link, index) => (
          <TouchableOpacity 
            key={index}
            className='bg-[#232533] relative w-[31%] mr-2 mb-2 h-24 p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {
              
            }}
          >
            <Image source={icons[link.name]} className="w-14 h-14 rounded-2xl mb-1"  resizeMode="contain" />
            <Text className="text-white font-pregular">{link.name}</Text>
            <TouchableOpacity 
              className="absolute bg-white shadow-xl top-0 right-0 mt-1 mr-1 p-0.5 text-red-600 rounded-full"
              onPress={() => {
              
              }}
            >
              <X className="text-red-400" />
            </TouchableOpacity>
          </TouchableOpacity>
          ))}
          </View>

          <CustomButton
            title="Update Card"
            handlePress={handleCardSubmit}
            containerStyles="mt-7 mb-5"
            isLoading={isLoading}
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