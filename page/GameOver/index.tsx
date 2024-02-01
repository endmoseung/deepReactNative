import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Title from "../../components/common/Title";
import Colors from "../../constants/colors";
import Button from "../../components/common/Button";

interface GameOverProps {
  userCount: number;
  userNumber: string;
  onGameRestart: () => void;
}

export default function GameOver({
  userCount,
  userNumber,
  onGameRestart,
}: GameOverProps) {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if (width < 380) imageSize = 150;
  if (height < 400) {
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <View>
          <Title>GameOver</Title>
          <View style={[styles.imageContainer, imageStyle]}>
            <Image
              style={styles.image}
              source={require("../../assets/images/success.png")}
            />
          </View>
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{userCount}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <Button onPress={onGameRestart}>Start New Game</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },

  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
