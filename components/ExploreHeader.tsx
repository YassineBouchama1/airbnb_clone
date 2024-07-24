import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Link } from 'expo-router';
import {COLORS} from '@/constants/theme';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CategoriesType, CategoryType } from '@/constants/types';
import categoriesJson from '@/constants/categories.json'



const ExploreHeader = ({ onSelectCategory }:any) => {
  const [categories, setCategories] = useState<CategoryType[] | any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    
    // fetch list of categories
        setCategories([{ category_code: 'all', name: t('All') }, ...categoriesJson]);
        setLoading(false);
      
  }, [i18n.language]);

  const handleCategorySelect = (categoryCode:string) => {
    setSelectedCategory(categoryCode);
    onSelectCategory(categoryCode);
  };
  
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', paddingTop: 35 }}>
      <View style={styles.container}>
        <View style={[styles.actionRow, {flexDirection: isRTL ? 'row-reverse' : 'row'} ]}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: 'mon-sb' }}>{t('Where to?')}</Text>
                <Text style={{ color: COLORS.grey, fontFamily: 'mon' }}>{t('Anywhere · Any week')}</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal={true}
          contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }} 
          showsHorizontalScrollIndicator={false}
        >
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            categories.map((category:any) => (
              <View key={category.category_code} style={styles.categoryContainer}>
                <TouchableOpacity
                  style={[styles.categoryBtn, selectedCategory === category.category_code && styles.selectedCategoryBtn]}
                  onPress={() => handleCategorySelect(category.category_code)}
                >
                  {category.category_code === 'all' ? (
                    <Image source={{ uri: 'https://res.cloudinary.com/dofubyjcd/image/upload/v1718222114/system/v7dckrnijvvtlqgy90qz.png' }} style={styles.categoryIcon} />
                  ) : (
                    <Image source={{ uri: category.image }} style={styles.categoryIcon} />
                  )}
                  <Text
                    style={[styles.categoryText, selectedCategory === category.category_code && styles.selectedCategoryText]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
                {selectedCategory === category.category_code && <View style={styles.underline} />}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 140,
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
});

export default ExploreHeader;
