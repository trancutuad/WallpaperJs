import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button,TextInput,FlatList,Image,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase'
import {useState} from 'react'
export default function App() {
  // thiet lap sdk firebase
  var firebaseConfig = {
    apiKey: "AIzaSyALw1aUammOaR7327YP1hWywia_ryIx7N0",
    authDomain: "lab8danentang-4f571.firebaseapp.com",
    databaseURL: "https://lab8danentang-4f571.firebaseio.com",
    projectId: "lab8danentang-4f571",
    storageBucket: "lab8danentang-4f571.appspot.com",
    messagingSenderId: "883987663571",
    appId: "1:883987663571:web:8972e83aa35148d495e226",
    measurementId: "G-E8C2YV41YE"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  // firebase.analytics();


  const [id, setId] = useState();
  const [name, setName] = useState();
  const [data, setData] = useState();
  // them data
  function storeNewStudent(Id,name){
    firebase.database().ref('studens/' + Id).set({
      Id: Id,
      Name: name
    },function(error){
      if(error){
        alert('loi')
      }else{
        alert('thanh cong')
      }
    }
    )
  }
  //Hien thi data
  function readUserData(){
    firebase.database().ref('studens/').on('value',function (snapshot){
      let array = [];
      snapshot.forEach (function(childsnapshot){
        let childData = childsnapshot.val();
        array.push({
          name: childData.Name,
          id: childData.Id
        });
        console.log(childData.Name)
        console.log(childData.Id)
      });
      // console.log(array.length);
      setData(array);
    });
  }
 //delete
 function deleteData(Id){
  firebase.database().ref('studens/' + Id).remove().then(()=>{
console.log('ABC')
  });
}
  return (
    <View style={styles.container}>
      <Image
        style={{height: 100, width: 100}}
        source={{
          uri: 'https://reactjs.org/logo-og.png',
        }}
      />

      <TextInput 
      style = {styles.textInput}
      placeholder = 'Nhap ID'
      onChangeText = {(id) => setId(id)}
      value={id}
      />
      <TextInput 
      style = {styles.textInput}
      placeholder = 'Nhap Name'
      onChangeText = {(name) => setName(name)}
      value={name}
      />
      <Button
      title = 'Dang ky'
      onPress = {() => {
        storeNewStudent(id,name);
      }}
      />
      <br/>
      <Button 
      title = 'Hien thi danh sach'
      onPress = {() => {
        readUserData();
      }}
      />
      <Text>ID      Ten Sinh Vien</Text> 
      <FlatList style ={{flex: 1}}
      data = {data}
      renderItem = {({item}) => (
        <View>
      <Text>{item.id} {'      '} {item.name} {'    '}{
        <TouchableOpacity onPress = {() => {
          console.log('ID ' + item.id);
          deleteData(item.id);
        }}>
        <Image style= {{height: 20, width: 20,top:5}}
          source = {{uri: 'https://img.icons8.com/cotton/2x/delete-sign--v2.png'}}
          />
          </TouchableOpacity>
          }
           </Text>
        </View>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },textInput: {
    top:50,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    borderColor: 'blue',
    borderWidth: 1, 
    borderRadius: 10, 
    width: 250,
}
});