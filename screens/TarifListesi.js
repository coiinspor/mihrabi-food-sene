import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import recipes from '../data/tarifler';
  
export default function TarifListesi({ route, navigation, toggleFavorite, favoriteIds }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  
  // QR koddan gelen filtreyi yakalıyoruz
  const qrCategory = route.params?.qrCategory;

  useEffect(() => {
    if (qrCategory) {
      // Eğer QR koddan bir kategori geldiyse seçili kategoriyi o yapıyoruz
      setSelectedCategory(qrCategory);
    }
  }, [qrCategory]);

  const categories = ['Tümü', ...new Set(recipes.map(r => r.category).filter(Boolean))];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const renderRecipe = ({ item }) => {
    const isFavorite = favoriteIds.includes(item.id);
    
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('TarifDetay', {
            name: item.name,
            duration: item.duration,
            ingredients: item.ingredients,
            instructions: item.instructions,
            id: item.id,
            toggleFavorite: toggleFavorite,
            isFavorite: isFavorite,
          })
        }
      >
        <View style={styles.cardInner}>
          <View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.durationBadge}>
              <Ionicons name="time-outline" size={14} color="#5D4037" />
              <Text style={styles.cardDuration}>{item.duration} dk</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Efsane Yemek Menüsü</Text>

      {/* QR Filtre Bilgilendirmesi */}
      {qrCategory && selectedCategory === qrCategory && (
        <View style={styles.qrAlertBox}>
          <Text style={styles.qrAlertText}>🚀 QR Kod ile "{qrCategory}" menüsü getirildi.</Text>
          <TouchableOpacity 
            onPress={() => {
              setSelectedCategory('Tümü');
              navigation.setParams({ qrCategory: undefined }); // QR filtresini sıfırla
            }}
          >
            <Text style={styles.clearQrText}>Temizle</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#795548" style={{ marginLeft: 10 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="aradığın efsane yemekler..."
          placeholderTextColor="#795548"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          )) }
        </ScrollView>
      </View>

      <FlatList
        data={recipes.filter((r) => {
          const matchName = r.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchCategory = selectedCategory === 'Tümü' || r.category?.toLowerCase() === selectedCategory?.toLowerCase();
          return matchName && matchCategory;
        })}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF9800" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDE7', paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#3E2723', textAlign: 'center', marginBottom: 15 },
  qrAlertBox: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF9C4', marginHorizontal: 15, padding: 10, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#FF9800' },
  qrAlertText: { color: '#E65100', fontWeight: '600' },
  clearQrText: { color: '#795548', fontWeight: 'bold', decorationLine: 'underline' },
  card: { backgroundColor: '#FFF9C4', marginBottom: 10, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#FFEE58' },
  cardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#4E342E', marginBottom: 4 },
  durationBadge: { flexDirection: 'row', alignItems: 'center' },
  cardDuration: { fontSize: 14, color: '#5D4037', marginLeft: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 15, height: 45, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#FBC02D' },
  searchInput: { flex: 1, paddingHorizontal: 10, fontSize: 16, color: '#3E2723' },
  categoryContainer: { marginBottom: 15 },
  categoryScroll: { paddingHorizontal: 15 },
  categoryBtn: { paddingHorizontal: 15, paddingVertical: 8, backgroundColor: '#FFF', marginRight: 8, borderRadius: 20, borderWidth: 1, borderColor: '#FBC02D' },
  categoryBtnActive: { backgroundColor: '#FBC02D' },
  categoryText: { color: '#5D4037', fontSize: 14 },
  categoryTextActive: { color: '#FFF', fontWeight: 'bold' }
});