import React from 'react'
import 'react-native-reanimated';
import { useState } from 'react'
import { Link, router} from 'expo-router'
import { View, Text, ScrollView, Image, Alert, AppState} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import { supabase } from '../../lib/supabase'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const SighUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordRepeate: "",
  });

  async function signUpWithEmail(email, password) {
    setIsSubmitting(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    router.replace('/share')
    setIsSubmitting(false); 
  }

  const submit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    if (form.email === "" || form.password === "" || form.passwordRepeate === "") {
      Alert.alert("Error", "Please fill in all fields");
    } else if (!emailRegex.test(form.email)) {
      Alert.alert("Error", "Please enter a valid email address");
    } else if (form.password !== form.passwordRepeate) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      signUpWithEmail(form.email, form.password);
    }
  };

  return (
    <SafeAreaView className='bg-[#161622] h-full'>
      <ScrollView>
        <View className='w-full justify-center h-full px-4 my-6'>
          <Image 
            source={images.logo}
            className='w-[180px] h-[35px]'
            resizeMode='contain'
          />

          <Text className="text-xl text-white text-semibold mt-10 font-psemibold">
            Sign Up 
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Repeat Password"
            value={form.passwordRepeate}
            handleChangeText={(e) => setForm({ ...form, passwordRepeate: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link
              href='/sign-in'
              className='text-lg font-psemibold text-primary'
            >
              Sign in
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SighUp