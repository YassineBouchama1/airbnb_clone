import React, { useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {  useNavigation, useRouter } from 'expo-router';
import * as Location from 'expo-location';

import MapView from 'react-native-map-clustering';
import hosts from '../constants/hosts.json';
import { HostType } from '@/constants/types';

const ListingsMap = React.memo(({ selectedCategory }:{selectedCategory:string | null}) => {
  const [region, setRegion] = useState<any>(null);
  const [listings, setListings] = useState<HostType[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const fetchedListings = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const requestLocationPermissions = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error:any) {
        Alert.alert('Error accessing location:', error.message);
        setLoading(false);
      }
    };

    const fetchListings = async () => {
      if (fetchedListings.current) return;
          //fetch hosts
        await  setListings(hosts)
          setLoading(false)
        fetchedListings.current = true;
    
    };


    
    requestLocationPermissions();
    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    return selectedCategory && selectedCategory !== 'all'
      ? listings.filter((listing:any) => listing.category.category_code === selectedCategory)
      : listings;
  }, [listings, selectedCategory]);

  const renderCluster = (cluster: { onPress?: any; id?: any; geometry?: any; properties?: any; }) => {
    const { id, geometry, properties } = cluster;
    const { coordinates } = geometry;
    const { point_count } = properties;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          latitude: coordinates[1],
          longitude: coordinates[0],
        }}
        onPress={cluster.onPress}
      >
        <View style={styles.marker}>
          <Text style={{ textAlign: 'center', fontFamily: 'mon-sb' }}>
            {point_count}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          animationEnabled={false}
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={region}
          clusterColor="#fff"
          clusterTextColor="#000"
          clusterFontFamily='mon-sb'
          renderCluster={renderCluster}
        >
          {filteredListings.map((listing:any) => (
            <Marker
              key={listing.Host_code}
              onPress={()=>router.push({
                pathname: 'listing/details',
                params: { Host_code: listing.Host_code }
    
            })}
              coordinate={{
                latitude: parseFloat(listing.latitude),
                longitude: parseFloat(listing.longitude),
              }}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>
                  ${listing.price}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
});

export default ListingsMap;
