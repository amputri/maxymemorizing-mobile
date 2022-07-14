import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalLink, wordFields } from '../assets/axios/Link';
import { Divider, Avatar } from 'react-native-paper';

const Baca = ({ route, navigation }) => {
  const { halaman, surah } = route.params;
  const [page, setPage] = useState([]);
  const [halamanPage, setHalamanPage] = useState(halaman);

  useEffect(() => {
    fetchPage(); // eslint-disable-next-line
  }, [halamanPage]);

  async function fetchPage() {
    const res = await globalLink.get(
      `/verses/by_page/${halamanPage}?words=true&word_fields=${wordFields}`
    );
    setPage(res.data.verses);
    console.log('page');
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
        <Text style={{ color: 'black' }}>
          {`${parseInt(page[0]?.verse_key.split(':')[0])}`}.{' '}
          {`${surah[parseInt(page[0]?.verse_key.split(':')[0]) - 1]?.name_simple}`}
        </Text>
        <Text style={{ color: 'black' }}>
          {`${parseInt(halamanPage) - (page[0]?.juz_number * 20 - 20 + 1)}`}
        </Text>
        <Text style={{ color: 'black' }}>Juz {page[0]?.juz_number}</Text>
      </View>
      <Divider />
      {[...Array(15)].map((x, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            backgroundColor: 'bisque',
            paddingHorizontal: 10,
            justifyContent: halamanPage > 2 ? 'space-evenly' : 'center',
            alignItems: 'center',
            borderRightWidth: halamanPage % 2 === 1 ? 5 : null,
            borderRightColor: halamanPage % 2 === 1 ? 'burlywood' : null,
            borderLeftWidth: halamanPage % 2 === 0 ? 5 : null,
            borderLeftColor: halamanPage % 2 === 0 ? 'burlywood' : null,
            borderBottomWidth: 1,
            borderBottomColor: 'burlywood',
          }}>
          {page.map((value, index) =>
            value.words.map((val, ind) =>
              (val.line_number === i + 3 &&
                value.verse_number === 1 &&
                ind === 0) ||
              (i === 14 &&
                index === 0 &&
                ind === 0 &&
                val.line_number === i + 1) ? (
                <Text
                  key={`${i}-${index}-${ind}`}
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    paddingBottom: 1,
                    paddingHorizontal: 1,
                    fontSize: 16,
                    fontFamily: 'Amiri-Bold',
                    color: 'black',
                  }}>
                  سورۃ{'  '}
                  {
                    `${surah[parseInt(value.verse_key.split(':')[0]) - 1]
                      ?.name_arabic}`
                  }
                </Text>
              ) : val.line_number === i + 2 &&
                value.verse_number === 1 &&
                ind === 0 && halamanPage !== 1 && halamanPage !== 9 ? (
                <Text
                  key={`${i}-${index}-${ind}`}
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    paddingBottom: 1,
                    paddingHorizontal: 1,
                    fontSize: 16,
                    fontFamily: 'Amiri-Bold',
                    color: 'black',
                  }}>
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم
                </Text>
              ) : val.line_number === i + 1 ? (
                val.char_type_name === 'end' ? (
                  <Text
                    key={`${i}-${index}-${ind}`}
                    style={{
                      fontFamily: 'Amiri-Regular',
                      paddingBottom: 1,
                      fontSize: 16,
                      color: 'black',
                    }}>
                    {'(' + val.text_uthmani + ')'}
                  </Text>
                ) : (
                  <Text
                    key={`${i}-${index}-${ind}`}
                    style={{
                      fontFamily: 'Amiri-Regular',
                      paddingBottom: 1,
                      paddingHorizontal: 1,
                      fontSize: 16,
                      color: 'black',
                    }}>
                    {val.text_uthmani}
                  </Text>
                )
              ) : null
            )
          )}
        </View>
      ))}
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            halamanPage < 604 ? setHalamanPage(halamanPage + 1) : null
          }>
          <Avatar.Icon size={32} icon="arrow-left" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            halamanPage > 1 ? setHalamanPage(halamanPage - 1) : null
          }>
          <Avatar.Icon size={32} icon="arrow-right" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Baca;
