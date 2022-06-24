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

const Ayat = ({ navigation }) => {
  const [surah, setSurah] = useState([]);
  const [ayat, setAyat] = useState([]);
  const [page, setPage] = useState([]);
  const [id, setIdSurah] = useState(1);
  const [nomor, setNomorAyat] = useState(1);
  const [visual, setVisual] = useState([]);
  const [materi, setMateri] = useState([]);

  const [visibleSurah, setVisibleSurah] = useState(false);
  const [visibleAyat, setVisibleAyat] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);

  useEffect(() => {
    fetchSurah(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchAyat();
    getVisual();
    fetchMateri(); // eslint-disable-next-line
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

  async function fetchMateri() {
    const res = await link.get(`materi/ayat/${id}:${nomor}`);
    setMateri(res.data);
    console.log('materi');
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
          justifyContent: 'space-between',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <Text
          onPress={() =>
            nomor < surah[id - 1].verses_count ? setNomorAyat(nomor + 1) : null
          }>
          <Avatar.Icon size={32} icon="arrow-left" />
        </Text>
        <Text onPress={() => playSound(audioLink + ayat.audio?.url)}>
          <Avatar.Icon size={32} icon="volume-high" />
        </Text>
        <Text onPress={() => setVisibleAyat(true)}>
          <Avatar.Icon size={32} icon="magnify" />
        </Text>
        <Text onPress={() => setVisibleInfo(true)}>
          <Avatar.Icon size={32} icon="information-variant" />
        </Text>
        <Text onPress={() => (nomor > 1 ? setNomorAyat(nomor - 1) : null)}>
          <Avatar.Icon size={32} icon="arrow-right" />
        </Text>
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
        visible={visibleAyat}
        onRequestClose={() => {
          setVisibleAyat(false);
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
            <Text style={{ fontWeight: 'bold' }}>Pilih Ayat</Text>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              {[...Array(surah[id - 1]?.verses_count)].map((x, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    paddingVertical: 5,
                    paddingStart: 5,
                    marginBottom: 5,
                    backgroundColor: 'bisque',
                  }}
                  onPress={() => {
                    setNomorAyat(i + 1);
                    setVisibleAyat(false);
                  }}>
                  <Text>{i + 1}</Text>
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
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginBottom: 10,
                  paddingVertical: 5,
                  backgroundColor: 'lightblue',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontWeight: 'bold' }}>Materi Terkait</Text>
              </View>
              <View style={{ paddingBottom: 20 }}>
                {materi.map((x, i) => (
                  <View
                    key={i}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      marginBottom: 5,
                      backgroundColor: 'bisque',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        paddingBottom: 5,
                      }}>
                      {x.urutan}. {x.judul}
                    </Text>
                    <Divider />
                    <View>
                      <RenderHtml source={{ html: x.materi }} />
                    </View>
                    <Text
                      style={{ fontSize: 12, color: 'blue' }}
                      onPress={() => {
                        setVisibleInfo(false);
                        navigation.navigate('Materi', {
                          pokok:
                            x.pokok === 1
                              ? 'Aqidah'
                              : x.pokok === 2
                              ? 'Ibadah'
                              : x.pokok === 3
                              ? 'Muamalah'
                              : 'Akhlaq',
                          kategori: x.kategori,
                          tema: {
                            id: x.id_tema,
                            urutan: x.urutan_tema,
                            judul: x.judul_tema,
                            gambar: x.gambar,
                            referensi: x.referensi,
                          },
                        });
                      }}>
                      Baca Lengkap Materi
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Ayat;
