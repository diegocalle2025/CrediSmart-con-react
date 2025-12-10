# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
**Nombre:** [Juan Diego Calle Mazo]   

**Curso:** Ingeniería Web I   

**Descripción:** Este proyecto consiste en una plataforma web interactiva que permite a los usuarios consultar, filtrar y simular diferentes tipos de créditos ofrecidos por una entidad financiera. El sistema incluye una interfaz visual con tarjetas informativas para cada producto y un simulador dinámico de cuotas, donde el usuario selecciona el producto, ingresa el monto deseado y define el plazo en meses. Con estos datos, la aplicación calcula automáticamente la cuota mensual usando la fórmula de amortización estándar según la tasa real de cada crédito.

El objetivo del proyecto es brindar una experiencia rápida, clara y precisa para que los usuarios puedan comparar alternativas de financiación y tomar decisiones informadas antes de solicitar un crédito.

 

## Estructura del proyecto

Footer.jsx      #Pie de página del sitio – información y enlaces finales
Hero.jsx        #Sección principal destacada – portada visual del sitio
Navbar.jsx      #Barra de navegación – menú principal del sitio
Home.jsx        #Página principal - Catálogo de créditos
simulador.jsx   #Página del simulador de crédito
solicitar.jsx   #Formulario de solicitud
App.css         #Hoja de estilos
main.jsx        #Punto de montaje principal del proyecto
README.md       #Documento de información del proyecto


 

 ## Instrucciones para ejecutar el proyecto

1. descargar o clonar este repositorio 

2. Abrir la carpeta del proyecto en tu computador 

3. Hacer doble click sobre el archivo **Credismar-react** o abrirlo en el navegador web 

 

## Pantallazos 

 [inicio](./src/assets/img/inicio.png)
 [simulador](./src/assets/img/simulador.png)
 [solicitar](./src/assets/img/solicitar.png)