import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
return (
<SafeAreaView style={styles.appContainer}>
<View style={styles.contentContainer}>
<Text style={styles.title}>Yapılacaklar Listem</Text>
{/* Giriş alanı buraya gelecek */ }
{/* Liste alanı buraya gelecek */ }
</View>
</SafeAreaView>
);
}
const styles = StyleSheet.create({
appContainer: {
flex: 1,
backgroundColor: '#f0f2f5', // Açık gri arka plan
},
contentContainer: {
flex: 1,
padding: 20,
paddingTop: 40,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
textAlign: 'center'
},
});