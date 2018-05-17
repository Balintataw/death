import React, { Component } from 'react'
import { StyleSheet, 
         Text, 
         View, 
         StatusBar, 
         Image, 
         TouchableOpacity, 
         TextInput, 
         KeyboardAvoidingView,
         ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Permissions, Notifications } from 'expo'

const API = 'http://192.168.50.34:3001/api/getquote'
// const API = 'http://localhost:3001/getquote'
// const API = 'http://10.68.0.239:3001/api/getquote'


class Home extends Component {
  static defaultProps = {

  }
  state = {
    message: '',
    token: null,
    notification: null,
    title: 'A Friendly Reminder',
    body: '',
  }

  getQuote = () => {
    return fetch(API, {
      method: 'GET',headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         }
   }).then(response => response.json())
       .then(resp => {
         console.log('resp',resp.quote.quotes)
         this.setState({
           message: resp.quote.quotes
         })
       }).catch((error) => {
         console.error(error);
       })
  }

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (status !== 'granted') {
        return
      }
    }

    const token = await Notifications.getExpoPushTokenAsync()

    this.subscription = Notifications.addListener(this.handleNotification)

    this.setState({
      token,
    })
  }

  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.message) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  componentDidMount = () => {
    this.registerForPushNotifications()
    this.getQuote()
    setInterval(() => {
      this.getQuote()
      this.sendPushNotification()
    },10000)

  }    
  
  handleNotification = notification => {
    this.setState({
      notification,
    })
  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar hidden={true} />
        {this.state.notification ?
          <Text style={styles.text}>{JSON.stringify(this.state.notification.data.message)}</Text> 
          : null }
      </ScrollView>
    
    )
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'rgb(126, 209, 85)',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    padding: 8,
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
})

export default Home
