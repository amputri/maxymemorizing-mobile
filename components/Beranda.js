import * as React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Banner } from '@react-native-material/core';
import { Divider, Paragraph, Button } from 'react-native-paper';

const Beranda = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Banner
        style={{ alignItems: 'center' }}
        buttons={
          <Image
            style={{
              width: 170,
              height: 100,
              marginBottom: 15,
            }}
            source={require('../assets/logo.png')}
          />
        }
      />
      <Divider />
      <ScrollView style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Paragraph style={{ fontWeight: 'bold', color: 'blue' }}>
            Baca Al-Qur'an
          </Paragraph>
          <Divider style={{ marginBottom: 5 }} />
          <Button
            contentStyle={{ justifyContent: 'flex-start' }}
            uppercase={false}
            icon="book"
            color="lightblue"
            mode="contained"
            onPress={() => navigation.navigate("Baca Al-Qur'an")}>
            <Paragraph>Baca Al-Qur'an</Paragraph>
          </Button>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Paragraph style={{ fontWeight: 'bold', color: 'green' }}>
            Al-Qur'an Card
          </Paragraph>
          <Divider style={{ marginBottom: 5 }} />
          <Button
            contentStyle={{ justifyContent: 'flex-start' }}
            style={{ marginBottom: 5 }}
            uppercase={false}
            icon="file"
            color="lightgreen"
            mode="contained"
            onPress={() => navigation.navigate('Surah Card')}>
            <Paragraph>Surah Card</Paragraph>
          </Button>
          <Button
            contentStyle={{ justifyContent: 'flex-start', marginBottom: 5 }}
            uppercase={false}
            icon="file"
            color="lightgreen"
            mode="contained"
            onPress={() => navigation.navigate('Ayat Card')}>
            <Paragraph>Ayat Card</Paragraph>
          </Button>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Paragraph style={{ fontWeight: 'bold', color: 'purple' }}>
            Tes Hafalan
          </Paragraph>
          <Divider style={{ marginBottom: 5 }} />
          <Button
            contentStyle={{ justifyContent: 'flex-start' }}
            style={{ marginBottom: 5 }}
            uppercase={false}
            icon="trophy"
            color="pink"
            mode="contained"
            onPress={() => navigation.navigate('Tes Surah')}>
            <Paragraph>Tes Surah</Paragraph>
          </Button>
          <Button
            contentStyle={{ justifyContent: 'flex-start' }}
            style={{ marginBottom: 5 }}
            uppercase={false}
            icon="trophy"
            color="pink"
            mode="contained"
            onPress={() => navigation.navigate('Tes Ayat')}>
            <Paragraph>Tes Ayat</Paragraph>
          </Button>
          <Button
            contentStyle={{ justifyContent: 'flex-start' }}
            style={{ marginBottom: 5 }}
            uppercase={false}
            icon="trophy"
            color="pink"
            mode="contained"
            onPress={() => navigation.navigate('Sambung Ayat')}>
            <Paragraph>Sambung Ayat</Paragraph>
          </Button>
          <Button
            contentStyle={{ justifyContent: 'flex-start', marginBottom: 5 }}
            uppercase={false}
            icon="trophy"
            color="pink"
            mode="contained"
            onPress={() => navigation.navigate('Melengkapi Ayat')}>
            <Paragraph>Melengkapi Ayat</Paragraph>
          </Button>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Paragraph style={{ fontWeight: 'bold', color: 'gray' }}>
            Pemahaman
          </Paragraph>
          <Divider style={{ marginBottom: 5 }} />
          <Button
            contentStyle={{ justifyContent: 'flex-start' }}
            uppercase={false}
            icon="link"
            color="lightgray"
            mode="contained"
            onPress={() => navigation.navigate('Pendalaman Ayat')}>
            <Paragraph>Pendalaman Ayat</Paragraph>
          </Button>
        </View>
        <View style={{ marginBottom: 20 }}></View>
      </ScrollView>
    </View>
  );
};

export default Beranda;
