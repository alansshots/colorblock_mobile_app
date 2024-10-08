import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, TextInput ,ScrollView, Image, StatusBar, StyleSheet, Alert, TouchableOpacity } from 'react-native'
// https://expo.dev/artifacts/eas/pDDhr6bFi3amyeLqogucmV.aab
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import RBSheet from 'react-native-raw-bottom-sheet';
import { ArrowLeft, ImageDown, ImageUp, PlusSquare, X } from 'lucide-react-native'
import { icons } from '../../constants'
import { supabase } from '../../lib/supabase'

import { useTranslation } from 'react-i18next';
import '../translation'
import i18n from "i18next";

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import LinksPicker from '../../components/LinksPicker'

bgPlaceHolderImg = '../../assets/images/thumbnail.png'

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
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false)

  const {t, i18n} = useTranslation();
  
  const bottomSheetRef = useRef(null);
  const [linkFormField, setLinkFormField] = useState(false);
  const [recommendedLinks, setRecommendedLinks] = useState([
    'Facebook',
    'Instagram',
    'WhatsApp',
    'X',
    'TikTok',
    'Website',
    'Telegram',
    'Pinterest',
    'LinkedIn'
    // 'Email'

  ]);
  const [socialLinks, setSocialLinks] = useState([
    'Line',
    'LinkedIn',
    'Pinterest',
    'Reddit',
    'Signal',
    'Snapchat',
    'Facebook',
    'Instagram',
    'Telegram',
    'TikTok',
    'Tumblr',
    'VK',
    'WeChat',
    'X',
    'Behance',
    'DeviantArt',
    'Discord',
    'Dribbble',
    'WhatsApp',
    'YouTube',
    'GitHub'
  ]);
  const [businessLinks, setBusinessLinks] = useState([
    'Behance',
    'LinkedIn',
    'Line',
    'Signal',
    'WhatsApp',
    'GitHub',
    'Telegram',
    'WeChat',
    'X',
    'Website',
  ]);
  const [linkHolder, setLinkHolder] = useState('');
  const [currentLink, setCurrentLink] = useState({ name: '', url: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('');
  const [card, setCard] = useState('');
  const [errors, setErrors] = useState({});

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
      if (!validateForm()) {
        return;
      }

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
            selected_links: form.links,
            profile_img_url: form.profileImg,
            bg_img_url: form.coverPhoto,
          },
        ])
        .eq('user_id', user.id);

        Alert.alert('Card Updated Successfully.')

        setIsLoading(false);
     }

     const openBottomSheet = () => {
      bottomSheetRef.current.open();
     };
   
     const closeBottomSheet = () => {
      bottomSheetRef.current.close();
     };

     const openLinkForm = (linkType) => {
      const existingLink = form.links.find(link => link.name === linkType);
      if (existingLink) {
        setCurrentLink(existingLink);
      } else {
        setCurrentLink({ name: linkType, url: '' }); // If the link doesn't exist, initialize with empty URL
      }

      setLinkHolder(linkType)
      setLinkFormField(true)
     }

     const getLinkValue = (platform) => {
      const link = form.links.find(link => link && link.name === platform);
      return link ? link.url : '';
    };

    const addLink = async (platform, url) => {
      const existingLinkIndex = form.links.findIndex(link => link.name === currentLink.name);
      
      if (existingLinkIndex !== -1) {
        form.links[existingLinkIndex] = { ...currentLink };
      } else {
        // Otherwise, add it to the links array
        form.links.push({ ...currentLink });
      }
      // Update the links in the database
      const { data, error } = await supabase
        .from('cards')
        .update([{ selected_links: form.links }])
        .eq('user_id', user.id);
      if (error) {
        console.error('Error updating links:', error.message);
        return;
      }
      // Reset the current link state and close the link form
      setCurrentLink({ name: '', url: '' });
      setLinkFormField(false);
    } 

    const removeLink = async (linkName) => {
      // Filter out the link to be removed
      const updatedLinks = form.links.filter(link => link.name !== linkName);
    
      // Update the links in the database
      const { data, error } = await supabase
        .from('cards')
        .update([{ selected_links: updatedLinks }])
        .eq('user_id', user.id);
    
      if (error) {
        console.error('Error updating links:', error.message);
        return;
      }
    
      // Update the local state with the updated links
      setForm({ ...form, links: updatedLinks });
    };

    const getPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied!');
      }
    };

    const openImagePicker = async (imageType) => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        exif: false
      });
    
      if (!result.canceled) {
        const selectedImageURI = result.assets[0].uri;
        const imageMimeType = result.assets[0].mimeType;
        const selectedFileName = result.assets[0].fileName;
    
        // Optimize the image
        const manipResult = await ImageManipulator.manipulateAsync(
          selectedImageURI,
          [{ resize: { width: 800 } }], // Resize the image to a width of 800px (adjust as needed)
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress the image and save it as JPEG
        );
        const optimizedImageURI = manipResult.uri;
        const arraybuffer = await fetch(optimizedImageURI).then((res) => res.arrayBuffer());
        const fileExt = optimizedImageURI.split('.').pop().toLowerCase() || 'jpeg';
        const path = `${Date.now()}.${fileExt}`;
    
        try {
          const bucketName = imageType === 'profile' ? 'profile_images' : 'cover_images';
          const subfolder = user.id; // Subfolder named after the user ID
    
          // Fetch previous image URL
          const fieldToUpdate = imageType === 'profile' ? 'profile_img_url' : 'bg_img_url';
          const { data: userCardData, error: userCardError } = await supabase
            .from('cards')
            .select(fieldToUpdate)
            .eq('user_id', user.id)
            .single();
    
          if (userCardError) {
            throw new Error(`Error fetching user record: ${userCardError.message}`);
          }
          
          const previousImageUrl = userCardData[fieldToUpdate]
          
          if (previousImageUrl) {
            // Delete the previous image
            const { error: deleteError } = await supabase.storage
              .from(bucketName)
              .remove(previousImageUrl);
            if (deleteError) {
              throw new Error(`Error deleting previous image: ${deleteError.message}`);
            }
          }

          // Upload the new image
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(`${subfolder}/${selectedFileName}`, arraybuffer, {
              contentType: imageMimeType ?? 'image/jpeg',
            });
    
          if (uploadError) {
            throw new Error(`Error uploading image: ${uploadError.message}`);
          }
    
          // Get the URL of the uploaded image
          const { data: publicUrlData } = await supabase.storage
            .from(bucketName)
            .getPublicUrl(`${subfolder}/${selectedFileName}`);
    
          if (!publicUrlData) {
            throw new Error('Image URL is null or undefined');
          }
    
          // Update the user's record in the database with the new image URL
          const { data: updateData, error: updateError } = await supabase
            .from('cards')
            .update({ [fieldToUpdate]: publicUrlData.publicUrl })
            .eq('user_id', user.id);
    
          if (updateError) {
            throw new Error(`Error updating user record: ${updateError.message}`);
          }
    
          // Update the local state (form) with the new image URL
          setForm({ ...form, [imageType === 'profile' ? 'profileImg' : 'coverPhoto']: publicUrlData.publicUrl });
        } catch (error) {
          console.error(error.message);
          // Handle error
        }
      }
    };

    const validateForm = () => {
      let valid = true;
      let newErrors = {};
  
      if (!form.name) {
        newErrors.name = t('Name is required.');
        valid = false;
      }
  
      if (!form.location) {
        newErrors.location = t('Location is required.');
        valid = false;
      }
  
      if (!form.bio) {
        newErrors.bio = t('Bio is required.');
        valid = false;
      }
  
      if (!form.phone) {
        newErrors.phone = t('Phone is required.');
        valid = false;
      }
  
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 4000)
      return valid;
    };
    

  return (
    // <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView className="bg-[#161622] h-full" >
      <View className="flex items-center justify-center">
      <View className="w-full">
        <View className="relative">
          <View className="h-56 overflow-hidden">
            <Image source={{uri: form.coverPhoto || bgPlaceHolderImg }}
            style={styles.backgroundImage }
            className="w-full h-full"/>

            <TouchableOpacity 
                onPress={() => {
                  openImagePicker('cover');
                  getPermission();
                }}
                className="absolute bg-white shadow-xl bottom-0 right-0 mt-1 mr-1 p-1 text-red-600 rounded-full"
              >
              <ImageUp className="text-black" />
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-0 left-0">
            <TouchableOpacity>
              <Image source={{ uri: form.profileImg || 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_1280.png' }} className='w-24 h-24 ml-2 mb-2 border-4 border-white rounded-full' />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                openImagePicker('profile');
                getPermission();
              }}
              className="absolute bg-white shadow-xl bottom-0 right-0 mt-1 mr-1 p-1 text-red-600 rounded-full"
            >
              <ImageUp className="text-black" />
            </TouchableOpacity>

          </View>
        </View>
        <View className="px-4">

          <View className="mb-2">
            <FormField 
            title={t('name')}
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e})}
            otherStyles='mt-7'
            keyboardType="default"
            />
          </View>
          {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

          <View className="mb-2">
            <FormField 
            title={t('location')}
            value={form.location}
            handleChangeText={(e) => setForm({ ...form, location: e})}
            otherStyles='mt-7'
            keyboardType="default"
            />
          </View>
          {errors.location && <Text style={{ color: 'red' }}>{errors.location}</Text>}

          <View className="mb-2">
            <FormField 
            title={t('bio')}
            value={form.bio}
            handleChangeText={(e) => setForm({ ...form, bio: e})}
            otherStyles='mt-7 '
            keyboardType="default"
            />
          </View>
          {errors.bio && <Text style={{ color: 'red' }}>{errors.bio}</Text>}

          <View className="mb-2">
            <FormField
              title={t('phone')}
              value={form.phone}
              handleChangeText={(e) => setForm({ ...form, phone: e })}
              otherStyles='mt-7'
              keyboardType="numeric"
            />
          </View>
        {errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}

          <Text className="text-gray-100 mt-7 text-[15px] font-psemibold mb-2">{t('links')}</Text>

          <View className="w-full flex flex-row flex-wrap justify-start items-center">
            <TouchableOpacity 
            className='bg-[#232533] w-[31%] mr-2 mb-2 h-24 p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {
              openBottomSheet()
            }}
          >
            <PlusSquare 
              className="text-primary p-6 mb-1"
            />
            <Text className='text-white font-pregular'>{t('addLink')}</Text>
          </TouchableOpacity>

          {form.links.map((link, index) => (
          <TouchableOpacity 
            key={index}
            className='bg-[#232533] relative w-[31%] mr-2 mb-2 h-24 p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {}}
          >
            <Image source={icons[link.name]} className="w-14 h-14 rounded-2xl mb-1"  resizeMode="contain" />
            <Text className="text-white font-pregular">{link.name}</Text>
            <TouchableOpacity 
              className="absolute bg-white shadow-xl top-0 right-0 mt-1 mr-1 p-0.5 text-red-600 rounded-full"
              onPress={() => {
                removeLink(link.name);
              }}
            >
              <X className="text-red-400" />
            </TouchableOpacity>
          </TouchableOpacity>
          ))}
          </View>

          <CustomButton
            title={t('updateCard')}
            handlePress={handleCardSubmit}
            containerStyles="mt-7 mb-5"
            isLoading={isLoading}
          />
        </View>
      </View>

      <RBSheet 
        ref={bottomSheetRef}
        height={550}
        draggable={true}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customStyles={{
          wrapper: {
            backgroundColor: ''
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#232533'
          },
          draggableIcon:{
            width: "40%",
            padding: '10px'

          }
        }}
      >
        <ScrollView>
        <View style={{ backgroundColor: '232533', padding: 16 }}>

        {linkFormField && (
        <View className=" transition-200 duration-200">
          <TouchableOpacity 
            className='bg-[#232533] mb-10 rounded-xl'
            onPress={() => {setLinkFormField(false)}}
          >
            <ArrowLeft className="text-white p-5"/>
          </TouchableOpacity>

          <View className="flex flex-row justify-start items-center">
            <TouchableOpacity 
              className='bg-[#232533] mb-2 h-24 rounded-xl flex flex-col justify-center items-center'
              onPress={() => {}}
            >
              <Image source={icons[linkHolder]} className="w-20 h-20 rounded-2xl"  resizeMode="contain" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-psemibold ml-10 w-1/2">{linkHolder}</Text>
          </View>
          
          <View>
            <FormField 
              title={t('link')}
              value={currentLink.url}
              placeholder={`${linkHolder} Account Link`}
              handleChangeText={(e) => setCurrentLink({ ...currentLink, url: e })}
              otherStyles='mt-3'
            />

            <CustomButton
              title={t('addLink')}
              handlePress={addLink}
              containerStyles="mt-7"
            />
          </View>
        </View>
        )}
        {linkFormField == false && (
        <View>
          <Text className="text-gray-100 text-md font-psemibold">{t('recomended')}</Text>
          <View className="w-full flex flex-row flex-wrap justify-start items-center">
          {recommendedLinks.map((link, index) => (
            <TouchableOpacity 
            key={index}
            className='bg-[#232533] relative w-[31%] mr-2 mb-2 h-24 p-4 rounded-xl flex flex-col justify-center items-center'
            onPress={() => {
              openLinkForm(link)
            }}
          >
            <Image source={icons[link]} className="w-14 h-14 rounded-2xl mb-1" resizeMode="contain" />
            <Text className="text-white font-pregular">{link}</Text>
            </TouchableOpacity>
          ))}

          </View>

          <Text className="text-gray-100 text-md font-psemibold mt-7">{t('social')}</Text>
          <View className="w-full flex flex-row flex-wrap justify-start items-center">
            {socialLinks.map((link, index) => (
              <TouchableOpacity 
              key={index}
              className='bg-[#232533] relative w-[31%] mr-2 mb-2 h-24 p-4 rounded-xl flex flex-col justify-center items-center'
              onPress={() => {
                openLinkForm(link)
              }}
            >
              <Image source={icons[link]} className="w-14 h-14 rounded-2xl mb-1" resizeMode="contain" />
              <Text className="text-white font-pregular">{link}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-gray-100 text-md font-psemibold mt-7">{t('business')}</Text>
          <View className="w-full flex flex-row flex-wrap justify-start items-center">
            {businessLinks.map((link, index) => (
              <TouchableOpacity 
              key={index}
              className='bg-[#232533] relative w-[31%] mr-2 mb-2 h-24 p-4 rounded-xl flex flex-col justify-center items-center'
              onPress={() => {
                openLinkForm(link)
              }}
            >
              <Image source={icons[link]} className="w-14 h-14 rounded-2xl mb-1" resizeMode="contain" />
              <Text className="text-white font-pregular">{link}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
        )}
      

          <TouchableOpacity onPress={closeBottomSheet} />
        </View>
        </ScrollView>
      </RBSheet>

    </View>

    <StatusBar style='light'/>
      </ScrollView>
    // </SafeAreaView>
  )
}

export default Card