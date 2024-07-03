import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from "i18next";

const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Failed to load language preference", error);
      }
    };

    loadLanguagePreference();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
};

export default LanguageProvider;
