import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import mapMarker from '../images/map-marker.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const pages: React.FC = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', {id});
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  if (!orphanages){
    return <View style={styles.container}>
      <Text style={styles.description}>Carregando...</Text>
    </View>
  }

  return <View style={styles.container}>
    <MapView style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -26.8458451,
        longitude: -52.9921873,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }} >

      {orphanages.map(orphanage => {
        return (
          <Marker key={orphanage.id} icon={mapMarker}
            calloutAnchor={{
              x: 2.8,
              y: 0.8,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }} >
            <Callout tooltip={true} onPress={()=>{handleNavigateToOrphanageDetails(orphanage.id)}}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>

        )
      })}
    </MapView>

    <View style={styles.footer}>
      <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>
      <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage} >
        <Feather name="plus" size={20} color="#FFF" />
      </RectButton>
    </View>
  </View>;
}

export default pages;

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  
  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: "center",
    fontFamily: 'Nunito_700Bold',
  },

  calloutText: {
    color: '#0089a4',
    fontSize: 14,
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }
});
