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
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{visual.kata_kunci}</Text>
        ) : null}
        <TouchableOpacity
          onPress={() => setVisibleNomor(true)}
          style={{
            paddingVertical: 3,
            paddingHorizontal: 10,
            backgroundColor: 'lightblue',
            borderRadius: 5,
            shadowRadius: 3,
          }}>
          <Text style={{ color: 'black' }}>{nomor}</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black' }}>{surah[id - 1]?.name_simple}</Text>
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
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
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
            <TouchableOpacity
              onPress={() => setVisibleArti(true)}
              style={{
                paddingVertical: 3,
                paddingHorizontal: 10,
                backgroundColor: 'lightblue',
                borderRadius: 5,
                shadowRadius: 3,
              }}>
              <Text style={{ color: 'black' }}>{arti}</Text>
            </TouchableOpacity>
            <Text style={{ paddingHorizontal: 10, color: 'black' }}>-</Text>
            <TouchableOpacity
              onPress={() => setVisibleJumlahAyat(true)}
              style={{
                paddingVertical: 3,
                paddingHorizontal: 10,
                backgroundColor: 'lightblue',
                borderRadius: 5,
                shadowRadius: 3,
              }}>
              <Text style={{ color: 'black' }}>
                {jumlahAyat} ayat
              </Text>
            </TouchableOpacity>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text style={{ paddingHorizontal: 5, color: 'black' }}>
              diturunkan ke-{surah[id - 1]?.revelation_order} - golongan surah
            </Text>
            <TouchableOpacity
              onPress={() => setVisibleTempatTurun(true)}
              style={{
                paddingVertical: 3,
                paddingHorizontal: 10,
                backgroundColor: 'lightblue',
                borderRadius: 5,
                shadowRadius: 3,
              }}>
              <Text style={{ color: 'black' }}>
                {tempatTurun}
              </Text>
            </TouchableOpacity>
          </View>
          <Divider />
          {
            jawaban ? (
              <View
                style={{
                  flexDirection: 'column',
                  padding: 10,
                }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10, color: 'black' }}>
                  Kandungan
                </Text>
                <View style={{ marginBottom: 10 }}>
                  <RenderHtml source={{ html: jawaban ? visual.uraian : null }} />
                </View>
                <Divider />
                <Text style={{ fontWeight: 'bold', marginTop: 10, color: 'black' }}>
                  Uraian Singkat
                </Text>
                <View style={{ marginBottom: 10 }}>
                  <RenderHtml
                    source={{ html: jawaban ? surahInfo.short_text : null }}
                  />
                </View>
                <Divider />
                <Text style={{ fontWeight: 'bold', marginTop: 10, color: 'black' }}>Uraian</Text>
                <View style={{ marginBottom: 10 }}>
                  <RenderHtml source={{ html: jawaban ? surahInfo.text : null }} />
                </View>
                <Divider />
                <Text style={{ fontWeight: 'bold', marginTop: 10, color: 'black' }}>
                  Sumber Uraian
                </Text>
                <Text style={{ marginBottom: 10, fontStyle: 'italic', color: 'black' }}>
                  {jawaban ? surahInfo.source : null}
                </Text>
              </View>
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10 }}>
                <Text style={{ color: 'deeppink', textAlign: 'center', fontStyle: 'italic' }}>Pilih nomor, arti, jumlah ayat, dan golongan surah dengan benar untuk menampilkan gambar dan urian surah..</Text>
              </View>
            )
          }
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
              margin: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: 'lightblue',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              Pilih Nomor Surah
            </Text>
            <TouchableOpacity onPress={() => setVisibleNomor(false)}>
              <Avatar.Icon size={32} icon="close" />
            </TouchableOpacity>
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
                  <Text style={{ color: 'black' }}>Urutan ke-{i + 1}</Text>
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
              margin: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: 'lightblue',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              Pilih Arti Surah
            </Text>
            <TouchableOpacity onPress={() => setVisibleArti(false)}>
              <Avatar.Icon size={32} icon="close" />
            </TouchableOpacity>
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
                  <Text style={{ color: 'black' }}>{x.translated_name.name}</Text>
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
              margin: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: 'lightblue',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              Pilih Jumlah Ayat Surah
            </Text>
            <TouchableOpacity onPress={() => setVisibleJumlahAyat(false)}>
              <Avatar.Icon size={32} icon="close" />
            </TouchableOpacity>
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
                  <Text style={{ color: 'black' }}>{i + 1} ayat</Text>
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
              margin: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: 'lightblue',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              Pilih Golongan Surah
            </Text>
            <TouchableOpacity onPress={() => setVisibleTempatTurun(false)}>
              <Avatar.Icon size={32} icon="close" />
            </TouchableOpacity>
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
                <Text style={{ color: 'black' }}>makkah</Text>
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
                <Text style={{ color: 'black' }}>madinah</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Surah;
