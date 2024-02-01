import React, { useState } from "react";
import styled from "@emotion/native";
import { Pressable, View } from "react-native";
import Colors from "../../../constants/colors";

interface ButtonProps {
  color?: string;
  backgroundColor?: string;
  children: React.ReactNode;
  onPress?: () => void;
}

export default function Button({
  children,
  color,
  backgroundColor,
  onPress,
}: ButtonProps) {
  const pressHandler = () => {
    onPress && onPress();
    console.log("pressed");
  };

  const [pressed, setPressed] = useState(false);

  console.log(pressed);
  return (
    <ButtonContainer>
      <ButtonInnerContainer
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        backgroundColor={backgroundColor}
        android_ripple={{ color: Colors.primary500 }}
        onPress={pressHandler}
        pressed={pressed}
      >
        <Text color={color}>{children}</Text>
      </ButtonInnerContainer>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.View`
  margin: 4px;
  border-radius: 50px;
  overflow: hidden;
`;

const ButtonInnerContainer = styled.Pressable<{
  backgroundColor?: string;
  pressed: boolean;
}>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || `${Colors.primary500}`};
  padding: 16px;
  opacity: ${({ pressed }) => (pressed ? "0.75" : "1")};
`;

const Text = styled.Text<{ color?: string }>`
  color: ${({ color }) => color || "white"};
  text-align: center;
`;
