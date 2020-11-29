import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';


export default function Picture({ navigation }) {


  const [mang, setMang] = useState();

  fetch('https://www.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=8f74a16251fb5ba79670d75fdf40f368&user_id=189489416%40N08&extras=views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=200&page=1&format=json&nojsoncallback=1')
    .then(response => response.json())
    .then(json => setMang(json.photos.photo))
  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginTop: 20 }}
        data={mang}
        numColumns={2}
        horizontal={false}
        renderItem={({ item }) =>
          <View
            style={{ width: 162, height: 112, borderWidth: 1, borderRadius: 5, margin: 5, borderColor: '#fff' }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Photo', {
                duongdan_l: item.url_l,
                title: item.title,
                duongdan_c: item.url_c,
                duongdan_z: item.url_z,

                width_l: item.width_l,
                height_l: item.height_l,

                width_c: item.width_c,
                height_c: item.height_c,

                width_z: item.width_z,
                height_z: item.height_z,




              }, console.log(item.url_l + '----' + item.height_l));

            }}>
              <Image style={{ width: 160, height: 110, borderRadius: 5 }}
                source={{ uri: item.url_l }} />

            </TouchableOpacity>
            <View style={styles.row} >
              <Image source={require('../assets/eye.png')} style={styles.icon} />
              <Text style={styles.txt}>{item.views}</Text>
            </View>
          </View>
        }
        keyExtractor={item => item.id}

      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    position: 'absolute',
    width: 160,
    height: 20,
    bottom: 0,
    backgroundColor: 'white',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  icon: {
    width: 15,
    height: 15,
    position: 'absolute',
    bottom: 2,
    right: 0,
    left: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    position: 'absolute',
    bottom: 1,
    right: 0,
    left: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  }
});
