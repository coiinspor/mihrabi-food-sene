import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function QrOkuyucu({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Kamera izni sorgulanıyor...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Kamerayı kullanmak için izin vermelisiniz.</Text>
                <Button title="İzin Ver" onPress={requestPermission} color="#27AE60" />
            </View>
        );
    }

    const handleBarcodeScanned = ({ data }) => {
        if (scanned || !data) return;
        setScanned(true);

        const qrIcerik = data.trim();

        Alert.alert(
            'Menü Algılandı',
            `"${qrIcerik}" kategorisine ait menü yükleniyor...`,
            [
                {
                    text: 'Menüyü Gör',
                    onPress: () => {
                        setScanned(false);
                        // QR koddan okunan metni (Örn: "Çorbalar", "Tatlılar" veya "Tümü") 
                        // parametre olarak Tarifler listesine gönderiyoruz.
                        navigation.navigate('Tarifler', {
                            screen: 'TarifListesi',
                            params: { qrCategory: qrIcerik }
                        });
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>Menüyü Açmak İçin QR Kodu Taratın</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9f9' },
    loadingText: { color: '#7f8c8d', fontSize: 16 },
    text: { fontSize: 16, color: '#1a2530', marginBottom: 16, textAlign: 'center', paddingHorizontal: 20 },
    overlay: { position: 'absolute', bottom: 120, backgroundColor: 'rgba(0, 0, 0, 0.7)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
    overlayText: { color: '#ffffff', fontSize: 15, fontWeight: '500' },
});