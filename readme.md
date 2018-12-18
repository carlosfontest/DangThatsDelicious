# Dang Thats Delicious [Node.js (express) & MongoDB ]

## ***Introducción***
Sistema de sucursales de la empresa *"Dang Thas Delicious"*. Posee sistema de registro e inicio de sesión para que los usuarios interesados en abrir una sucursal agreguen su *Store* al sistema. Se cuenta con un Dashboard en el cual se muestran todos los *Stores*, si un usuario propietario de una sucursal inicia sesión, en este Dashboard tendrá la opción de editar los datos de su *Store*; adicionalmente existen las opciones de darle like a la *Store* para así agregarla a la lista de tus favoritos, a la cual se podrá acceder luego. Se puede revisar las *Stores* individualmente, en donde se tendrá la opción de dejar una *Review* de dicha *Store*. El sistema cuenta con la implementación de geolocalización con la API de Google Maps, en donde se podrá ubicar donde está cualquier *Store* individualmente o buscar *Stores* por zona. Finalmente se cuenta con un filtrado por *Tags* de los *Stores* y un TOP 10 de las mejores *Stores* (Basado en el Rating de las reviews).

> Aplicación basada en el curso *"Learn Node"* de @wesbos

## ***Hosting Página***
[https://dangthats.herokuapp.com/](https://dangthats.herokuapp.com/ "Dang Thats Delicious")

## ***Quick Start***
>Es necesario tener ***node.js*** para poder ejecutar la aplicación.
```bash
# Install Dependencies
npm install

# Serve on localhost:7777
npm run dev
```


## ***ScreenShots***

### *Vista de todas las Stores*
![Vista de todas las Stores](https://i.ibb.co/tZcwMgX/dang10.png)

### *Filtrado por Tags*
![Filtrado por Tags](https://i.ibb.co/8zqwBJL/dang2.png)

### *Top Stores*
![Top Stores](https://i.ibb.co/rtR6x5m/dang3.png)

### *Búsqueda de Stores por zona*
![Búsqueda de Stores por zona](https://i.ibb.co/ZLdk80q/dang4.png)

### *Sistema de Búsqueda por Nombre y Descripción*
![Sistema de Búsqueda por Nombre y Descripción](https://i.ibb.co/Jk3BG45/dang5.png)

### *Inicio de Sesión y Registro*
![Inicio de sesión y registro](https://i.ibb.co/8gm0Ksx/dang6.png)

### *Añadir una nueva Store*
![Añadir una nueva Store](https://i.ibb.co/HDXmhNg/dang9.png)

### *Vista individual de una Store*
![Vista individual de una Store](https://i.ibb.co/wyQs2sH/dang8.png)

### *Sistema de Reviews por Store*
![Sistema de Reviews por Store](https://i.ibb.co/n3gMHmg/dang11.png)


## ***Especificaciones de desarrollo***
> Software desarrollado con el editor de texto *Visual Studio Code*, en los lenguajes ***HTML, CSS y Javascript*** para *FrontEnd* y ***Node.js (express)*** para *BackEnd*