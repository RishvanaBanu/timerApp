import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { IconButton } from 'react-native-paper'; // i have installed this npm for ui

interface TimerProps {
  index: number;
  onRemove: (index: number) => void;
}

const Timer: React.FC<TimerProps> = ({ index, onRemove }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0); // Total time in seconds
  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    console.log(interval);

    if (isActive && totalTime > 0) {
      interval = setInterval(() => {
        setTotalTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval!);
            Alert.alert(`${name} Timer finished!`);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, totalTime]);

  const startTimer = () => {
    if (totalTime > 0) {
      setIsActive(true); // Resume if the timer is already set
    } else {
      const total = parseInt(minutes) * 60 + parseInt(seconds);
      if (total > 0) {
        setTotalTime(total);
        setIsActive(true);
      } else {
        Alert.alert('Please set a valid time.');
      }
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTotalTime(0);
    setMinutes('00');
    setSeconds('00');
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <View style={styles.timerContainer}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.timerText}>{formatTime(totalTime)}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder='Enter timer name'
          value={name}
          onChangeText={setName}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Minutes'
            keyboardType='numeric'
            value={minutes}
            onChangeText={setMinutes}
          />
          <Text>Minutes</Text>
          <TextInput
            style={styles.input}
            placeholder='Seconds'
            keyboardType='numeric'
            value={seconds}
            onChangeText={setSeconds}
          />
          <Text>Seconds</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton icon='play' size={20} onPress={startTimer} />
        <IconButton icon='pause' size={20} onPress={pauseTimer} />
        <IconButton icon='reload' size={20} onPress={resetTimer} />
        <IconButton icon='delete' size={20} onPress={() => onRemove(index)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    // padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    borderRadius: 5,
  },
  timerText: {
    fontSize: 34,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  nameText: {
    fontSize: 14,
    margin: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginVertical: 10,
    textAlign: 'center',
    width: '80%',
    borderRadius: 10,
    marginHorizontal: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginVertical: 10,
    textAlign: 'center',
    width: '30%',
    borderRadius: 10,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default Timer;
