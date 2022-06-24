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

const TesAyat = ({ navigation }) => {
  const [surah, setSurah] = useState([]);
  const [ayat, setAyat] = useState([]);
  const [page, setPage] = useState([]);
  const [id, setIdSurah] = useState(1);
  const [nomor, setNomorAyat] = useState(1);
  const [visual, setVisual] = useState([]);

  const [visibleSurah, setVisibleSurah] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);

  const [jawaban, setJawaban] = useState(false);

  useEffect(() => {
    fetchSurah(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchAyat();
    getVisual();
    setJawaban(false); // eslint-disable-next-line
  }, [id, nomor]);

  async function fetchSurah() {
    const res = await globalLink.get(`/chapters?language=${language}`);
    setSurah(res.data.chapters);
    console.log('surah');
  }

  async function fetchAyat() {
    const res = await globalLink.get(
      `/verses/by_key/${id}:${nomor}?language=${language}&words=true&translations=${translations}&audio=${reciter}&word_fields=${wordFields}`
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
    const res = await link.get(`ayat/${id}:${nomor}`);
    setVisual(res.data);
    console.log('visual');
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
          <Text onPress={() => setVisibleSurah(true)}>
            {id}. {surah[id - 1]?.name_simple}
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
              borderBottomWidth: !jawaban ? 1 : null,
              borderBottomColor: 'burlywood',
            }}>
            {page.map((value, index) =>
              value.words?.map((val, ind) =>
                val.line_number === i + 1 ? (
                  val.char_type_name === 'end' ? (
                    <Text
                      key={`${i}-${index}-${ind}`}
                      style={{
                        color: jawaban
                          ? value.verse_key === ayat.verse_key
                            ? 'black'
                            : 'lightgray'
                          : 'transparent',
                        paddingBottom: 1,
                        fontSize: 16,
                        fontFamily:
                          jawaban && value.verse_key === ayat.verse_key
                            ? 'Amiri-Bold'
                            : 'Amiri-Regular',
                      }}>
                      {'(' + val.text_uthmani + ')'}
                    </Text>
                  ) : (
                    <Text
                      key={`${i}-${index}-${ind}`}
                      onPress={() =>
                        !jawaban && value.verse_key === ayat.verse_key
                          ? setJawaban(true)
                          : null
                      }
                      style={{
                        color: jawaban
                          ? value.verse_key === ayat.verse_key
                            ? 'black'
                            : 'lightgray'
                          : 'transparent',
                        paddingBottom: 1,
                        paddingHorizontal: 1,
                        fontSize: 16,
                        fontFamily:
                          jawaban && value.verse_key === ayat.verse_key
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
          justifyContent: 'space-between',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flex: 1,
            marginVertical: 5,
            marginHorizontal: 10,
            backgroundColor: 'blue',
            borderRadius: 5,
          }}>
          <TouchableOpacity
            style={{ paddingVertical: 5 }}
            onPress={() => setVisibleInfo(true)}>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Detail Ayat
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: 5,
            marginHorizontal: 10,
            backgroundColor: 'blue',
            borderRadius: 5,
          }}>
          <TouchableOpacity
            style={{ paddingVertical: 5 }}
            onPress={() =>
              setNomorAyat(
                Math.floor(Math.random() * surah[id - 1]?.verses_count) + 1
              )
            }>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Selanjutnya
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={visibleSurah}
        onRequestClose={() => {
          setVisibleSurah(false);
        }}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: 10,
              paddingVertical: 5,
              backgroundColor: 'lightblue',
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>Pilih Surah</Text>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              {surah.map((x, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    paddingVertical: 5,
                    paddingStart: 5,
                    marginBottom: 5,
                    backgroundColor: 'bisque',
                  }}
                  onPress={() => {
                    setIdSurah(i + 1);
                    setNomorAyat(1);
                    setVisibleSurah(false);
                  }}>
                  <Text>
                    {i + 1}. {surah[i].name_simple}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
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
              {surah[id - 1]?.name_simple} ayat {nomor}
            </Text>
            <Text onPress={() => setVisibleInfo(false)}>
              <Avatar.Icon size={32} icon="close" />
            </Text>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              {jawaban ? (
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
              ) : null}
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Terjemah</Text>
                {ayat.translations?.map((value, index) => (
                  <Text key={index} style={{ marginVertical: 10 }}>{value.text}</Text>
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

export default TesAyat;
