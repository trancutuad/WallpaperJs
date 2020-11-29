import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function Login({ navigation }) {
  const [text, setText] = useState();
  const [name, setName] = useState();
  const [pass, setPass] = useState();


  return (
    <View style={styles.container}>

    <Image style={{width: 400, height: 300, marginBottom: 30 }} 
                source = {{uri: "https://img.freepik.com/free-vector/colorful-hand-drawn-welcome-landing-page_23-2148274061.jpg?size=626&ext=jpg&ga=GA1.2.1610071231.1598227200"}}
            />

      <TextInput
        style={{ height: 40, marginBottom: 10, paddingLeft: 10, borderColor: 'green', borderWidth: 1, borderRadius: 10, width: 400 }}
        placeholder='Email Address'

        onChangeText={text => setName(text)}
        value={name}
      />

      <TextInput
        style={{ height: 40, marginBottom: 10, paddingLeft: 10, borderColor: 'green', borderWidth: 1, borderRadius: 10, width: 400 }}
        placeholder='PassWord'
        secureTextEntry={true}
        onChangeText={text => setPass(text)}
        value={pass}
      />
      <Button
        title="Đăng nhập"
        color="green"
        onPress={() => {
          fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'POST',
            body: JSON.stringify({
              title: name,
              body: pass,
              userId: 1
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })

            .then(response => response.json())
            .then(json => {

              if (name == null || pass == null) {
                alert("Ban chua nhap tai khoan mat khau");
              } else {
                if (name == 'tutaph08467' && pass == "admin") {
                  alert("Đăng nhập thành công");
                  navigation.navigate('Picture');
                  // } else if (name == user && !pass == matkhau) {
                  //   alert("Mat khau khong chinh xac");
                  // } else if (!name == user && pass == matkhau) {
                  //   alert("Tai khoan khong hop le");
                } else {
                  alert("Tài khoản và mật khẩu không đúng!");
                }
              }
            })
        }}

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
  },
});
