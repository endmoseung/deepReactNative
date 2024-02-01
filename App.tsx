import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import StartGame from "./page/StartGame";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./page/GameScreen";
import Colors from "./constants/colors";
import GameOver from "./page/GameOver";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState<string>();

  const [userCount, setUserCount] = useState(0);

  const [isGameOver, setIsGameOver] = useState(true);

  const pickedNumberHandler = (pickedNumber: string) => {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  };

  const handleGameRestart = () => {
    setIsGameOver(true);
    setUserNumber(undefined);
    setUserCount(0);
  };

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  let screen = <StartGame onPickNumber={pickedNumberHandler} />;

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (userNumber) {
    screen = (
      <GameScreen
        increaseUserCount={() => setUserCount(userCount + 1)}
        gameOver={() => setIsGameOver(true)}
        userNumber={Number(userNumber)}
      />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOver
        userNumber={userNumber}
        onGameRestart={handleGameRestart}
        userCount={userCount}
      />
    );
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
