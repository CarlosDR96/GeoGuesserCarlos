import React, { useRef, useState } from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CrosshairImage from '../assets/crosshair.png'


function DetailsScreen({route, navigation}) {
    const { text, info2 } = route.params;
    const mapRef = useRef(null);
    const [markerPosition, setMarkerPosition] = useState(null);
  
    const setMark = async () => {
        console.log("Hola");
        if (mapRef.current) {
          const camera = await mapRef.current.getCamera();
          console.log("Latitud:", camera.center.latitude);
          console.log("Longitud:", camera.center.longitude);
          setMarkerPosition({ latitude: camera.center.latitude, longitude: camera.center.longitude });
    
        }
    };
    
    const check = () => {
      console.log("Check");
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <View style={{flexDirection:'row'}}>
              <Button
                title="Set Mark"
                onPress={setMark}
              />
              <Button
                title="Check"
                onPress={check}
              />
            </View>
            <View style={styles.map} >
              <MapView ref={mapRef}  style={{width:'100%', height:'100%'}}mapType='satellite'>
                  {markerPosition && (
                  <Marker coordinate={markerPosition} title="Marcador" description="Este es el centro del mapa" />
                  )}
              </MapView>
              <View pointerEvents="none" style={styles.mapCenterMarkerView}>
                <Image 
                    style={{width:'10%', height:'10%'}}
                    source={CrosshairImage}  
                />
              </View>
            </View>
             
            <Text>Find Barcelona</Text>
        </View>
        
    );
}

  export default DetailsScreen;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '80%',
      height: '50%',
      backgroundColor: 'red',
    },
    mapCenterMarkerView: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  
  });