import React from 'react'
import { View, Text, SafeAreaView, ScrollView} from 'react-native'
import { supabase } from '../../lib/supabase'

const Home = () => {
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle= {{ height: '100%' }}>
        <View>
          <Text>Home</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home