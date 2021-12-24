import React, {useState, useLayoutEffect, useEffect} from 'react';
import {StyleSheet, Text, View, Image, FlatList, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './custom/Card';
import Icons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const TripDetails = ({navigation, route}) => {
  const {title} = route.params;

  const uid = auth().currentUser.uid;

  const headerbtn = useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icons
          name="add-circle-outline"
          size={35}
          style={{marginRight: 15}}
          color="white"
          onPress={() => navigation.navigate('PostNew', {title: title})}
        />
      ),
      headerLeft: () => (
        <Icons
          name="menu-sharp"
          size={35}
          style={{marginLeft: 15}}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
      ),
    });
  }, [navigation]);

  const [newdata, setnewdata] = useState([]);

  useEffect(() => {
    loadData();
    return () => {
      setnewdata([]);
    };
  }, []);

  const loadData = async () => {
    await firestore()
      .collection('users')
      .doc(uid.toString())
      .collection('albums')
      .doc(title)
      .collection('posts')
      .get()
      .then(posts => {
        if (posts.docs.length > 0) {
          let arr = [];
          posts.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            arr.push({...data, id});
          });
          setrefreshing(false);
          return arr;
        } else {
          console.log('no posts found');
        }
      })
      .then(arr => {
        if (arr) {
          setnewdata(arr);
        }
      })
      .catch(e => console.log(e));
  };

  const renderCards = ({item}) => (
    <Card
      key={item.id}
      text={item.description}
      location={item.location}
      dbimage={item.image}
    />
  );

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <Icon
          name="globe"
          size={120}
          onPress={() => navigation.navigate('PostNew', {title: title})}
        />
        <Text>Añade publicaciones a tus álbumes</Text>
      </View>
    );
  };

  const onRefresh = () => {
    setrefreshing(true);
    loadData();
  };

  setTimeout(() => {
    setrefreshing(false);
  }, 2000);

  const [refreshing, setrefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{title}</Text>
      </View>
      <View style={styles.cards}>
        <FlatList
          data={newdata}
          renderItem={renderCards}
          showsVerticalScrollIndicator={false}
          style={{}}
          ListFooterComponent={<Footer />}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );
};

export default TripDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    alignSelf: 'center',
    marginTop: 15,
  },
  headingText: {
    fontSize: 35,
    fontWeight: '500',
  },
  cards: {
    height: '90%',
  },
  footer: {
    alignSelf: 'center',
    marginTop: 20,
    height: 180,
    alignItems: 'center',
  },
});
