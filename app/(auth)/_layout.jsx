import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router'

import { supabase } from '../../lib/supabase'
import { Session } from '@supabase/supabase-js'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
       
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  )
}

export default AuthLayout