import React, { useState, useEffect ,useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import PhoneInput from 'react-native-phone-input';

import { useTranslation } from 'react-i18next';
import '../app/translation'
import i18n from "i18next";

import { icons } from "../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const {t, i18n} = useTranslation();
  
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (phoneInputRef.current && value) {
      phoneInputRef.current.setValue(value);
    }
  }, [value]);

  const [showPassword, setShowPassword] = useState(false);

  const renderInputField = () => {
    if (title === t('phone') ) {
      return (
        <>
        <PhoneInput
          autoFormat
          ref={(ref) => {
          phoneInputRef.current = ref;
          if (typeof ref === 'function') ref(ref);
          }}
          onChangePhoneNumber={handleChangeText}
          textStyle={{ color: 'white', fontSize: 16 }}
          onChange={(value) => console.log('onChange', value)}
          style={{ flex: 1 }}
        />
        </>
      );
    }

    return (
      <TextInput
        className='flex-1 text-white font-psemibold text-base '
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#7B7B8B'
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
        {...props}
      />
    );
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-primary flex flex-row items-center">
        {renderInputField()}

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
