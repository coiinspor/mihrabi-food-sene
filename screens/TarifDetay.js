import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TarifDetay({ route, navigation }) {
  const { name, duration, ingredients, instructions, id, toggleFavorite, isFavorite } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        <View style={styles.heroSection}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#3E2723" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.durationBadge}>
              <Ionicons name="time-outline" size={16} color="#5D4037" />
              <Text style={styles.duration}>{duration} dk</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={[
              styles.favoriteBtn,
              isFavorite ? styles.favoriteBtnActive : null,
            ]}
            onPress={() => {
              toggleFavorite(id);
              navigation.goBack();
            }}
          >
            <Ionicons name={isFavorite ? "heart-dislike" : "heart"} size={20} color="#FFF" style={{marginRight: 8}} />
            <Text style={styles.favoriteBtnText}>
              {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Malzemeler:</Text>
            <View style={styles.ingredientsCard}>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yapılışı:</Text>
            <View style={styles.instructionsCard}>
              <Text style={styles.instructionsText}>{instructions}</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFDE7',
  },
  container: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#FBC02D',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#F57F17',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    fontSize: 16,
    color: '#3E2723',
    marginLeft: 5,
  },
  heroContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 5,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 16,
    color: '#5D4037',
    marginLeft: 5,
  },
  contentContainer: {
    padding: 20,
  },
  favoriteBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  favoriteBtnActive: {
    backgroundColor: '#9E9E9E',
  },
  favoriteBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4E342E',
  },
  ingredientsCard: {
    backgroundColor: '#FFF9C4',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEE58',
  },
  ingredientRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#F57F17',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#5D4037',
  },
  instructionsCard: {
    backgroundColor: '#FFF9C4',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEE58',
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#5D4037',
  },
});
