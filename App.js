import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import TarifListesi from './screens/TarifListesi';
import TarifDetay from './screens/TarifDetay';
import Favoriler from './screens/Favoriler';
import QrOkuyucu from './screens/QrOkuyucu';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  function RecipesStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TarifListesi">
          {(props) => (
            <TarifListesi
              {...props}
              toggleFavorite={toggleFavorite}
              favoriteIds={favoriteIds}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TarifDetay">
          {(props) => <TarifDetay {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FF9700',
          tabBarInactiveTintColor: '#795548',
          tabBarStyle: {
            backgroundColor: '#FFF9C4',
            borderTopWidth: 1,
            borderColor: '#FBC02D',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Tarifler') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (route.name === 'Favoriler') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'QR Okuyucu') {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Tarifler" component={RecipesStack} />
        
        <Tab.Screen
          name="Favoriler"
          options={{
            tabBarBadge: favoriteIds.length > 0 ? favoriteIds.length : null,
            tabBarBadgeStyle: { backgroundColor: '#FF9800', color: '#FFF' },
          }}
        >
          {(props) => (
            <Favoriler
              {...props}
              route={{
                ...props.route,
                params: { favoriteIds: favoriteIds },
              }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="QR Okuyucu" component={QrOkuyucu} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
