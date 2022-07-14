import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Divider, Card, Avatar } from 'react-native-paper';
import { link } from '../../assets/axios/Link';

const Pendalaman = ({ navigation }) => {
  const [pokok, setPokok] = useState('Aqidah');
  const [kategori, setKategori] = useState('Pilih Kategori');

  const [temaData, setTemaData] = useState([]);
  const [kategoriData, setKategoriData] = useState([]);

  const [idPokok, setIdPokok] = useState(1);
  const [idKategori, setIdKategori] = useState(0);

  const [visiblePokok, setVisiblePokok] = useState(false);
  const [visibleKategori, setVisibleKategori] = useState(false);

  useEffect(() => {
    fetchTema(); // eslint-disable-next-line
  }, [idKategori]);

  useEffect(() => {
    fetchKategori();
    setKategori('Pilih Kategori');
    setIdKategori(0); // eslint-disable-next-line
  }, [idPokok]);

  async function fetchKategori() {
    const res = await link.get(`kategori/${idPokok}`);
    setKategoriData(res.data);
    console.log('kategori');
  }

  async function fetchTema() {
    const res = await link.get(`tema/${idKategori}`);
    setTemaData(res.data);
    console.log('tema');
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'black', paddingBottom: 10 }}>Pilih Pokok Materi :</Text>
        <TouchableOpacity
          style={{
            marginBottom: 20,
            padding: 5,
            backgroundColor: 'lightblue',
            borderRadius: 3,
            shadowRadius: 2,
          }}
          onPress={() => setVisiblePokok(true)}>
          <Text style={{ color: 'black' }}>{pokok}</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', paddingBottom: 10 }}>Pilih Kategori :</Text>
        <TouchableOpacity
          style={{
            marginBottom: 20,
            padding: 5,
            backgroundColor: 'lightblue',
            borderRadius: 3,
            shadowRadius: 2,
          }}
          onPress={() => setVisibleKategori(true)}>
          <Text style={{ color: 'black' }}>{kategori}</Text>
        </TouchableOpacity>
        <Divider />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: 'black', textAlign: 'center' }}>Daftar Tema</Text>
        </View>
        <ScrollView>
          {temaData.map((value, index) => (
            <View key={index} style={{ margin: 20 }}>
              <Card>
                <Card.Content>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() =>
                    navigation.navigate('Materi', {
                      pokok: pokok,
                      kategori: kategori,
                      tema: value,
                    })
                  }>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                        {value.urutan}
                        {'. '}
                      </Text>
                      <Text style={{ fontSize: 12, color: 'black' }}>{value.judul}</Text>
                    </View>
                    <View style={{ marginStart: 20 }}>
                      <Text>
                        <Avatar.Icon size={30} icon="arrow-right" />
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Card.Content>
              </Card>
            </View>
          ))}
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        visible={visibleKategori}
        onRequestClose={() => {
          setVisibleKategori(false);
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
              Pilih Kategori
            </Text>
            <TouchableOpacity onPress={() => setVisibleKategori(false)}>
              <Avatar.Icon size={32} icon="close" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              {kategoriData.map((x, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    paddingVertical: 5,
                    paddingStart: 5,
                    marginBottom: 5,
                    backgroundColor: 'bisque',
                  }}
                  onPress={() => {
                    setIdKategori(x.id);
                    setKategori(x.kategori);
                    setVisibleKategori(false);
                  }}>
                  <Text style={{ color: 'black' }}>
                    {x.urutan}. {x.kategori}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={visiblePokok}
        onRequestClose={() => {
          setVisiblePokok(false);
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
              Pilih Pokok Materi
            </Text>
            <TouchableOpacity onPress={() => setVisiblePokok(false)}>
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
                  setIdPokok(1);
                  setPokok('Aqidah');
                  setVisiblePokok(false);
                }}>
                <Text style={{ color: 'black' }}>Aqidah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingStart: 5,
                  marginBottom: 5,
                  backgroundColor: 'bisque',
                }}
                onPress={() => {
                  setIdPokok(2);
                  setPokok('Ibadah');
                  setVisiblePokok(false);
                }}>
                <Text style={{ color: 'black' }}>Ibadah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingStart: 5,
                  marginBottom: 5,
                  backgroundColor: 'bisque',
                }}
                onPress={() => {
                  setIdPokok(3);
                  setPokok('Muamalah');
                  setVisiblePokok(false);
                }}>
                <Text style={{ color: 'black' }}>Muamalah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 5,
                  paddingStart: 5,
                  marginBottom: 5,
                  backgroundColor: 'bisque',
                }}
                onPress={() => {
                  setIdPokok(4);
                  setPokok('Akhlaq');
                  setVisiblePokok(false);
                }}>
                <Text style={{ color: 'black' }}>Akhlaq</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Pendalaman;
