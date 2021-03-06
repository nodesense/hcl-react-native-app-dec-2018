// app/components/CameraScreen.js

import React from 'react';
import {View, 
        Button, 
        Text, 
        StyleSheet, 
        TouchableOpacity,
        CameraRoll,
        Alert
      } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Permissions from 'react-native-permissions'


export default class CameraScreen extends React.Component {
    constructor(props) {
        super(props)
    }


  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)

      console.log(data.uri);
      //const response = await Permissions.check('photo')
      const response =  await Permissions.request('photo') 
      Alert.alert("Permission", "" + response);

      if (response == 'authorized') {
        await CameraRoll.saveToCameraRoll( data.uri, "photo" )

      } else {
        Alert.alert("Permission", "Sorry, no permission " + response)
      }

    }
  };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
 
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20
    }
  });
  