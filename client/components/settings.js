import React, { Component } from 'react'
import { StyleSheet, 
         Text, 
         View, 
         StatusBar, 
         Image, 
         TouchableOpacity, 
         TextInput, 
         KeyboardAvoidingView,
         Picker,
         ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Permissions, Notifications } from 'expo'
import { Button } from 'react-native-elements'


const styles = StyleSheet.create({

  container: {
    backgroundColor: '#decf9a',
    flexGrow: 1,
    justifyContent: 'flex-start',
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
  },
  picker: {
    marginRight: 20,
    marginLeft: 20,
    color: 'white',
  }
})

class Settings extends Component {
  static defaultProps = {

  }
  state = {
    message: '',
    token: null,
    notification: null,
    title: 'A Friendly Reminder',
    body: '',
    messageType: ''
  }

  componentDidMount = () => {
    //get current active status
    //get current message type
  }   
  
  activateNotificationSending = () => {
    Actions.home()
    // sql call to change active and begin message/notification sending
  }

  setMessageType = (messageType) => {
    this.setState({messageType: messageType})
    // sql call to update message type
  }
  
  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar hidden={true} />
        <View>
          <Text style={styles.text}>Settings</Text> 
          <Button
            transparent
            icon={{name: 'update', size: 32}}
            buttonStyle={{borderRadius: 50}}
            title={'Start receiving messages'}
            onPress={this.activateNotificationSending} />

          <Text style={styles.picker}>Current Type: {this.state.messageType}</Text>

          <Picker
            selectedValue={this.state.messageType}
            style={styles.picker}
            onValueChange={this.setMessageType}>
            <Picker.Item label="Meditations" value="meditations" />
            <Picker.Item label="All" value="all" />
          </Picker>
        </View>
      </ScrollView>
    
    )
  }
}

export default Settings
