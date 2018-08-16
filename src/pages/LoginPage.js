import React from 'react';
import { Button, StyleSheet, TextInput, View } from "react-native";
import firebase from 'firebase';

import FormRow from '../utils/FormRow'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: '',
        }
    }
    componentDidMount(){
        const config = {
            apiKey: "AIzaSyCBvlCTEL3QYB02_HucukD28sC2GzaedMk",
            authDomain: "series-2508d.firebaseapp.com",
            databaseURL: "https://series-2508d.firebaseio.com",
            projectId: "series-2508d",
            storageBucket: "series-2508d.appspot.com",
            messagingSenderId: "790649160140"
          };
          firebase.initializeApp(config);
    }

    onChangeHandler(field, value){
        this.setState({ [field]: value });
    }
    tryLogin(){
        const { mail, password} = this.state;
        firebase
        .auth()
        .signInWithEmailAndPassword(mail, password)
        .then( user => console.log('Usuário autenticado!', user) )
        .catch( error => console.log('Usuário não encontrado', error) );
    }

    render() {
      return (
          <View style={ styles.container }>
            <FormRow first>
                <TextInput
                    style={ styles.input}
                    placeholder='user@email.com'
                    value={this.state.mail}
                    onChangeText={ value => this.onChangeHandler('mail', value) }
                />
            </FormRow>
            <FormRow last>
                <TextInput
                    style={ styles.input}
                    placeholder='******'
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={ value => this.onChangeHandler('password', value) }
                />
            </FormRow>
            <Button
                title='Entrar'
                onPress={() => this.tryLogin()}
            />
          </View>
      )
    };
}

const styles = StyleSheet.create({
    container:{
        paddingLeft: 10,
        paddingRight: 10
    },

    input:{
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    }
});