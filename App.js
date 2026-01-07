import { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, FlatList } from 'react-native';
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
  }

  return (
    <View style={styles.appContainer}>
      {/* Giriş Alanı */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder="Hedefini yaz..." 
          onChangeText={taskInputHandler}
          value={enteredTaskText}
        />
        <Button title="Ekle" onPress={addTaskHandler} />
      </View>

      {/* Liste Alanı - FlatList Burada */}
      <View style={styles.listContainer}>
        <FlatList
          data={tasks}
          renderItem={(itemData) => {
            // itemData.item bizim veri objemizdir { id: ..., text: ... }
            return <TodoItem text={itemData.item.text} />;
          }}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Henüz görev yok. Bir tane ekle!</Text>
          }
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
    fontSize: 16,
  },
  // Liste için yeni stiller:
  listContainer: {
    flex: 5, // Listeye girdiden daha fazla alan ver
    marginTop: 10, // Biraz boşluk bırakalım
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic', // Biraz stil katalım
  },
});