import {
  Alert,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../components/common/Title";
import { generateRandomNumbers } from "../../utils/generateNumber";
import NumberContainer from "../../components/page/GameScreen/NumberContainer";
import Button from "../../components/common/Button";
import { Ionicons } from "@expo/vector-icons";

interface GameScreenProps {
  userNumber: number;
  gameOver: () => void;
  increaseUserCount: () => void;
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({
  userNumber,
  gameOver,
  increaseUserCount,
}: GameScreenProps) {
  const initialGuess = generateRandomNumbers(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const { width, height } = useWindowDimensions();

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

    increaseUserCount();

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

  let content = (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.buttonsContainerWide}>
        <Text>Higher or lower?</Text>
        <View>
          <Button onPress={() => nextGuessHandler("greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </Button>
          <Button onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </Button>
        </View>
      </View>
      <Text>LOG ROUNDS</Text>
    </View>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.container}>
          <View style={styles.buttonsContainerWide}>
            <Button onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </Button>
            <Button onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </Button>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignContent: "center",
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
