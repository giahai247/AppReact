import React,{useEffect,useState} from 'react';
import { ScrollView,TouchableOpacity, StyleSheet,Button,Text ,View,Alert,Image} from 'react-native';

import * as GoogleSignIn from 'expo-google-sign-in';
import { Google } from 'expo';

export default function UserScreen(props) {
  const[email,setEmail]=useState()
  
  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '942017657540-vqk58cfrhoc7lg4il0pm68f5th6u1oqm.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {

          props.navigation.navigate('Bills',{username:user.name,email:user.email,avatar:user.photoUrl})
          setEmail(user.photoUrl)
      
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  return (
  
       <View  style={{justifyContent:'center',alignItems:'center',flex:1}}>
     
     



     <Image style={{height:'100%',width:'100%'}} source={{uri:'https://i.pinimg.com/originals/3f/24/29/3f2429a07df13f101f12c78a47250ce2.jpg'}}></Image>
     
     
    </View>
  );
}

UserScreen.navigationOptions = {
  title: 'user',
};
