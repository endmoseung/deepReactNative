import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/common/Title";
import { generateRandomNumbers } from "../../utils/generateNumber";
import NumberContainer from "../../components/page/GameScreen/NumberContainer";
import Button from "../../components/common/Button";

interface GameScreenProps {
  userNumber: number;
  gameOver: () => void;
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, gameOver }: GameScreenProps) {
  const initialGuess = generateRandomNumbers(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      gameOver();
    }
  }, [currentGuess, userNumber, gameOver]);

  const nextGuessHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess - 1;
    }
    if (direction === "greater") {
      minBoundary = currentGuess + 1;
    }

    const randomNumber = generateRandomNumbers(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(randomNumber);
  };
  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <Button onPress={() => nextGuessHandler("greater")}>+</Button>
          <Button onPress={() => nextGuessHandler("lower")}>-</Button>
        </View>
      </View>
      <Text>LOG ROUNDS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
