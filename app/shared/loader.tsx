import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import {COLORS} from '@/constants/theme'

const Loader = () => {
  return (
    <View style={styles.body}>
   <Text>  <ActivityIndicator size="large" color={COLORS.primary}/> </Text>
      </View>
  )
}


const styles = StyleSheet.create({
body:{position:'absolute',width:'100%',height:'100%', zIndex:50, justifyContent:'center',alignItems:'center' , backgroundColor:'black' ,opacity:0.2}
})
export default Loader