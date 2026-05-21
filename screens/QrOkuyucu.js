import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function QrOkuyucu({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    // 1. Kamera izni yükleniyorsa
    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Kamera izni sorgulanıyor...</Text>
            </View>
        );
    }

    // 2. Kamera izni verilmediyse
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Kamerayı kullanmak için izin vermelisiniz.</Text>
                <Button title="İzin Ver" onPress={requestPermission} color="#27AE60" />
            </View>
        );
    }

    // 3. QR Kod tarandığında çalışan fonksiyon
    const handleBarcodeScanned = ({ data }) => {
        if (scanned || !data) return;
        setScanned(true);

        const qrIcerik = data.trim();
        
        // Gelen verinin bir web sitesi linki olup olmadığını kontrol ediyoruz
        const isUrl = qrIcerik.startsWith('http://') || qrIcerik.startsWith('https://');

        Alert.alert(
            'QR Kod Algılandı',
            isUrl ? `Bu web adresine gitmek istiyor musunuz?\n\n${qrIcerik}` : `"${qrIcerik}" kategorisine ait menü yükleniyor...`,
            [
                {
                    text: isUrl ? 'Sitede Aç' : 'Menüyü Gör',
                    onPress: async () => {
                        // Yeni taramalara izin vermek için durumu sıfırlıyoruz
                        setScanned(false);
                        
                        if (isUrl) {
                            // EĞER QR İÇERİĞİ HTTP/HTTPS LİNKİYSE: Telefonun tarayıcısını açar
                            const supported = await Linking.canOpenURL(qrIcerik);
                            if (supported) {
                                await Linking.openURL(qrIcerik);
                            } else {
                                Alert.alert('Hata', 'Bu link telefonunuz tarafından açılamadı.');
                            }
                        } else {
                            // EĞER DÜZ METİNSE: Uygulama içindeki sayfaya yönlendirir
                            navigation.navigate('Tarifler', {
                                screen: 'TarifListesi',
                                params: { qrCategory: qrIcerik }
                            });
                        }
                    }
                },
                {
                    text: 'İptal',
                    style: 'cancel',
                    onPress: () => setScanned(false) // İptal edilirse kamerayı tekrar aktif et
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
                // Sadece QR kod odaklı çalışması için filtre ekledik:
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            />
            {/* Kamera üzerindeki görsel katman */}
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>Menüyü Açmak İçin QR Kodu Taratın</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f8f9f9' 
    },
    loadingText: { 
        color: '#7f8c8d', 
        fontSize: 16 
    },
    text: { 
        fontSize: 16, 
        color: '#1a2530', 
        marginBottom: 16, 
        textAlign: 'center', 
        paddingHorizontal: 20 
    },
    overlay: { 
        position: 'absolute', 
        bottom: 120, 
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        borderRadius: 8 
    },
    overlayText: { 
        color: '#ffffff', 
        fontSize: 15, 
        fontWeight: '500' 
    },
});
