import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import splash from './components/splash'
import Home from './components/home'
import Settings from './components/settings'

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>

          <Scene hideNavBar={true} key="splash" component={splash}  initial />
          <Scene hideNavBar={true} key="home" component={Home} title="Home" type="reset"  />
          <Scene hideNavBar={true} key="settings" component={Settings} title="Settings" />
          
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
})
