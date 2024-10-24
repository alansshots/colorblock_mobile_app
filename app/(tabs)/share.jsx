import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, Linking, Platform } from 'react-native'
import { Share as RNShare } from 'react-native'; 
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import QRCodeStyled from 'react-native-qrcode-styled';
import { Link, Download, ShareIcon } from 'lucide-react-native';
import { Camera, CameraView } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native'; 

import { useTranslation } from 'react-i18next';
import '../translation'
import i18n from "i18next";

import { images } from '../../constants'
import { supabase } from '../../lib/supabase'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const Share = () => {
  const [user, setUser] = useState('');
  const [card, setCard] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const {t, i18n} = useTranslation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // useEffect(() => {
  // supabase.auth.getUser().then(({ data: { user } }) => {
  //     if(user) {
  //       // setUser(JSON.stringify(user, null, 2));
  //       setUser(user)
  //       fetchCard(user.id);
  //     } else {
  //       Alert.alert("Error Accessing User");
  //     }
  //   })
    
  //   const getCameraPermissions = async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };

  //   getCameraPermissions();

  //   const fetchCard = async (userId) => {
  //   let { data, error } = await supabase
  //     .from('cards')
  //     .select("*")
  //     .eq('user_id', userId);

  //     if (data && data.length > 0) {
  //       setCard(data[0]);
  //       // setCard(JSON.stringify(data[0], null, 2));
  //     } else {
  //       console.log('Could not fetch the offers')
  //     }

  // };
  // }, []);

  const fetchCard = async (userId) => {
    let { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', userId);

    if (data && data.length > 0) {
      setCard(data[0]);
    } else {
      console.log('Could not fetch the offers');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const getUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          fetchCard(user.id);
        } else {
          Alert.alert('Error Accessing User');
        }
      };

      getUserData();

      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      };

      getCameraPermissions();
    }, [])
  );

  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    // Check if the scanned data is a valid URL
    const isValidUrl = data.startsWith('http://') || data.startsWith('https://');
    
    if (isValidUrl) {
      Alert.alert(
        "QR Code Scanned",
        `Would you like to open this link?\n\n${data}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { 
            text: "Open", 
            onPress: () => {
              Linking.openURL(data).catch(err => Alert.alert("Couldn't open the link", err));
              setShowScanner(false);
            }
          }
        ]
      );
    } else {
      Alert.alert("Invalid QR Code", "The scanned QR code does not contain a valid URL.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`https://getcolorblock.netlify.app/card/${card.card_id}`);
    Alert.alert('Link Copied to Clipboard.')
  };

  const shareOnClick = async () => {
    try {
      const url = `https://getcolorblock.netlify.app/card/${card.card_id}`;
      await RNShare.share({
        message: url,
        url: url, // iOS only
      });
    } catch (error) {
      console.error("Error sharing:", error);
      Alert.alert('Error', 'Could not share the link');
    }
  };

  return (
    <SafeAreaView className='bg-[#161622] h-full'>
      <ScrollView className='px-5' contentContainerStyle= {{ height: '100%' }}>

        <View className='relative bg-[#232533] w-full mt-14 flex flex-col justify-start items-center rounded-xl'>
          <View className="absolut bottom-10 flex justify-center items-center">
            <Image source={{uri : card.profile_img_url || 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png'}} className='w-20 h-20 border-4 border-white rounded-full'/>
            <Text className='text-white font-psemibold font-semibold mt-2 text-[17px] text-center'>{card.name}</Text>
            <View className='mt-5 p-2 bg-white rounded-xl'>
            <QRCodeStyled
              data={`https://getcolorblock.netlify.app/card/${card.card_id}`}
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
          <Text className='text-sm font-pregular text-gray-100 text-center mt-2'>
            {t('qrCodeText')}
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
            <Text className='text-white font-pregular'>{t('copyLink')}</Text>
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
            <Text className='text-white font-pregular'>{t('share')}</Text>
          </TouchableOpacity>

          </View>
        </View>

        <CustomButton
            title={t('scanQrCode')}
            handlePress={() => setShowScanner(true)}
            containerStyles="mt-3"
          />

      </ScrollView>

      {showScanner && (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black'
      }}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={{ flex: 1 }}
        />
        <View style={{
          position: 'absolute',
          top: 50,
          left: 20,
        }}>
          <TouchableOpacity 
            onPress={() => setTimeout(() => setShowScanner(false), 500)}
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text className="text-black font-psemibold">{t('close')}</Text>
          </TouchableOpacity>
        </View>
        {scanned && (
          <View style={{
            position: 'absolute',
            bottom: 40,
            left: 20,
            right: 20,
          }}>
            <TouchableOpacity 
              onPress={() => setScanned(false)}
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
              }}
            >
              <Text className="font-semibold text-xl">{t('scanAgain')}</Text>
            </TouchableOpacity>
          </View>
        )}
         </View>
        )}

      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Share