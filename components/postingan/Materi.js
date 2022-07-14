import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { link } from '../../assets/axios/Link';
import { Divider } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';

const Materi = ({ route, navigation }) => {
  const { pokok, kategori, tema } = route.params;
  const [materi, setMateri] = useState([]);

  useEffect(() => {
    fetchMateri(); // eslint-disable-next-line
  }, []);

  async function fetchMateri() {
    const res = await link.get(`materi/${tema.id}`);
    setMateri(res.data);
    console.log('materi');
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Text style={{ color: 'black' }}>{pokok}</Text>
          <Divider />
          <Text style={{ color: 'black' }}>{kategori}</Text>
          <Divider />
          <Text style={{ fontWeight: 'bold', color: 'black' }}>
            {tema.urutan}
            {'. '}
            {tema.judul}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: tema.gambar ? null : 'center',
          }}>
          <Image
            style={{
              flex: tema.gambar ? 1 : null,
              height: tema.gambar ? Dimensions.get('window').width : 100,
              width: tema.gambar ? null : 170,
              margin: tema.gambar ? null : 10,
            }}
            source={
              tema.gambar
                ? { uri: tema.gambar }
                : require('../../assets/logo.png')
            }
          />
        </View>
        <Divider />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'column',
              padding: 10,
            }}>
            {materi.map((value, index) => (
              <View key={index}>
                <Text style={{ fontWeight: 'bold', marginVertical: 10, color: 'black' }}>
                  {value.urutan}
                  {'. '}
                  {value.judul}
                </Text>
                <View style={{ marginBottom: 10 }}>
                  <RenderHtml source={{ html: value.materi }} />
                  {value.materi.split('[QS ').map((x, i) =>
                    i > 0 ? (
                      <TouchableOpacity onPress={() =>
                        navigation.navigate('Ayat Materi', {
                          key: x.split(']')[0],
                        })
                      }>
                        <Text
                          key={`${index}-${i}`}
                          style={{
                            paddingVertical: 3,
                            marginBottom: 5,
                            paddingStart: 5,
                            backgroundColor: 'bisque',
                            color: 'blue'
                          }}>
                          {"Lihat Qur'an Surah"} {x.split(']')[0]}
                        </Text>
                      </TouchableOpacity>
                    ) : null
                  )}
                </View>
                <Divider />
              </View>
            ))}
            <Text style={{ fontWeight: 'bold', marginTop: 10, color: 'black' }}>
              Sumber Uraian
            </Text>
            <View style={{ marginBottom: 10 }}>
              <RenderHtml source={{ html: tema.referensi }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Materi;
