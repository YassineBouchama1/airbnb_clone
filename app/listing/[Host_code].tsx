import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Colors from '@/constants/Colors';

import { useTranslation } from 'react-i18next';
import hostJson from '@/constants/hosts.json'
import { HostType } from '@/constants/types';

const Page = () => {


  const params = useLocalSearchParams();
  const { Host_code} = params;
console.log(Host_code)
  const [host, setHost] = useState<HostType | null>(null);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  useEffect(() => {


    
    // fetch detail information host
    const fetchHostDetails = async () => {
    
      const selectedHost : any = hostJson[0]
      setHost(selectedHost);
    };

    if (Host_code) {
      fetchHostDetails();
    }
  }, [Host_code, i18n.language]);



  // while data fetching display loader
  if (!host) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }





  return (

  
          <View style={styles.loadingContainer}>
          <Text style={{color:Colors.primary}} >{host.price} jjhsdjh </Text> 
    
      </View>
         

  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Page;
