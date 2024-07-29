import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {  useNavigation, useRouter } from 'expo-router';
import * as Location from 'expo-location';

import MapView from 'react-native-map-clustering';
import hosts from '../constants/hosts.json';
import { HostType } from '@/constants/types';
import { useQuery } from '@tanstack/react-query';
import { LoadHostels } from '@/app/lib/hostelAPi';
import { COLORS } from '@/constants/theme';

const ListingsMapDynamic = React.memo(({ selectedCategory }:{selectedCategory:string | null}) => {
  const [region, setRegion] = useState<any>(null);
  const [listings, setListings] = useState<HostType[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const fetchedListings = useRef(false);
  const router = useRouter();


  // Fetch hostels using Tanstack Query with dependency on region for smooth updates
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['hostelsMap', selectedCategory, region], // Include region as dependency for updates
    queryFn: () => LoadHostels(selectedCategory ?? '', 1, 20, 5, region?.latitude, region?.longitude),
    enabled: !!region, // Only fetch when region is available
    staleTime: 1000 * 60 * 5, // Allow cached data for 5 minutes to avoid excessive fetches
  });

  // Update listings efficiently using useMemo for stable reference
  const allHostels = useMemo(() => {
    if (!data?.hostels) return []; // Handle case where data is not yet fetched

    // Combine existing listings with newly fetched ones
    const combinedListings = fetchedListings.current ? [...listings, ...data.hostels] : data.hostels;
    fetchedListings.current = true; // Set flag to prevent duplicate fetches on subsequent renders
    return combinedListings;
  }, [data]);


  // Request location permissions on initial render
  useEffect(() => {
    const requestLocationPermissions = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access   location was denied');
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
      } catch (error:any)   
 {
        Alert.alert('Error accessing location:', error.message);
        setLoading(false);
      }
    };

    requestLocationPermissions();
  }, []);






  const onRegionChangeComplete = useCallback((newLocation:any) => {
    setRegion({
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, []);

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
        <>
        {isLoading && (<ActivityIndicator size="large" color={COLORS.primary}  style={{zIndex:99 , flex:1}}/>)}
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
          onRegionChangeComplete={onRegionChangeComplete}
          renderCluster={renderCluster}
          >
          {allHostels.map((listing:HostType) => (
            <Marker
            key={listing._id}
            onPress={()=>router.push({
              pathname: 'listing/details',
              params: { Host_code: listing._id }
              
            })}
            coordinate={{
              latitude: parseFloat(listing.latitude.toString()),
              longitude: parseFloat(listing.longitude.toString()),
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
          </>
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

export default ListingsMapDynamic;