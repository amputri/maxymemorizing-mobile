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
  const [id, setIdSurah] = useState(1);
  const [surah, setSurah] = useState([]);
  const [visual, setVisual] = useState([]);
  const [surahInfo, setSurahInfo] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchSurah();
  }, []);

  useEffect(() => {
    getVisual();
    fetchSurahInfo(); // eslint-disable-next-line
  }, [id]);

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
        <Text>{id}</Text>
        <View
          style={{
            paddingVertical: 3,
            paddingHorizontal: 5,
            backgroundColor: 'lightblue',
            borderRadius: 5,
            shadowRadius: 3,
          }}>
          <Text onPress={() => setVisible(true)}>
            {surah[id - 1]?.name_simple}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: visual.gambar ? null : 'center',
            }}>
            <Image
              style={{
                flex: visual.gambar ? 1 : null,
                height: visual.gambar ? Dimensions.get('window').width : 100,
                width: visual.gambar ? null : 170,
                margin: visual.gambar ? null : 10,
              }}
              source={
                visual.gambar
                  ? {
                      uri: visual.gambar,
                    }
                  : require('../../assets/logo.png')
              }
            />
          </View>
          <Divider />
          <View style={{ backgroundColor: 'bisque', paddingHorizontal: 10 }}>
            <RenderHtml source={{ html: visual.narasi }} />
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
            <Text>
              {surah[id - 1]?.translated_name.name} -{' '}
              {surah[id - 1]?.verses_count} ayat
            </Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text>
              diturunkan ke-{surah[id - 1]?.revelation_order} - golongan surah{' '}
              {surah[id - 1]?.revelation_place}
            </Text>
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
              <RenderHtml source={{ html: visual.uraian }} />
            </View>
            <Divider />
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
              Uraian Singkat
            </Text>
            <View style={{ marginBottom: 10 }}>
              <RenderHtml source={{ html: surahInfo.short_text }} />
            </View>
            <Divider />
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Uraian</Text>
            <View style={{ marginBottom: 10 }}>
              <RenderHtml source={{ html: surahInfo.text }} />
            </View>
            <Divider />
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
              Sumber Uraian
            </Text>
            <Text style={{ marginBottom: 10, fontStyle: 'italic' }}>
              {surahInfo.source}
            </Text>
          </View>
        </ScrollView>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <Text onPress={() => (id < 114 ? setIdSurah(id + 1) : null)}>
          <Avatar.Icon size={32} icon="arrow-left" />
        </Text>
        <Text onPress={() => (id > 1 ? setIdSurah(id - 1) : null)}>
          <Avatar.Icon size={32} icon="arrow-right" />
        </Text>
      </View>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
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
                    setVisible(false);
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
    </View>
  );
};

export default Surah;
