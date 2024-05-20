import React from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity} from 'react-native'
import { images } from '../../constants'
import QRCodeStyled from 'react-native-qrcode-styled';

import { Link, Download } from 'lucide-react-native';
import { supabase } from '../../lib/supabase'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
const Share = () => {
  
  return (
    <SafeAreaView className='bg-[#161622] h-full'>
      <ScrollView className='px-5'>
        {/* <View className='w-full justify-center '>
          <Text className="text-3xl text-white text-semibold mt-5 mb-10 font-psemibold">
            Welcome,{' '}
            <Text className='text-primary'>Alen</Text>
          </Text>
        </View> */}

        <View className='relative bg-[#232533] w-full mt-10 flex flex-col justify-start items-center rounded-xl'>
          <View className="absolut bottom-10 flex justify-center items-center">
            <Image source={images.profile} className='w-20 h-20 border-4 border-white rounded-full'/>
            <Text className='text-white font-psemibold font-semibold mt-2 text-[17px] text-center'>Alen Gospodinov</Text>
            <View className='mt-5 p-2 bg-white rounded-xl'>
            <QRCodeStyled
              data={'Simple QR Code'}
              style={{backgroundColor: 'white'}}
              padding={10}
              pieceSize={10}
              outerEyesOptions={{
                borderRadius: 20
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
            
          >
            <Link 
              className='text-primary'
            />
            <Text className='text-white font-pregular'>Copy Link</Text>
          </TouchableOpacity>


          <TouchableOpacity 
            className='bg-[#232533] w-5/12 p-4 rounded-xl flex flex-col justify-center items-center'
            
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