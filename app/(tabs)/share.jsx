import React from 'react'
import { View, Text, SafeAreaView, ScrollView} from 'react-native'
import { supabase } from '../../lib/supabase'

const Share = () => {
  
  return (
    <SafeAreaView className='bg-default h-full'>
      <ScrollView contentContainerStyle= {{ height: '100%' }}>
        <View>
          <Text className='text-white'>Share</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Share