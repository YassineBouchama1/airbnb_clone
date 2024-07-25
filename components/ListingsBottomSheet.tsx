import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Listings from '@/components/Listings';
import { Ionicons } from '@expo/vector-icons';
import {COLORS} from '@/constants/theme';
import React from 'react';

const ListingsBottomSheet = ({ selectedCategory }: {selectedCategory:null | string}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['4%', '100%'], []);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
  };

  return (
    <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: COLORS.grey , width: 50, }}
        style={styles.sheetContainer}
    >
        <Listings selectedCategory={selectedCategory} />
        {/* <BottomSheetScrollView Style={styles.contentContainer}>
          <Listings selectedCategory={selectedCategory} />
        </BottomSheetScrollView> */}
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={onShowMap} style={styles.btn}>
            <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
            <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: 'red',
    paddingBottom: 10, 
  },
  absoluteBtn: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    alignItems: 'center',
    opacity: 0.7,
  },
  btn: {
    backgroundColor: COLORS.dark,
    padding: 16,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingsBottomSheet;
