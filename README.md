# React Azure Image Analyzer & Generation

## Instalación

Para instalar y ejecutar este proyecto, sigue estos pasos:

1. Ejecuta el siguiente comando para cambiar a la versión adecuada de Node.js:
  ```bash
  nvm use
  ```

2. Instala las dependencias del proyecto usando npm:
  ```bash
  npm install
  ```

3. Crea un archivo `.env` en el directorio raíz del proyecto y agrega el siguiente contenido:
  ```py
  # obtener estos valores desde el portal de azure - servicio Computer Vision (tier gratuito)

  REACT_APP_OCP_APIM_KEY = "<puede encontrarse como 'Clave 1' o 'Clave 2'>"
  REACT_APP_COMPUTER_VISION_ENDPOINT = "<puede encontrarse como 'Extremo'>"
  ```

4. Inicia el proyecto usando el siguiente comando:
  ```bash
  npm start
  ```

¡Eso es todo! El proyecto debería estar funcionando ahora.
