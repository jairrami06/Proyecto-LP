# Backend del Proyecto: Gestión de Citas Psicológicas

## **Pasos para Configurar y Ejecutar el Proyecto**

### **1. Instalar XAMPP**

- Descarga e instala XAMPP desde el enlace proporcionado.
- Durante la instalación, selecciona los módulos:
  - Apache
  - MySQL

### **2. Iniciar Servidores Apache y MySQL**

- Abre el Panel de Control de XAMPP.
- Inicia los servidores **Apache** y **MySQL**.

### **3. Configurar la Base de Datos**

1. Abre el navegador y accede a **phpMyAdmin**:
   - URL: `http://localhost/phpmyadmin`

2. Importar la base de datos:

   - Ve a la pestaña **Importar**.
   - Haz clic en **Seleccionar archivo** y elige el archivo `citaspsicologicas.sql`.
   - Haz clic en **Continuar** para importar la base de datos.

### **4. Descargar y Configurar el Código del Proyecto**

1. Descarga el código fuente del proyecto y colócalo en el directorio `htdocs` de XAMPP:
   - Ruta típica: `C:\xampp\htdocs\proyectolp`

2. Verifica la configuración de la base de datos en el archivo `config/Database.php`:
   ```php
   class Database {
       private $host = 'localhost';
       private $db_name = 'citaspsicologicas';
       private $username = 'root';
       private $password = '';
       public $conn;

       public function getConnection() {
           $this->conn = null;

           try {
               $this->conn = new PDO("mysql:host=" . $this->host
