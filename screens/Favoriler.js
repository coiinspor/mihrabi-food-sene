import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import recipes from '../data/tarifler';

export default function Favoriler({ route }) {
  const { favoriteIds } = route.params || { favoriteIds: [] };

  const favoriteRecipes = recipes.filter(
    (recipe) => favoriteIds.includes(recipe.id)
  );

  const renderFavorite = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInner}>
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={14} color="#5D4037" />
            <Text style={styles.cardDuration}>{item.duration} dk</Text>
          </View>
        </View>
        <Ionicons name="heart" size={24} color="#FF9800" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Favoriler</Text>
      
      {favoriteRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={50} color="#FBC02D" />
          <Text style={styles.emptyTitle}>Henüz favori yok</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E2723',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF9C4',
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEE58',
  },
  cardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 5,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDuration: {
    fontSize: 14,
    color: '#5D4037',
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    color: '#795548',
    marginTop: 10,
  },
});
