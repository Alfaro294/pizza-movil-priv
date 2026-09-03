import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../components/Buttons/CustomButton";
import { useRecoveryPasswordForm } from "../hooks/useRecoveryPasswordForm";

export default function VerifyRecoveryCodeScreen({
  recoveryEmail,
  onBack,
  onVerified,
}) {
  const { code, setCode, loading, error, success, verifyCode } =
    useRecoveryPasswordForm();

  const handleVerify = async () => {
    const ok = await verifyCode();

    if (ok && onVerified) {
      onVerified();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Verifica el código</Text>
        <Text style={styles.subtitle}>
          Hemos enviado un código a{" "}
          {recoveryEmail ?? "tu correo electrónico"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Código de verificación"
          value={code}
          onChangeText={setCode}
          placeholderTextColor="#A77B5D"
          autoCapitalize="none"
          editable={!loading}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        {loading ? (
          <ActivityIndicator
            size="small"
            color="#C26D3B"
            style={styles.loader}
          />
        ) : null}

        <CustomButton
          textButton="Verificar código"
          actionButton={handleVerify}
          disabled={loading}
        />

        <View style={styles.backPrompt}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backLink}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF5EE",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFDF8",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 26,
    borderWidth: 1,
    borderColor: "#E9D8C3",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#6F3E1F",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 14,
    fontSize: 14,
    color: "#9A6A47",
  },
  input: {
    backgroundColor: "#FFF",
    color: "#2A1A10",
    fontWeight: "600",
    width: "100%",
    borderWidth: 1,
    borderColor: "#DFC9B2",
    borderRadius: 8,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginVertical: 10,
  },
  errorText: {
    marginTop: 4,
    color: "#B12929",
    fontSize: 13,
    fontWeight: "600",
  },
  successText: {
    marginTop: 4,
    color: "#1E7A46",
    fontSize: 13,
    fontWeight: "600",
  },
  loader: {
    marginTop: 10,
  },
  backPrompt: {
    marginTop: 18,
    alignItems: "center",
  },
  backLink: {
    color: "#C26D3B",
    fontSize: 13,
    fontWeight: "700",
  },
});
