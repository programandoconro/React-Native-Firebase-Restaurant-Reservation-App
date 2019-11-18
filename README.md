# Aplicación para hacer reservas a Restaurant utilizando base de datos en tiempo real de Firebase. 

Envía datos de reservación a Firebase y recibe la confirmación de la reserva a partir de Administrador. Para ver ejemplo de Panel de Administrador, utilizar la otra parte de este proyecto, disponible en:
https://github.com/progamandoconro/Firebase-Real-Time-Web-Admin-App 

# Edita las credenciales de Firebase ubicada en /src/core/config.js
 
    export const FIREBASE_CONFIG = {

    apiKey: "",
     authDomain: "",
     databaseURL: "",
     projectId: "",
     storageBucket: "",
     messagingSenderId: "",
     appId: "",
     measurementId: ""
    }

# Funcionalidades:

* Enviar y recibier datos en tiempo real a partir de Firebase.
* Autenticación y creación de nuevo usuario con Firebase Auth.

# Para instalar, clonar este repositorio y en la carpeta creada instalar la App y sus dependencias.

   git clone https://github.com/progamandoconro/React-Native-Restaurant-Reservation-App 
   cd React-Native-Restaurant-Reservation-App
   npm install
   expo start
   
 
