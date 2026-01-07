import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function TodoItem({ text, id, onDelete }) {
  return (
    
      <Pressable
        // id'yi geri göndererek silme fonksiyonunu tetikliyoruz
        onPress={() => onDelete(id)}
        // Basıldığında stili dinamik olarak değiştiriyoruz
        style={({ pressed }) => [
          styles.taskItem,
          pressed && styles.pressedItem, // Eğer basılıysa pressedItem stilini de ekle
        ]}
      >
        <Text style={styles.taskText}>{text}</Text>
      </Pressable>
    
  );
}

const styles = StyleSheet.create({
  taskItem: {
    marginVertical: 5,
    backgroundColor: 'white', // Arka planın beyaz olması önemli, yoksa opaklık değişimi belli olmaz
    padding: 15,
    borderRadius: 8,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pressedItem: {
    opacity: 0.5, // Basıldığında öğeyi şeffaflaştır
    backgroundColor: '#dddddd', // İstersen arka plan rengini de hafif koyulaştırabilirsin
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
});