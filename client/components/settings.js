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
import axios from 'axios'
import ModalDropdown from 'react-native-modal-dropdown'

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
  pickerWrapper: {
    // display: 'flex'
    alignItems: 'center',
    flex: 1
  },
  pickerHeader: {
    fontSize: 25,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  picker: {
    marginRight: 40,
    marginLeft: 40,
    color: 'white',
  },
  activeText: {
    fontSize: 25,
    marginLeft:20,
    marginRight: 20,
    textAlign: 'center',
    color: 'white'
  }
})
const API = 'http://192.168.50.109:3001/'
// const APIgetActive = 'http://192.168.50.109:3001/api/get_active_status'
// const APItoggleActive = 'http://192.168.50.109:3001/api/toggle_active_status'
class Settings extends Component {
  static defaultProps = {

  }
  state = {
    message: '',
    token: null,
    notification: null,
    title: 'A Friendly Reminder',
    body: '',
    selectedMessageType: '',
    activeStateMessage: '',
    activeStatus: ''
  }

  componentDidMount = () => {
    //get current active status
    this.getCurrrentActiveStatus()

    //get current message type
  }  

  componentDidUpdate = () => {
    
  }
  
  getCurrrentActiveStatus = () => {
    axios.get(API + "api/get_active_status").then(resp => {
      const status = resp.data.results[0].active_status
      // console.log(resp.data.results[0])
      if (status === 0) {
        this.setState({
          activeStatus: 'Off',
          activeStateMessage: 'Start receiving messages'
        })
      } else {
        this.setState({
          activeStatus: 'On',
          activeStateMessage: 'Stop receiving messages'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  
  activateNotificationSending = () => {
    var t = this
    // Actions.home()
    axios.get(API + "api/toggle_active_status").then(resp => {
      t.getCurrrentActiveStatus()
    }).catch(err => {
      console.log(err)
    })
  }

  setMessageType = (index, val) => {
    console.log(index, val)
    const type = val
    // sql call to update message type
    axios.post(API + "api/set_message_type", {type}
    ).then(resp => {
      this.setState({selectedMessageType: type})
    }).catch(err => {
      console.log(err)
    })
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
            title={ this.state.activeStateMessage }
            onPress={ this.activateNotificationSending } />

          <Text style={styles.activeText}>Active Status: { this.state.activeStatus }</Text>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerHeader}>Current Type:</Text>
            {/* <Picker
              selectedValue={this.state.selectedMessageType}
              style={styles.picker}
              onValueChange={this.setMessageType}>
              <Picker.Item label="Meditations" value="meditations" />
              <Picker.Item label="All" value="all" />
            </Picker> */}
            <ModalDropdown 
              animated = {true}
              options = {['Meditations', 'All']} 
              style = {{width: 290, marginLeft: 20, marginRight: 20, backgroundColor: 'orange', borderRadius: 9, padding: 6}} //style of button
              textStyle = {{color:'white', fontSize: 20, textAlign: 'center'}}              //style of button text
              dropdownStyle = {{width: 280, borderRadius: 5, backgroundColor: 'white'}}
              // adjustFrame = {(width) => {width: width}}
              dropdownTextStyle = {{color: 'grey', fontSize: 15}}
              defaultValue = {'Select'}
              onSelect={(index, value) => this.setMessageType(index, value)}
            />
          </View>
        </View>
      </ScrollView>
    
    )
  }
}

export default Settings
