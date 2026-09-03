import { useState } from "react";
import { useAuth } from "./useAuth";

export function useRecoveryPasswordForm() {
  const {
    requestPasswordRecovery,
    verifyRecoveryCode,
    setNewPassword: updatePassword,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const runRequest = async (request, successMessage) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await request();
      setSuccess(successMessage);
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const requestCode = () => {
    if (!email.trim()) {
      setError("Ingresa tu correo electrónico");
      return false;
    }

    return runRequest(
      () => requestPasswordRecovery({ email }),
      "Código enviado correctamente",
    );
  };

  const verifyCode = () => {
    if (!code.trim()) {
      setError("Ingresa el código de verificación");
      return false;
    }

    return runRequest(
      () => verifyRecoveryCode({ code }),
      "Código verificado correctamente",
    );
  };

  const submitNewPassword = () => {
    if (!newPassword || !confirmNewPassword) {
      setError("Completa ambos campos de contraseña");
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    return runRequest(
      () => updatePassword({ newPassword, confirmNewPassword }),
      "Contraseña actualizada correctamente",
    );
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    loading,
    error,
    success,
    requestCode,
    verifyCode,
    submitNewPassword,
  };
}
