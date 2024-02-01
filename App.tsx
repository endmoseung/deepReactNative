import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import StartGame from "./page/StartGame";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./page/GameScreen";
import Colors from "./constants/colors";
import GameOver from "./page/GameOver";

export default function App() {
  const [userNumber, setUserNumber] = useState<string>();

  const [isGameOver, setIsGameOver] = useState(true);

  const pickedNumberHandler = (pickedNumber: string) => {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  };

  let screen = <StartGame onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen
        gameOver={() => setIsGameOver(true)}
        userNumber={Number(userNumber)}
      />
    );
  }

  if (isGameOver && userNumber) {
    screen = <GameOver />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary800, Colors.accent500]}
      style={styles.rootContainer}
    >
      <ImageBackground
        style={styles.rootContainer}
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        imageStyle={styles.imageBackground}
      >
        <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  imageBackground: {
    opacity: 0.5,
  },
});
