import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import QRCodeStyled from 'react-native-qrcode-styled';
import { Link, Download, ShareIcon } from 'lucide-react-native';

import { images } from '../../constants'
import { supabase } from '../../lib/supabase'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const Share = () => {
  const [user, setUser] = useState('');
  const [card, setCard] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`https://kartaa.netlify.app/card/${card.card_id}`);
    Alert.alert('Link Copied to Clipboard.')
  };

  const shareOnClick = async () => {
    await Sharing.shareAsync(`https://kartaa.netlify.app/card/${card.card_id}`);
  };

  useEffect(() => {
  supabase.auth.getUser().then(({ data: { user } }) => {
      if(user) {
        // setUser(JSON.stringify(user, null, 2));
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
        // setCard(JSON.stringify(data[0], null, 2));
      } else {
        console.log('Could not fetch the offers')
      }
  };

  return (
    <SafeAreaView className='bg-[#161622] h-full'>
      <ScrollView className='px-5' contentContainerStyle= {{ height: '100%' }}>

        <View className='relative bg-[#232533] w-full mt-20 flex flex-col justify-start items-center rounded-xl'>
          <View className="absolut bottom-10 flex justify-center items-center">
            <Image source={{uri : card.profile_img_url}} className='w-20 h-20 border-4 border-white rounded-full'/>
            <Text className='text-white font-psemibold font-semibold mt-2 text-[17px] text-center'>{card.name}</Text>
            <View className='mt-5 p-2 bg-white rounded-xl'>
            <QRCodeStyled
              data={`https://kartaa.netlify.app/card/${card.card_id}`}
              style={{backgroundColor: 'white'}}
              padding={10}
              pieceSize={6}
              outerEyesOptions={{
                borderRadius: 10
              }}
              logo={{
                href: images.logoSmallDark,
                padding: 4,
                scale: 1.1
              }}
              pieceBorderRadius={4}
              isPiecesGlued
              color={'#000'}
              preserveAspectRatio="none"  
            />
          </View>
          </View>
        </View>

        <View>
          <Text className='text-sm font-pregular text-gray-100 text-center mt-4'>
            Your QR Code is private. Use it to share your personal digital card.
          </Text>
        </View>
        
        <View className='flex flex-row justify-center items-center'>
          <View className='flex flex-row justify-between items-center mt-5 w-full'>
          <TouchableOpacity 
            className='bg-[#232533] w-[48%] p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {
              copyToClipboard();
            }}
          >
            <Link 
              className='text-primary'
            />
            <Text className='text-white font-pregular'>Copy Link</Text>
          </TouchableOpacity>


          <TouchableOpacity 
            className='bg-[#232533] w-[48%] p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {
              shareOnClick();
            }}
          >
            <ShareIcon 
              className='text-primary'
            />
            <Text className='text-white font-pregular'>Share</Text>
          </TouchableOpacity>

          </View>

          {/* <CustomButton
            title='Scan QR Code'
            // handlePress={submit}
            containerStyles="mt-6"
            // isLoading={isSubmitting}
          /> */}
        </View>
      </ScrollView>
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Share