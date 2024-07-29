import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Slider from '@react-native-community/slider'
import { HostelContext } from '@/app/context/hostelContext';
import { COLORS } from '@/constants/theme';
const SliderDistanceKm = ({style}:{style?:any}) => {

    const {  maxDistanceKm, setMaxDistanceKm } = useContext(HostelContext);

    const CONSTANTS = {
        MAX_VALUE: 600,
        MIN_VALUE: 1,
        STEP: 10,
        DEFAULT_STEP_RESOLUTION: 100,
      } as const;
      
      
  return (
    <View style={{justifyContent:'center',alignContent:'center' , flexDirection:'row',paddingBottom:5}}>
    
          <Text style={styles.distanceLabel}>{maxDistanceKm} KM:</Text>
          
       
    
      <Slider
    
        style={[styles.slider, ]}
        step={CONSTANTS.STEP}

        minimumValue={CONSTANTS.MIN_VALUE}
        maximumValue={CONSTANTS.MAX_VALUE}
        value={maxDistanceKm}
        onValueChange={setMaxDistanceKm}
      />
  
     
   
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: 200,
  
    },
    actionRow: {
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 16,
    },
    filterBtn: {
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS.grey,
      borderRadius: 24,
    },
    text: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: '500',
      margin: 0,
    },
    divider: {
      width: 2,
      height: 20,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    slider: {
      width: '70%',
      opacity: 1,
     
    },
    searchBtn: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      padding: 8,
      alignItems: 'center',
      width: 280,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#c2c2c2',
      borderRadius: 30,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 1, height: 1 },
    },
    categoryContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    categoryBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: COLORS.lightGrey,
    },
    selectedCategoryBtn: {
      backgroundColor: COLORS.lightGrey,
    },
    underline: {
      height: 2,
      backgroundColor: 'black',
      width: '100%',
      marginTop: 3,
    },
    categoryIcon: {
      width: 25,
      height: 25,
      marginBottom: 5,
    },
    categoryText: {
      fontSize: 13,
      fontFamily: 'mon-sb',
      color: COLORS.grey,
      textAlign: 'center',
    },
    selectedCategoryText: {
      color: COLORS.grey,
    },
    distanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    distanceLabel: {
      fontFamily: 'mon-sb',
      marginRight: 5,
    },
    distanceValue: {
      fontFamily: 'mon-sb',

    },
  });
  

  export default SliderDistanceKm;