import React from 'react';
import { View, Button } from 'react-native';
import i18n from '../services/i18n';

const LanguageSwitcher = () => {
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button title="English" onPress={() => switchLanguage('en')} />
      <Button title="Français" onPress={() => switchLanguage('fr')} />
      <Button title="العربية" onPress={() => switchLanguage('ar')} />
    </View>
  );
};

export default LanguageSwitcher;
