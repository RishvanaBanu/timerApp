import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Timer from './src/components/timer';
import { FAB } from 'react-native-paper';
const App = () => {
  const [timers, setTimers] = useState<number[]>([]);

  const addTimer = () => {
    console.log('pressed');
    if (timers.length < 5) {
      setTimers([...timers, timers.length]);
    } else {
      alert('You can only have 5 timers.');
    }
  };

  const removeTimer = (index: number) => {
    setTimers(timers.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {timers.map((_, index) => (
          <Timer key={index} index={index} onRemove={removeTimer} />
        ))}
      </ScrollView>
      <FAB icon='plus' style={styles.fab} onPress={addTimer} />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
