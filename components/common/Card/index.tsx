import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <View style={styles.card}>{children}</View>;
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    padding: deviceWidth < 380 ? 12 : 24,
    backgroundColor: Colors.primary700,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
});
