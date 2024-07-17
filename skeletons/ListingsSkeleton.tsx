import Colors from '@/constants/Colors';
import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
const pulseAnimation = new Animated.Value(1);

const ListingsSkeleton = () =>{
  const startPulse = () => {
    Animated.loop(
      Animated.timing(pulseAnimation, {
        toValue: 0.5,
        duration: 1000,
        useNativeDriver: true, // Improve performance (optional)
      }),
      { iterations: Infinity }
    ).start();
  };

  React.useEffect(() => {
    startPulse();
    // Cleanup function to stop animation on unmount
    return () => pulseAnimation.stop();
  }, []);

  const interpolatedStyle = {
    opacity: pulseAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  };

  return (
    <View style={[styles.card ,interpolatedStyle]} >
{/* <View style={styles.carousel}/>
<View style={styles.text1}/>
<View style={styles.text2}/> */}


    </View>
  )
}

export default ListingsSkeleton

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#374151',
      borderRadius: 10,
      width: '100%',
      height: 300,
   
      marginBottom: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
    },
    carousel: {
      width: '100%',
      height: 250,
      backgroundColor:'white'
    },
    text1:{
        width: '60%',
        height: 50,
        backgroundColor:'white' 
    },
    text2:{
        width: '90%',
        height: 100,
        backgroundColor:'white' 
    },
    dotStyle: {
      width: 7,
      height: 7,
      backgroundColor: 'silver',
      marginHorizontal: 3,
      borderRadius: 8,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    roundButton:{
      position: 'absolute', 
      right: 6, 
      top: 8,
      borderRadius: 50,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      color: Colors.primary,
      padding: 8,
      elevation: 2,
      // borderRadius: 18,
    },
    cardContent: {
      padding: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      color: '#888',
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rating: {
      fontSize: 16,
    },
    price: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
    },
    noListingsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D0D0D0',
    },
    noListingsImage: {
      width: 300,
      height: 300,
      marginBottom: 20,
      borderRadius: 20,
    },
    noListingsText: {
      fontSize: 16,
      color: Colors.grey,
      textAlign: 'center',
    },
    hostsSum: {
      textAlign: 'center',
      fontFamily: 'mon-b',
      fontSize: 14,
    }
  });