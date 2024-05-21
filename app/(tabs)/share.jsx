import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import * as Clipboard from 'expo-clipboard';
import QRCodeStyled from 'react-native-qrcode-styled';
import { Link, Download } from 'lucide-react-native';

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
      <ScrollView className='px-5'>


        <View className='relative bg-[#232533] w-full mt-10 flex flex-col justify-start items-center rounded-xl'>
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
        
        <View className='w-full'>
          <View className='flex flex-row justify-between items-center mt-5 w-full'>
          <TouchableOpacity 
            className='bg-[#232533] w-5/12 p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {
              // Clipboard.setStringAsync(`https://kartaa.netlify.app/card/${card.card_id}`)
              copyToClipboard();
            }}
          >
            <Link 
              className='text-primary'
            />
            <Text className='text-white font-pregular'>Copy Link</Text>
          </TouchableOpacity>


          <TouchableOpacity 
            className='bg-[#232533] w-5/12 p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {
              // handle onPress
            }}
          >
            <Download 
              className='text-primary'
            />
            <Text className='text-white font-pregular'>Download</Text>
          </TouchableOpacity>

          </View>

          <CustomButton
            title='Scan QR Code'
            // handlePress={submit}
            containerStyles="mt-7"
            // isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Share