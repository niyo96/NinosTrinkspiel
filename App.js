import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const App = () => {
  // state to store the players
  const [players, setPlayers] = useState([]);

  // state to store the current player being added
  const [currentPlayer, setCurrentPlayer] = useState('');

  // function to handle adding a player
  const addPlayer = () => {
    setPlayers([...players, currentPlayer]);
    setCurrentPlayer('');
  };

  // function to handle removing a player
  const removePlayer = (index) => {
    setPlayers(players.filter((player, i) => i !== index));
  };

  // function to start the game
  const startGame = () => {
    // your code to start the game goes here
  };

  return (
      <View>
        <Text>Add Players:</Text>
        <TextInput
            value={currentPlayer}
            onChangeText={setCurrentPlayer}
        />
        <Button onPress={addPlayer} title="Add Player" />
        {players.map((player, index) => (
            <View key={index}>
              <Text>{player}</Text>
              <Button onPress={() => removePlayer(index)} title="Remove Player" />
            </View>
        ))}
        <Button
            onPress={startGame}
            title="Start Game"
            disabled={players.length < 2}
        />
      </View>
  );
};

export default App;
