import firebase from "firebase/app";
import "firebase/auth";

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const signInUser = async ({ name, email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({
      displayName: name
    });

    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "Dirección de correo ya registrada."
        };
      case "auth/invalid-email":
        return {
          error: "Dirección de correo con formato incorrecto."
        };
      case "auth/weak-password":
        return {
          error: "Clave es muy débil"
        };
      case "auth/too-many-requests":
        return {
          error: "Demasiados intentos. Espero 1 minuto e intenta de nuevo."
        };
      default:
        return {
          error: "Revisa tu conexión a Internet."
        };
    }
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Correo con formato incorrecto."
        };
      case "auth/user-not-found":
      case "auth/wrong-password":
        return {
          error: "Contraseña o correo incorrectos"
        };
      case "auth/too-many-requests":
        return {
          error: "Demasiados intentos. Espera un minuto e intenta de nuevo."
        };
      default:
        return {
          error: "Revisa tu conexión a Internet."
        };
    }
  }
};

export const sendEmailWithPassword = async email => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Correo Electrónico con formato incorrecto."
        };
      case "auth/user-not-found":
        return {
          error: "El usuario con este correo no existe."
        };
      case "auth/too-many-requests":
        return {
          error: "Demasiados intentos, espera un minuto e intenta de nuevo."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};
