import { useState } from 'react';
// 1. Gerekli kütüphaneleri ekliyoruz:
import { 
  StyleSheet, 
  View, 
  Button, 
  TextInput, 
  Text, 
  FlatList, 
  Keyboard, // Klavyeyi kapatmak için
  KeyboardAvoidingView, // Klavyeden kaçınmak için
  Platform // iOS/Android ayrımı için
} from 'react-native';
import TodoItem from './components/TodoItem';

export default function App() {
  const [enteredTaskText, setEnteredTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function addTaskHandler() {
    if (enteredTaskText.trim().length === 0) {
      return;
    }
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Math.random().toString(), text: enteredTaskText },
    ]);
    setEnteredTaskText('');
    
    // 2. Görev eklendikten sonra klavyeyi otomatik kapatıyoruz:
    Keyboard.dismiss(); 
  }

  function deleteTaskHandler(id) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== id);
    });
  }

  return (
    // 3. Ana kapsayıcı ve KeyboardAvoidingView Yapısı
    <View style={styles.appContainer}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        // iOS için 'padding', Android için 'height' davranışı genellikle en iyi sonucu verir
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.appTitle}>Yapılacaklar Listem</Text>
          
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Hedefini yaz..." 
              onChangeText={taskInputHandler}
              value={enteredTaskText}
            />
            <Button title="Ekle" onPress={addTaskHandler} />
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={tasks}
              renderItem={(itemData) => {
                return (
                  <TodoItem 
                    text={itemData.item.text} 
                    id={itemData.item.id} 
                    onDelete={deleteTaskHandler} 
                  />
                );
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Henüz görev yok. Bir tane ekle!</Text>
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Arka plan rengini biraz yumuşattık
  },
  // KeyboardAvoidingView'in tüm alanı kaplaması için flex: 1 şarttır
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60, // Üstten biraz daha fazla boşluk
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    // borderBottom kaldırıp input'u daha bağımsız hale getirdik (isteğe bağlı tasarım tercihi)
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: 'white', // Input arka planı beyaz olsun
  },
  listContainer: {
    flex: 1, // listContainer kalan alanı doldurmalı
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});