import React from 'react';
import {View, StyleSheet, Image, Text, useWindowDimensions} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

export const DrawerContent = props => {
  const height = useWindowDimensions().height;

  const logout = () => {
    auth().signOut();
    props.navigation.replace('LoginStack');
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{height: height}}>
        <View style={styles.userInfoSection}>
          <Text style={styles.name}>TRAVEL STORY</Text>
        </View>
        <View style={styles.items}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={28} />
            )}
            labelStyle={{fontSize: 20}}
            label="Home"
            onPress={() => {
              props.navigation.navigate('HomeStack');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="account-outline" color={color} size={28} />
            )}
            labelStyle={{fontSize: 20}}
            label="Perfil"
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
          />
        </View>
        <View style={{height: '15%'}}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="logout" color={color} size={28} />
            )}
            labelStyle={{fontSize: 20}}
            onPress={logout}
            label="Cerrar Sesión"
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: 'grey',
  },
  userInfoSection: {
    // paddingLeft: 20,
    width: '100%',
    height: '25%',
    backgroundColor: '#023E3F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -5,
  },
  items: {
    height: '60%',
  },
  name: {
    fontSize: 35,
    color: 'white',
  },
});
