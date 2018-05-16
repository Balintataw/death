import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import {Actions} from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'rgb(126, 209, 85)',
      flex: 1,
      justifyContent: 'center',
  },
  text: {
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
      marginRight: 20,
      marginLeft: 20,
      color: 'white',
      textShadowColor: 'grey',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 4,
  }
});

class Home extends Component {
  static defaultProps = {

  }
  state = {
    response: ''
  }

  componentDidMount() {


    const API = 'http://192.168.50.34:3001/api/hello'
    // const API = 'http://localhost:3001/getquote'
    // const API = 'http://10.68.0.239:3001/'
    return fetch(API, {
           method: 'GET',headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
        }).then(response => response.json())
            .then(resp => {
              console.log('resp',resp.quote.quotes)
              this.setState({
                response: resp.quote.quotes
              })
            }).catch((error) => {
              console.error(error);
            })
  }     



  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.text}>{this.state.response}</Text>
      </View>
    )
  }
}

export default Home
