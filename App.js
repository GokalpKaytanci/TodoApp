import { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';

export default function App() {
  // 2. State'i Başlatın
  // Metin girdisi için state
  const [enteredTaskText, setEnteredTaskText] = useState('');
  // Görevler listesi için state
  const [tasks, setTasks] = useState([]);

  // 3. İşleyici Fonksiyonlar
  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function addTaskHandler() {
    // Temel doğrulama: Boş ise ekleme yapma
    if (enteredTaskText.trim().length === 0) {
      return;
    }

    // Yeni görevi görevler dizisine ekle
    // Önceki state'i alıp (currentTasks) yeni diziyi oluşturuyoruz
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Math.random().toString(), text: enteredTaskText },
    ]);

    // Giriş alanını temizle
    setEnteredTaskText('');
  }
    return (
    <View style={styles.appContainer}>
      {/* --- GİRİŞ JSX'İ BAŞLANGIÇ --- */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder="Hedefini yaz..." 
          // 1. Yazılan her harfi yakalayıp state'e atıyoruz:
          onChangeText={taskInputHandler}
          // 2. Input'un değerini state'ten almasını sağlıyoruz (Kontrollü Bileşen):
          value={enteredTaskText}
        />
        {/* 3. Butona tıklandığında ekleme fonksiyonunu tetikliyoruz: */}
        <Button title="Ekle" onPress={addTaskHandler} />
      </View>
      {/* --- GİRİŞ JSX'İ BİTİŞ --- */}

      <View style={styles.goalsContainer}>
        <Text>Görevler burada listelenecek...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row', // Elemanları (Input ve Buton) yan yana dizer
    justifyContent: 'space-between', // Aralarındaki boşluğu ayarlar
    alignItems: 'center', // Dikey olarak ortalar
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  textInput: {
    flex: 1, // Yanındaki butonu iterek kalan tüm boşluğu kaplar
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6, // Köşeleri hafif yuvarlar
    marginRight: 10, // Buton ile arasına boşluk koyar
    fontSize: 16,
  },
  goalsContainer: {
    flex: 5, // Ekranın geri kalan büyük kısmını listeye ayırır
  },
});