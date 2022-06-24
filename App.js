import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import Beranda from './components/Beranda';
import Pendalaman from './components/postingan/Pendalaman';
import Materi from './components/postingan/Materi';
import AyatMateri from './components/postingan/AyatMateri';     
import List from './components/List';
import Baca from './components/Baca';
import Surah from './components/card/Surah';
import Ayat from './components/card/Ayat';
import TesSurah from './components/tes/TesSurah';
import TesAyat from './components/tes/TesAyat';
import SambungAyat from './components/tes/SambungAyat';
import MelengkapiAyat from './components/tes/MelengkapiAyat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DraweNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Beranda">
      <Drawer.Screen
        name="Beranda"
        component={Beranda}
        options={{
          drawerLabel: () => (
            <Image
              style={{
                width: 170,
                height: 100,
              }}
              source={require('./assets/logo.png')}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen name="Baca Al-Qur'an" component={List} />
      <Drawer.Screen
        name="Surah Card"
        component={Surah}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Ayat Card"
        component={Ayat}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Tes Surah"
        component={TesSurah}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Tes Ayat"
        component={TesAyat}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Sambung Ayat" component={List} />
      <Drawer.Screen name="Melengkapi Ayat" component={List} />
      <Drawer.Screen name="Pendalaman Ayat" component={Pendalaman} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={DraweNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Baca"
          component={Baca}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sambung"
          component={SambungAyat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Melengkapi"
          component={MelengkapiAyat}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Materi" component={Materi} />
        <Stack.Screen
          name="Ayat Materi"
          component={AyatMateri}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
