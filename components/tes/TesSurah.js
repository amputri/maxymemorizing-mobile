import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  globalLink,
  language,
  wordFields,
  link,
} from '../../assets/axios/Link';
import { Divider, Avatar } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';

const Surah = () => {
  const [id, setIdSurah] = useState(Math.floor(Math.random() * 114) + 1);
  const [surah, setSurah] = useState([]);
  const [visual, setVisual] = useState([]);
  const [surahInfo, setSurahInfo] = useState([]);

  const [visibleNomor, setVisibleNomor] = useState(false);
  const [visibleArti, setVisibleArti] = useState(false);
  const [visibleJumlahAyat, setVisibleJumlahAyat] = useState(false);
  const [visibleTempatTurun, setVisibleTempatTurun] = useState(false);

  const [nomor, setNomor] = useState('nomor');
  const [arti, setArti] = useState('arti');
  const [jumlahAyat, setJumlahAyat] = useState('...');
  const [tempatTurun, setTempatTurun] = useState('...');

  const [jawaban, setJawaban] = useState(false);

  useEffect(() => {
    fetchSurah();
  }, []);

  useEffect(() => {
    getVisual();
    fetchSurahInfo();
    setNomor('nomor');
    setArti('arti');
    setJumlahAyat('...');
    setTempatTurun('...');
    setJawaban(false); // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    nomor === id &&
    arti === surah[id - 1]?.translated_name.name &&
    jumlahAyat === surah[id - 1]?.verses_count &&
    tempatTurun === surah[id - 1]?.revelation_place
      ? setJawaban(true)
      : setJawaban(false); // eslint-disable-next-line
  }, [nomor, arti, jumlahAyat, tempatTurun]);

  async function fetchSurah() {
    const res = await globalLink.get(`/chapters?language=${language}`);
    setSurah(res.data.chapters);
    console.log('surah');
  }

  async function fetchSurahInfo() {
    const res = await globalLink.get(
      `/chapters/${id}/info?language=${language}`
    );
    setSurahInfo(res.data.chapter_info);
    console.log('surah info');
  }

  async function getVisual() {
    const res = await link.get('surah/' + id);
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
        {visual.kata_kunci ? (
          <Text style={{ fontWeight: 'bold' }}>{visual.kata_kunci}</Text>
        ) : null}
        <View
          style={{
            paddingVertical: 3,
            paddingHorizontal: 5,
            backgroundColor: 'lightblue',
            borderRadius: 5,
            shadowRadius: 3,
          }}>
          <Text onPress={() => setVisibleNomor(true)}>{nomor}</Text>
        </View>
        <Text>{surah[id - 1]?.name_simple}</Text>
      </View>
      <Divider />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: visual.gambar && jawaban ? null : 'center',
            }}>
            <Image
              style={{
                flex: visual.gambar && jawaban ? 1 : null,
                height:
                  visual.gambar && jawaban
                    ? Dimensions.get('window').width
                    : 100,
                width: visual.gambar && jawaban ? null : 170,
                margin: visual.gambar && jawaban ? null : 10,
              }}
              source={
                visual.gambar && jawaban
                  ? {
                      uri: visual.gambar,
                    }
                  : require('../../assets/logo.png')
              }
            />
          </View>
          <Divider />
          <View style={{ backgroundColor: 'bisque', paddingHorizontal: 10 }}>
            <RenderHtml source={{ html: jawaban ? visual.narasi : null }} />
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>
              {surah[id - 1]?.name_arabic}
            </Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <View
              style={{
                paddingVertical: 3,
                paddingHorizontal: 5,
                backgroundColor: 'lightblue',
                borderRadius: 5,
                shadowRadius: 3,
              }}>
              <Text onPress={() => setVisibleArti(true)}>{arti}</Text>
            </View>
            <Text style={{ paddingHorizontal: 10 }}>-</Text>
            <View
              style={{
                paddingVertical: 3,
                paddingHorizontal: 5,
                backgroundColor: 'lightblue',
                borderRadius: 5,
                shadowRadius: 3,
              }}>
              <Text onPress={() => setVisibleJumlahAyat(true)}>
                {jumlahAyat} ayat
              </Text>
            </View>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text style={{ paddingHorizontal: 5 }}>
              diturunkan ke-{surah[id - 1]?.revelation_order} - golongan surah
            </Text>
            <View
              style={{
                paddingVertical: 3,
                paddingHorizontal: 5,
                backgroundColor: 'lightblue',
                borderRadius: 5,
                shadowRadius: 3,
              }}>
              <Text onPress={() => setVisibleTempatTurun(true)}>
                {tempatTurun}
              </Text>
            </View>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'column',
              padding: 10,
            }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              Kandungan
            </Text>
            <View style={{ marginBottom: 10 }}>
              <RenderHtml source={{ html: jawaban ? visual.uraian : null }} />
            </View>
            <Divider />
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
              Uraian Singkat
            </Text>
            <View style={{ marginBottom: 10 }}>
              <RenderHtml
                source={{ html: jawaban ? surahInfo.short_text : null }}
              />
            </View>
            <Divider />
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Uraian</Text>
            <View style={{ marginBottom: 10 }}>
              <RenderHtml source={{ html: jawaban ? surahInfo.text : null }} />
            </View>
            <Divider />
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
              Sumber Uraian
            </Text>
            <Text style={{ marginBottom: 10, fontStyle: 'italic' }}>
              {jawaban ? surahInfo.source : null}
            </Text>
          </View>
        </ScrollView>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          marginHorizontal: 10,
          backgroundColor: 'purple',
          borderRadius: 5,
        }}>
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 5 }}
          onPress={() => setIdSurah(Math.floor(Math.random() * 114) + 1)}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Selanjutnya / Lompati
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={visibleNomor}
        onRequestClose={() => {
          setVisibleNomor(false);
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
            <Text style={{ fontWeight: 'bold' }}>Pilih Nomor Surah</Text>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              {[...Array(114)].map((x, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    paddingVertical: 5,
                    paddingStart: 5,
                    marginBottom: 5,
                    backgroundColor: 'bisque',
                  }}
                  onPress={() => {
                    setNomor(i + 1);
                    setVisibleNomor(false);
                  }}>
                  <Text>Urutan ke-{i + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={visibleArti}
        onRequestClose={() => {
          setVisibleArti(false);
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
            <Text style={{ fontWeight: 'bold' }}>Pilih Arti Surah</Text>
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
                    setArti(x.translated_name.name);
                    setVisibleArti(false);
                  }}>
                  <Text>{x.translated_name.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={visibleJumlahAyat}
        onRequestClose={() => {
          setVisibleJumlahAyat(false);
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
            <Text style={{ fontWeight: 'bold' }}>Pilih Jumlah Ayat Surah</Text>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              {[...Array(286)].map((x, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    paddingVertical: 5,
                    paddingStart: 5,
                    marginBottom: 5,
                    backgroundColor: 'bisque',
                  }}
                  onPress={() => {
                    setJumlahAyat(i + 1);
                    setVisibleJumlahAyat(false);
                  }}>
                  <Text>{i + 1} ayat</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={visibleTempatTurun}
        onRequestClose={() => {
          setVisibleTempatTurun(false);
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
            <Text style={{ fontWeight: 'bold' }}>Pilih Tempat Turun Surah</Text>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingStart: 5,
                  marginBottom: 5,
                  backgroundColor: 'bisque',
                }}
                onPress={() => {
                  setTempatTurun('makkah');
                  setVisibleTempatTurun(false);
                }}>
                <Text>makkah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingStart: 5,
                  marginBottom: 5,
                  backgroundColor: 'bisque',
                }}
                onPress={() => {
                  setTempatTurun('madinah');
                  setVisibleTempatTurun(false);
                }}>
                <Text>madinah</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Surah;
