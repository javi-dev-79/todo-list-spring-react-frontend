# 📌 todo-list-spring-react-frontend

🚀 **To-Do List App with React + Vite + TypeScript + Chakra UI**

This project is the **frontend** of a todo list app, connected to an API developed in **Spring Boot**. It allows the management of users, task lists, and individual tasks.

## 🛠️ Technologies Used

- ⚛ **React 19**
- ⚡ **Vite**
- 📜 **TypeScript**
- 🎨 **Chakra UI 2.10.6**
- 🔥 **Axios (for HTTP requests)**
- 🌍 **React Router (for navigation)**

## 📌 Main Features

✅ **User Management**  
✔️ List registered users  
✔️ Create new users  
✔️ Edit/delete users

✅ **Task List Management**  
✔️ View all task lists of a user  
✔️ Create new lists  
✔️ Modify/delete lists

✅ **Task Management**  
✔️ Add tasks to a list  
✔️ Edit task title, description, and status  
✔️ Mark tasks as complete  
✔️ Delete tasks

✅ **Authentication (Future)**  
✔️ User registration and login  
✔️ Protecting private routes

✅ **Optimized User Experience**  
✔️ Clean and responsive UI with Chakra UI  
✔️ Visual feedback with loaders and notifications  
✔️ Error handling in API requests

## 🚀 Installation and Configuration

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/javi-dev-79/todo-list-spring-react-frontend.git
cd todo-list-spring-react-frontend
```

### 2️⃣ Install Dependencies

Run the following command in the terminal to install all the necessary dependencies:

```bash
npm install
```

### 3️⃣ Configure the API URL

Create a **.env** file in the root of the project and define the API base URL:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 4️⃣ Start the Development Server

Run the following command to start the application in development mode:

```bash
npm run dev
```

The application will be available at http://localhost:5173.

## 📡 Connecting to the Backend

This frontend is designed to work with a **REST API** developed in **Spring Boot**.
Make sure the backend is running before making requests.

## 🛠️ Useful Commands

| Command | Description |
| ---------------- | ---------------------------------------------------- |
| `npm run dev` | Starts the application in development mode |
| `npm run build` | Builds the production-optimized version |
| `npm run lint` | Runs the linter to detect errors in the code |
| `npm run format` | Formats the code with Prettier |
| `npm run lint:fix` | Runs the linter and automatically fixes problems if possible |
| `npm run check` | Runs formatting and lint checking in one step |

### 📌 Contribute

If you want to contribute to this project:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature-new-feature`
```

3. Make your changes and commit:

```bash
git commit -m "Add new feature"
```

4. Push your changes:

```bash
git push origin feature-new-feature
```

5. Create a Pull Request on GitHub.

### 📄 License

This project is licensed under the MIT License.

---

# 📌 todo-list-spring-react-frontend

🚀 **Aplicación de Lista de Tareas con React + Vite + TypeScript + Chakra UI**

Este proyecto es el **frontend** de una aplicación de lista de tareas (**To-Do List**), conectada a una API desarrollada en **Spring Boot**. Permite la gestión de usuarios, listas de tareas y tareas individuales.

## 🛠️ Tecnologías Utilizadas

- ⚛ **React 19**
- ⚡ **Vite**
- 📜 **TypeScript**
- 🎨 **Chakra UI 2.10.6**
- 🔥 **Axios (para peticiones HTTP)**
- 🌍 **React Router (para la navegación)**

## 📌 Características Principales

✅ **Gestión de Usuarios**  
✔️ Listar usuarios registrados  
✔️ Crear nuevos usuarios  
✔️ Editar/eliminar usuarios

✅ **Gestión de Listas de Tareas**  
✔️ Ver todas las listas de tareas de un usuario  
✔️ Crear nuevas listas  
✔️ Modificar/eliminar listas

✅ **Gestión de Tareas**  
✔️ Añadir tareas a una lista  
✔️ Editar título, descripción y estado de la tarea  
✔️ Marcar tareas como completadas  
✔️ Eliminar tareas

✅ **Autenticación (Futuro)**  
✔️ Registro e inicio de sesión de usuarios  
✔️ Protección de rutas privadas

✅ **Experiencia de Usuario Optimizada**  
✔️ UI limpia y responsiva con Chakra UI  
✔️ Feedback visual con loaders y notificaciones  
✔️ Manejo de errores en las peticiones API

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/javi-dev-79/todo-list-spring-react-frontend.git
cd todo-list-spring-react-frontend
```

### 2️⃣ Instalar Dependencias

Ejecuta el siguiente comando en la terminal para instalar todas las dependencias necesarias:

```bash
npm install
```

### 3️⃣ Configurar la URL de la API

Crea un archivo **.env** en la raíz del proyecto y define la URL base de la API:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 4️⃣ Iniciar el Servidor de Desarrollo

Ejecuta el siguiente comando para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173.

## 📡 Conexión con el Backend

Este frontend está diseñado para trabajar con una **API REST** desarrollada en **Spring Boot**.  
Asegúrate de que el backend esté corriendo antes de realizar peticiones.

## 🛠️ Comandos Útiles

| Comando          | Descripción                                          |
| ---------------- | ---------------------------------------------------- |
| `npm run dev`    | Inicia la aplicación en modo desarrollo              |
| `npm run build`  | Genera la versión optimizada para producción         |
| `npm run lint`   | Ejecuta el linter para detectar errores en el código |
| `npm run format` | Formatea el código con Prettier                      |
| `npm run lint:fix` | Ejecuta el linter y corrige problemas automáticos si es posible |
| `npm run check`  | Ejecuta el formateo y la verificación de lint en un solo paso |


### 📌 Contribuir

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama:

```bash
git checkout -b feature-nueva-funcionalidad`
```

3. Realiza los cambios y haz un commit:

```bash
git commit -m "Añadir nueva funcionalidad"
```

4. Sube los cambios:

```bash
git push origin feature-nueva-funcionalidad
```

5. Crea un Pull Request en GitHub.

### 📄 Licencia

Este proyecto está bajo la licencia MIT.
