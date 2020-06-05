import React, {useEffect, useState, useRef} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});



function App() {
  const [permission, setPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
  }
  
  useEffect(() => {
    getPermissionAsync()
  }, []);

  getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status == "granted") {
        setPermission(true);
      } else {
        setPermission(false);
      }
  }
  
  handleCameraType=()=>{
   if (cameraType == Camera.Constants.Type.back) {
     setCameraType(Camera.Constants.Type.front);
   } else {
    setCameraType(Camera.Constants.Type.back);
   }
  }

  takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }
  
  if (permission === null) {
    return <View />;
  } else if (permission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',                  
                }}
                onPress={()=>pickImage()}>
                <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={()=>takePicture()}>
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={()=>handleCameraType()}>
                <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
            </View>
          </Camera>
      </View>
    );
  }

}

export default App;