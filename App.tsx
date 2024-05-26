import "react-native-reanimated";
import { StyleSheet } from "react-native";
import RootHomeStack from "./routes/rootStackNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="transparent" animated />
      <GestureHandlerRootView style={styles.container}>
        <RootHomeStack />
        <Toast />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
