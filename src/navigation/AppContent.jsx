import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSplashTimer } from "../hooks/useSplashTimer";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterCustomer from "../screens/RegisterCustomer";
import VerifyCustomerScreen from "../screens/VerifyCustomerScreen";
import RecoveryPasswordScreen from "../screens/RecoveryPasswordScreen";
import VerifyRecoveryCodeScreen from "../screens/VerifyRecoveryCodeScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import TabMenu from "./TabMenu";

export default function AppContent() {
  const { isAuthenticated, isBooting } = useAuth();
  const showSplash = useSplashTimer(isBooting);
  const [authView, setAuthView] = useState("login");
  const [pendingRegistration, setPendingRegistration] = useState(null);
  const [recoveryEmail, setRecoveryEmail] = useState(null);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    if (authView === "register") {
      return (
        <RegisterCustomer
          onBack={() => setAuthView("login")}
          onContinueVerification={(registrationData) => {
            setPendingRegistration(registrationData);
            setAuthView("verify");
          }}
        />
      );
    }

    if (authView === "verify") {
      return (
        <VerifyCustomerScreen
          registrationData={pendingRegistration}
          onBack={() => setAuthView("register")}
          onFinish={() => setAuthView("login")}
        />
      );
    }

    if (authView === "recovery") {
      return (
        <RecoveryPasswordScreen
          onBack={() => setAuthView("login")}
          onCodeSent={({ email }) => {
            setRecoveryEmail(email);
            setAuthView("verifyRecovery");
          }}
        />
      );
    }

    if (authView === "verifyRecovery") {
      return (
        <VerifyRecoveryCodeScreen
          recoveryEmail={recoveryEmail}
          onBack={() => setAuthView("recovery")}
          onVerified={() => setAuthView("newPassword")}
        />
      );
    }

    if (authView === "newPassword") {
      return (
        <NewPasswordScreen
          onFinish={() => {
            setRecoveryEmail(null);
            setAuthView("login");
          }}
        />
      );
    }

    return (
      <LoginScreen
        onOpenRegister={() => setAuthView("register")}
        onOpenRecovery={() => setAuthView("recovery")}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <TabMenu />
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5EE",
  },
});
