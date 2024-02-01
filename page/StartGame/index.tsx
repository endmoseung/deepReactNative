import React, { useState } from "react";

import styled from "@emotion/native";
import Button from "../../components/common/Button";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Colors from "../../constants/colors";
import Title from "../../components/common/Title";
import Card from "../../components/common/Card";

interface StartGameProps {
  onPickNumber: (pickedNumber: string) => void;
}

export default function StartGame({ onPickNumber }: StartGameProps) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  const handleInput = (text: string) => {
    setEnteredNumber(text);
  };

  const resetInput = () => {
    setEnteredNumber("");
  };

  const handleConfirmButton = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInput }]
      );
      return;
    }

    onPickNumber(enteredNumber);
  };

  const marginTop = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <Text style={styles.instructionText}>Enter a Number</Text>
            <TextInput
              onChangeText={handleInput}
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
            />
            <ButtonContainer>
              <Button onPress={handleConfirmButton} backgroundColor="#72063c">
                confirm
              </Button>
              <Button onPress={resetInput} backgroundColor={Colors.primary500}>
                reset
              </Button>
            </ButtonContainer>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  rootContainer: {
    flex: 1,
    alignItems: "center",
  },

  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const Input = styled.TextInput`
  padding: 16px;
  height: 50px;
  width: 50px;
  font-size: 32px;
  border-bottom-color: ${Colors.accent500};
  border-bottom-width: 2px;
  color: ${Colors.accent500};
  text-align: center;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  gap: 16px;
`;
