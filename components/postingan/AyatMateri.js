import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  link,
  globalLink,
  language,
  wordFields,
  translations,
  reciter,
  audioLink,
} from '../../assets/axios/Link';
import { Divider, Avatar } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import SoundPlayer from 'react-native-sound-player';

const AyatMateri = ({ route, navigation }) => {
  const [surah, setSurah] = useState([]);
  const [ayat, setAyat] = useState([]);
  const [page, setPage] = useState([]);
  const [visual, setVisual] = useState([]);
  const [visibleInfo, setVisibleInfo] = useState(false);

  useEffect(() => {
    fetchSurah(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchAyat();
    getVisual(); // eslint-disable-next-line
  }, [route]);

  async function fetchSurah() {
    const res = await globalLink.get(`/chapters?language=${language}`);
    setSurah(res.data.chapters);
    console.log('surah');
  }

  async function fetchAyat() {
    const res = await globalLink.get(
      `/verses/by_key/${route.params?.key}?language=${language}&words=true&translations=${translations}&audio=${reciter}&word_fields=${wordFields}`
    );
    setAyat(res.data.verse);

    res.data.verse.page_number !== page[0]?.page_number ||
    page[0]?.page_number === undefined
      ? fetchPage(res.data.verse.page_number)
      : null;

    console.log('ayat');
  }

  async function fetchPage(page) {
    const res = await globalLink.get(
      `/verses/by_page/${page}?words=true&word_fields=${wordFields}`
    );

    setPage(res.data.verses);
    console.log('page');
  }

  async function getVisual() {
    const res = await link.get(`ayat/${route.params?.key}`);
    setVisual(res.data);
    console.log('visual');
  }

  function playSound(uri) {
    try {
      SoundPlayer.playUrl(uri);
    } catch (e) {
      console.log('cannot play the song file', e);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            paddingVertical: 3,
            paddingHorizontal: 5,
            backgroundColor: 'lightblue',
            borderRadius: 5,
            shadowRadius: 3,
          }}>
          <Text>
            {route.params?.key.split(':')[0]}.{' '}
            {surah[route.params?.key.split(':')[0] - 1]?.name_simple}
          </Text>
        </View>
        <Text>{ayat.page_number - (ayat.juz_number * 20 - 20 + 1)}</Text>
        <Text>Juz {ayat.juz_number}</Text>
      </View>
      <Divider />
      <ImageBackground
        source={{ uri: visual.gambar }}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.4 }}>
        {[...Array(15)].map((x, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              backgroundColor: visual.gambar ? null : 'bisque',
              paddingHorizontal: 10,
              justifyContent: ayat.page_number > 2 ? 'space-between' : 'center',
              borderRightWidth: ayat.page_number % 2 === 1 ? 5 : null,
              borderRightColor: ayat.page_number % 2 === 1 ? 'burlywood' : null,
              borderLeftWidth: ayat.page_number % 2 === 0 ? 5 : null,
              borderLeftColor: ayat.page_number % 2 === 0 ? 'burlywood' : null,
            }}>
            {page.map((value, index) =>
              value.words?.map((val, ind) =>
                val.line_number === i + 1 ? (
                  val.char_type_name === 'end' ? (
                    <Text
                      key={`${i}-${index}-${ind}`}
                      style={{
                        color:
                          value.verse_key === ayat.verse_key
                            ? 'black'
                            : 'lightgray',
                        paddingBottom: 1,
                        fontSize: 16,
                        fontFamily:
                          value.verse_key === ayat.verse_key
                            ? 'Amiri-Bold'
                            : 'Amiri-Regular',
                      }}>
                      {'(' + val.text_uthmani + ')'}
                    </Text>
                  ) : (
                    <Text
                      key={`${i}-${index}-${ind}`}
                      style={{
                        color:
                          value.verse_key === ayat.verse_key
                            ? 'black'
                            : 'lightgray',
                        paddingBottom: 1,
                        paddingHorizontal: 1,
                        fontSize: 16,
                        fontFamily:
                          value.verse_key === ayat.verse_key
                            ? 'Amiri-Bold'
                            : 'Amiri-Regular',
                      }}>
                      {val.text_uthmani}
                    </Text>
                  )
                ) : null
              )
            )}
          </View>
        ))}
      </ImageBackground>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{ marginEnd: 20 }}
          onPress={() => playSound(audioLink + ayat.audio?.url)}>
          <Avatar.Icon size={32} icon="volume-high" />
        </Text>
        <Text onPress={() => setVisibleInfo(true)}>
          <Avatar.Icon size={32} icon="information-variant" />
        </Text>
      </View>
      <Modal
        animationType="slide"
        visible={visibleInfo}
        onRequestClose={() => {
          setVisibleInfo(false);
        }}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: 'lightblue',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>
              {surah[route.params?.key.split(':')[0] - 1]?.name_simple} ayat{' '}
              {route.params?.key.split(':')[1]}
            </Text>
            <Text onPress={() => setVisibleInfo(false)}>
              <Avatar.Icon size={32} icon="close" />
            </Text>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <View>
                <Text style={{ fontWeight: 'bold' }}>Arti per Kata</Text>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row-reverse',
                    flexWrap: 'wrap',
                  }}>
                  {ayat.words?.map((value, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'column',
                        padding: 5,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{ fontFamily: 'Amiri-Regular', fontSize: 16 }}>
                        {value.text_uthmani}
                      </Text>
                      <Text>{value.translation.text}</Text>
                    </View>
                  ))}
                  <View></View>
                </View>
                <Divider />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Terjemah</Text>
                {ayat.translations?.map((value, index) => (
                  <View key={index} style={{ marginVertical: 10 }}>
                    <RenderHtml source={{ html: value.text }} />
                  </View>
                ))}
                <Divider />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default AyatMateri;
