import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

type PulseProps = {
  size?: number;
  color?: string;
};

const usePulseAnimation = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.6,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale]);

  return scale;
};

const Pulse: React.FC<PulseProps> = React.memo(
  ({ size = 30, color = "rgba(0,122,255,0.3)" }) => {
    const scale = usePulseAnimation();

    const style: ViewStyle = useMemo(
      () => ({
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        transform: [{ scale }],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }),
      [size, color, scale]
    );

    return <Animated.View style={style} />;
  }
);

Pulse.displayName = "Pulse";

export default Pulse;

// const styles=StyleSheet.create({
//   pulse:{
//     width: size,
//     height: size,
//     borderRadius: size / 2,
//     backgroundColor: color,
//     transform: [{ scale }],
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -size / 2,
//     marginTop: -size / 2,
//   }
// })
