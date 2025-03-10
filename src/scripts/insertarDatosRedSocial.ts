import dbConnect from "../lib/mongoose.ts";
import Usuario from "../lib/models/usuario.ts";
import Publicacion from "../lib/models/publicacion.ts";
import mongoose from "mongoose";

async function insertarDatosRedSocial() {
  try {
    await dbConnect();

    console.log("Eliminando datos existentes...");
    await Usuario.deleteMany({});
    await Publicacion.deleteMany({});

    console.log("Insertando usuarios...");
    const usuarios = await Usuario.insertMany([
      {
        username: "maria_garcia",
        email: "maria@example.com",
        nombre: "María",
        apellido: "García",
        fotoPerfil: "maria.jpg",
        biografia: "Amante de la fotografía y los viajes ✈️ | Foodie 🍕",
        seguidores: 1250,
        seguidos: 450,
        esVerificado: true,
      },
      {
        username: "carlos_lopez",
        email: "carlos@example.com",
        nombre: "Carlos",
        apellido: "López",
        fotoPerfil: "carlos.jpg",
        biografia: "Desarrollador web | Gamer en mis tiempos libres 🎮",
        seguidores: 780,
        seguidos: 320,
        esVerificado: false,
      },
      {
        username: "laura_martinez",
        email: "laura@example.com",
        nombre: "Laura",
        apellido: "Martínez",
        fotoPerfil: "laura.jpg",
        biografia: "Diseñadora gráfica | Amante del arte y la música 🎨🎵",
        seguidores: 3200,
        seguidos: 650,
        esVerificado: true,
      },
      {
        username: "alejandro_ruiz",
        email: "alejandro@example.com",
        nombre: "Alejandro",
        apellido: "Ruiz",
        fotoPerfil: "alejandro.jpg",
        biografia: "Entusiasta del fitness 💪 | Nutrición y vida saludable",
        seguidores: 5600,
        seguidos: 420,
        esVerificado: true,
      },
      {
        username: "sofia_torres",
        email: "sofia@example.com",
        nombre: "Sofía",
        apellido: "Torres",
        fotoPerfil: "sofia.jpg",
        biografia: "Viajera incansable | 25 países y contando 🌎",
        seguidores: 2100,
        seguidos: 890,
        esVerificado: false,
      },
    ]);

    console.log(`Se insertaron ${usuarios.length} usuarios correctamente`);

    console.log("Insertando publicaciones...");
    const publicaciones = await Publicacion.insertMany([
      {
        usuario: usuarios[0]._id,
        contenido:
          "¡Increíble atardecer en la playa hoy! 🌅 #sunset #beach #relax",
        imagenes: ["sunset1.jpg", "sunset2.jpg"],
        likes: 342,
        comentarios: 28,
        compartidos: 15,
        hashtags: ["sunset", "beach", "relax"],
        ubicacion: "Playa del Carmen, México",
        fechaPublicacion: new Date("2023-06-15T18:30:00"),
      },
      {
        usuario: usuarios[1]._id,
        contenido:
          "Acabo de terminar mi nuevo proyecto web. ¡Estoy muy emocionado de compartirlo pronto! 💻 #coding #webdev",
        likes: 128,
        comentarios: 42,
        compartidos: 5,
        hashtags: ["coding", "webdev", "javascript"],
        fechaPublicacion: new Date("2023-06-14T10:15:00"),
      },
      {
        usuario: usuarios[2]._id,
        contenido:
          "Mi último diseño para la campaña de verano. ¿Qué opinan? 🎨 #design #creativity",
        imagenes: ["design.jpg"],
        likes: 567,
        comentarios: 89,
        compartidos: 34,
        hashtags: ["design", "creativity", "summer"],
        fechaPublicacion: new Date("2023-06-13T14:45:00"),
        esPatrocinado: true,
      },
      {
        usuario: usuarios[3]._id,
        contenido:
          "Rutina de entrenamiento de hoy completada. ¡Cada día más fuerte! 💪 #fitness #workout",
        imagenes: ["workout.jpg"],
        likes: 421,
        comentarios: 53,
        compartidos: 12,
        hashtags: ["fitness", "workout", "motivation"],
        ubicacion: "Gimnasio PowerFit",
        fechaPublicacion: new Date("2023-06-12T20:00:00"),
      },
      {
        usuario: usuarios[4]._id,
        contenido:
          "¡Acabo de llegar a mi país número 25! Las vistas desde aquí son impresionantes 😍 #travel #adventure",
        imagenes: ["travel1.jpg", "travel2.jpg", "travel3.jpg"],
        likes: 892,
        comentarios: 76,
        compartidos: 45,
        hashtags: ["travel", "adventure", "wanderlust"],
        ubicacion: "Santorini, Grecia",
        fechaPublicacion: new Date("2023-06-11T12:30:00"),
      },
      {
        usuario: usuarios[0]._id,
        contenido:
          "Probando esta nueva receta. ¡Deliciosa! 🍲 #foodie #cooking",
        imagenes: ["food.jpg"],
        likes: 215,
        comentarios: 31,
        compartidos: 8,
        hashtags: ["foodie", "cooking", "homemade"],
        fechaPublicacion: new Date("2023-06-10T19:20:00"),
      },
      {
        usuario: usuarios[2]._id,
        contenido:
          "Visitando la nueva exposición de arte contemporáneo. ¡Inspirador! 🎭 #art #exhibition",
        imagenes: ["art1.jpg", "art2.jpg"],
        likes: 378,
        comentarios: 42,
        compartidos: 17,
        hashtags: ["art", "exhibition", "culture"],
        ubicacion: "Museo de Arte Moderno",
        fechaPublicacion: new Date("2023-06-09T16:45:00"),
      },
    ]);

    console.log(
      `Se insertaron ${publicaciones.length} publicaciones correctamente`
    );

    await mongoose.connection.close();
    console.log("Conexión cerrada");

    return { usuarios, publicaciones };
  } catch (error) {
    console.error("Error al insertar datos:", error);
    await mongoose.connection.close();
    throw error;
  }
}

insertarDatosRedSocial()
  .then(() => {
    console.log("Script completado exitosamente");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error en el script:", error);
    process.exit(1);
  });
