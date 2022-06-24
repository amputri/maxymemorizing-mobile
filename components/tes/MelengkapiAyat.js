import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { globalLink, wordFields } from '../../assets/axios/Link';
import { Divider, Avatar } from 'react-native-paper';

const MelengkapiAyat = ({ route, navigation }) => {
  const { halaman, surah } = route.params;
  const [page, setPage] = useState([]);
  const [halamanPage, setHalamanPage] = useState(halaman);

  const [tampil, setTampil] = useState('');
  const [klik, setKlik] = useState('');

  useEffect(() => {
    fetchPage();
    setOptionTampil();
    setKlik(''); // eslint-disable-next-line
  }, [halamanPage]);

  function setOptionTampil() {
    var temp;
    for (var i = 1; i <= 15; i++) {
      temp = `${temp}:${i}/${Math.floor(Math.random() * 4) + 1}:`;
      temp = `${temp}:${i}/${Math.floor(Math.random() * 8) + 5}:`;
      temp = `${temp}:${i}/${Math.floor(Math.random() * 12) + 9}:`;
      temp = `${temp}:${i}/${Math.floor(Math.random() * 16) + 13}:`;
      temp = `${temp}:${i}/${Math.floor(Math.random() * 20) + 17}:`;
      temp = `${temp}:${i}/${Math.floor(Math.random() * 24) + 21}:`;
      temp = `${temp}:${i}/${Math.floor(Math.random() * 28) + 25}:`;
      temp = `${temp}:${i}/${Math.floor(Math.random() * 32) + 29}:`;
    }
    setTampil(temp);
  }

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
        <Text>
          {parseInt(page[0]?.verse_key.split(':')[0])}.{' '}
          {surah[parseInt(page[0]?.verse_key.split(':')[0]) - 1]?.name_simple}
        </Text>
        <Text>
          {parseInt(halamanPage) - (page[0]?.juz_number * 20 - 20 + 1)}
        </Text>
        <Text>Juz {page[0]?.juz_number}</Text>
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
              ((halamanPage === 1 || halamanPage === 187) &&
                i === 0 &&
                index === 0 &&
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
                  }}>
                  سورۃ{'  '}
                  {
                    surah[parseInt(value.verse_key.split(':')[0]) - 1]
                      ?.name_arabic
                  }
                </Text>
              ) : val.line_number === i + 2 &&
                value.verse_number === 1 &&
                ind === 0 ? (
                <Text
                  key={`${i}-${index}-${ind}`}
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontWeight: 'bold',
                    paddingBottom: 1,
                    paddingHorizontal: 1,
                    fontSize: 16,
                    fontFamily: 'Amiri-Bold',
                  }}>
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم
                </Text>
              ) : val.line_number === i + 1 ? (
                val.char_type_name === 'end' ? (
                  <Text
                    key={`${i}-${index}-${ind}`}
                    style={{
                      color: 'black',
                      fontFamily: 'Amiri-Regular',
                      paddingBottom: 1,
                      fontSize: 16,
                    }}>
                    {'(' + val.text_uthmani + ')'}
                  </Text>
                ) : (
                  <Text
                    key={`${i}-${index}-${ind}`}
                    onPress={() =>
                      !klik.includes(`:${val.line_number}/${val.position}:`) &&
                      tampil.includes(`:${val.line_number}/${val.position}:`)
                        ? setKlik(`${klik}:${val.line_number}/${val.position}:`)
                        : null
                    }
                    style={{
                      color:
                        !tampil.includes(
                          `:${val.line_number}/${val.position}:`
                        ) ||
                        klik.includes(`:${val.line_number}/${val.position}:`)
                          ? 'black'
                          : 'transparent',
                      fontFamily: 'Amiri-Regular',
                      paddingBottom: 1,
                      paddingHorizontal: 1,
                      fontSize: 16,
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
        <Text
          onPress={() =>
            halamanPage < 604 ? setHalamanPage(halamanPage + 1) : null
          }>
          <Avatar.Icon size={32} icon="arrow-left" />
        </Text>
        <Text
          onPress={() =>
            halamanPage > 1 ? setHalamanPage(halamanPage - 1) : null
          }>
          <Avatar.Icon size={32} icon="arrow-right" />
        </Text>
      </View>
    </View>
  );
};

export default MelengkapiAyat;
