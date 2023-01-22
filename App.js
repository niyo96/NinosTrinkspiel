import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';

const App = () => {
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [showQuestion, setShowQuestion] = useState(false);
    const [questions, setQuestions] = useState([]);

    const addPlayer = (name) => {
        if(players.indexOf(name)){
            setPlayers([...players, name]);
        }
        setPlayerName('');
    }

    const removePlayer = (name) => {
        setPlayers(players.filter(player => player !== name));
    }

    const startGame = async () => {
        if (players.length >= 2) {
            const quest = await getQuestions();
            setQuestions(quest);
            setPlayer1(players[Math.floor(Math.random() * players.length)]);
            setPlayer2(players[Math.floor(Math.random() * players.length)]);
            setShowQuestion(true);
        }
    }

    const nextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        let player1 = Math.floor(Math.random() * players.length);
        let player2 = Math.floor(Math.random() * players.length);
        while(player1 === player2){
            player2 = Math.floor(Math.random() * players.length);
        }
        setPlayer1(players[player1]);
        setPlayer2(players[player2]);
    }

    async function getQuestions() {
        try {
            const response = await fetch('http://api.fingern-dastrinkspiel.de/api/Questions');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    const resetGame = () => {
        setPlayers([]);
        setCurrentQuestion(0);
        setPlayer1(null);
        setPlayer2(null);
        setShowQuestion(false);
        setPlayerName('');
    }

    return (
        <View style={styles.container}>
            {!showQuestion && (
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter player name"
                        value={playerName}
                        onChangeText={name => setPlayerName(name)}
                    />
                    <FlatList
                        data={players}
                        renderItem={({ item }) => (
                            <View style={styles.playerContainer}>
                                <Text onPress={() => removePlayer(item)} style={styles.player}>{item}</Text>

                            </View>
                        )}
                        keyExtractor={item => item}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Add Player"
                            onPress={() => addPlayer(playerName)}
                            disabled={playerName === ''}
                        />
                        <Button
                            title="Start game"
                            onPress={startGame}
                            disabled={players.length < 2}
                        />
                    </View>
                </View>
            )}
            {showQuestion && (
                <View style={styles.gameContainer}>

                    <Text style={styles.player}>{player1} & {player2}</Text>
                    <Text style={styles.question}>{questions[currentQuestion]}</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Next question"
                            onPress={nextQuestion}
                        />
                        <Button
                            color="red"
                            title="New Game"
                            onPress={resetGame}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        padding: 10,
    },
    gameContainer: {
        width: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '80%',
      flexDirection: "row",
      marginHorizontal: 20,
      justifyContent: "space-around",
    },
    player: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    question: {
        fontSize: 16,
        marginBottom: 20,
    },
});


export default App;
