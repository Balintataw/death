import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import splash from './components/splash'
import Home from './components/home'

export default class App extends React.Component {

  // state = {
  //   response: ''
  // };
  // componentDidMount() {

  //   console.log('here')

  //   const API = 'http://192.168.50.34:3001/api/hello'
  //   // const API = 'http://localhost:3001/getquote'
  //   // const API = 'http://10.68.0.239:3001/'
  //   return fetch(API, {
  //          method: 'GET',headers: {
  //               Accept: 'application/json',
  //               'Content-Type': 'application/json',
  //             }
  //       }).then(response => response.json())
  //           .then(resp => {
  //             console.log(resp)
  //             this.setState({
  //               response: resp.express
  //             })
  //           }).catch((error) => {
  //             console.error(error);
  //           });
  // }          

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>

          <Scene hideNavBar={true} key="splash" component={splash}  initial />
          <Scene hideNavBar={true} key="home" component={Home} title="Home" type="reset"  />

        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
