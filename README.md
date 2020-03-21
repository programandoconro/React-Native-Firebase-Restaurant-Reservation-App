# Aplicación móvil (Android) para hacer reservas a Restaurant utilizando base de datos en tiempo real de Firebase. 

Envía datos de reservación a Firebase y recibe la confirmación de la reserva a partir del administrador. 

Esta App puede ser controlada por el Panel de Administrador Web, disponible en:
https://github.com/progamandoconro/Firebase-Real-Time-Web-Admin-App 


## Funcionalidades:

* Enviar y recibir datos en tiempo real a partir de Firebase.
* Autenticación (login) y creación de nuevo usuario (sign up) con Firebase Auth.

## Para instalar, clonar este repositorio y en la carpeta creada instalar la App y sus dependencias.

    git clone https://github.com/progamandoconro/React-Native-Restaurant-Reservation-App 
    cd React-Native-Restaurant-Reservation-App
    npm install
    expo start
    
Recuerda que debes permitir autenticación por correo/contraseña en ```Firebase```, así como cambiar las reglas de seguridad de la base a datos a:

```
{
  "rules": {
      ".read": "auth != null",
      ".write": "auth != null"
  }
}

```
## Edita las credenciales de Firebase ubicada en /src/core/config.js
 
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

## Screenshots:

<div style="text-align:center"><img src="https://github.com/progamandoconro/React-Native-Restaurant-Reservation-App/blob/postmortem/sample_pictures/Screenshot_2019-12-12-01-15-04.png " /></div>
<div style="text-align:center"><img src="https://github.com/progamandoconro/React-Native-Restaurant-Reservation-App/blob/postmortem/sample_pictures/Screenshot_2019-12-12-01-15-48.png " /></div>
<div style="text-align:center"><img src="https://github.com/progamandoconro/React-Native-Restaurant-Reservation-App/blob/postmortem/sample_pictures/Screenshot_2019-12-12-01-15-58.png " /></div>
<div style="text-align:center"><img src=" https://github.com/progamandoconro/React-Native-Restaurant-Reservation-App/blob/postmortem/sample_pictures/Screenshot_2019-12-12-01-16-54.png" /></div>
<div style="text-align:center"><img src="https://github.com/progamandoconro/React-Native-Restaurant-Reservation-App/blob/postmortem/sample_pictures/Screenshot_2019-12-12-01-16-18.png " /></div>
<div style="text-align:center"><img src="https://github.com/progamandoconro/React-Native-Restaurant-Reservation-App/blob/postmortem/sample_pictures/Screenshot_2019-12-12-01-16-28.png " /></div>


