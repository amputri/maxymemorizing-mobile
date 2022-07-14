import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalLink, language } from '../assets/axios/Link';

const List = ({ route, navigation }) => {
  const [juz, setJuz] = useState([]);
  const [surah, setSurah] = useState([]);

  useEffect(() => {
    fetchJuz();
    fetchSurah();
  }, []);

  const nextRoute =
    route.name === 'Sambung Ayat'
      ? 'Sambung'
      : route.name === 'Melengkapi Ayat'
        ? 'Melengkapi'
        : 'Baca';

  async function fetchJuz() {
    const res = await globalLink.get(`/juzs`);
    setJuz(res.data.juzs);
    console.log('juz');
  }

  async function fetchSurah() {
    const res = await globalLink.get(`/chapters?language=${language}`);
    setSurah(res.data.chapters);
    console.log('surah');
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {juz.map((val, index) => (
          <View key={index}>
            <TouchableOpacity
              key={index}
              style={{
                paddingVertical: 10,
                paddingStart: 10,
                backgroundColor: 'bisque',
              }}
              onPress={() =>
                navigation.navigate(nextRoute, {
                  halaman:
                    val.juz_number === 1 ? 1 : 2 + 20 * (val.juz_number - 1),
                  surah: surah,
                })
              }>
              <Text style={{ color: 'black' }}>Juz {val.juz_number}</Text>
            </TouchableOpacity>
            {Object.keys(val.verse_mapping).map((key) =>
              val.verse_mapping[key].split('-')[0] === '1' ? (
                <TouchableOpacity
                  key={`surah-${key}`}
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: 'burlywood',
                    flexDirection: 'row',
                    alignItems: 'center',
                    fontSize: 12,
                  }}
                  onPress={() =>
                    navigation.navigate(nextRoute, {
                      halaman: surah[key - 1]?.pages[0],
                      surah: surah,
                    })
                  }>
                  <View style={{ width: 35 }}>
                    <Text style={{ textAlign: 'right', color: 'black' }}>{key}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>
                      {surah[key - 1]?.name_simple}
                    </Text>
                    <Text style={{ fontSize: 11, color: 'black' }}>
                      {surah[key - 1]?.translated_name.name} -{' '}
                      {surah[key - 1]?.verses_count} Ayat
                    </Text>
                  </View>
                  <View style={{ width: 25 }}>
                    <Text style={{ color: 'black' }}>
                      {`${parseInt(surah[key - 1]?.pages[0]) -
                        (val.juz_number * 20 - 20 + 1)}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default List;
