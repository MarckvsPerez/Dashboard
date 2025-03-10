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
      {
        usuario: usuarios[1]._id,
        contenido:
          "Trabajando en un nuevo proyecto de diseño web. La creatividad fluye hoy 💡 #design #webdev #coding",
        imagenes: ["webdesign.jpg"],
        likes: 245,
        comentarios: 38,
        compartidos: 12,
        hashtags: ["design", "webdev", "coding", "creativity"],
        fechaPublicacion: new Date("2023-06-08T11:20:00"),
      },
      {
        usuario: usuarios[3]._id,
        contenido:
          "Entrenamiento en la playa esta mañana. Combinar fitness y naturaleza es lo mejor 🏖️ #fitness #beach #motivation",
        imagenes: ["beachworkout.jpg"],
        likes: 512,
        comentarios: 47,
        compartidos: 23,
        hashtags: ["fitness", "beach", "workout", "motivation"],
        ubicacion: "Playa Miramar",
        fechaPublicacion: new Date("2023-06-07T08:15:00"),
      },
      {
        usuario: usuarios[4]._id,
        contenido:
          "Explorando nuevas culturas y sabores en mi viaje. Esta comida local es increíble 😋 #travel #foodie #culture",
        imagenes: ["travelfood.jpg"],
        likes: 678,
        comentarios: 59,
        compartidos: 31,
        hashtags: ["travel", "foodie", "culture", "adventure"],
        ubicacion: "Bangkok, Tailandia",
        fechaPublicacion: new Date("2023-06-06T14:30:00"),
      },
      {
        usuario: usuarios[0]._id,
        contenido:
          "Cocinando con vista al mar. Inspiración culinaria en su máxima expresión 🌊 #cooking #beach #sunset",
        imagenes: ["beachcooking.jpg"],
        likes: 389,
        comentarios: 42,
        compartidos: 18,
        hashtags: ["cooking", "beach", "sunset", "foodie"],
        ubicacion: "Costa Azul",
        fechaPublicacion: new Date("2023-06-05T19:45:00"),
      },
      {
        usuario: usuarios[2]._id,
        contenido:
          "Diseñando mientras viajo. La aventura alimenta mi creatividad ✏️ #design #travel #creativity",
        imagenes: ["traveldesign.jpg"],
        likes: 423,
        comentarios: 51,
        compartidos: 27,
        hashtags: ["design", "travel", "creativity", "digital"],
        ubicacion: "Bali, Indonesia",
        fechaPublicacion: new Date("2023-06-04T16:20:00"),
      },
      {
        usuario: usuarios[1]._id,
        contenido:
          "Programando al aire libre. La naturaleza es mi oficina hoy 💻🌳 #coding #nature #motivation",
        imagenes: ["outdoorcoding.jpg"],
        likes: 276,
        comentarios: 34,
        compartidos: 9,
        hashtags: ["coding", "nature", "motivation", "webdev"],
        ubicacion: "Parque Nacional",
        fechaPublicacion: new Date("2023-06-03T10:30:00"),
      },
      {
        usuario: usuarios[3]._id,
        contenido:
          "Combinando arte y ejercicio en mi rutina de hoy. La creatividad también es parte del fitness 🎨💪 #fitness #art #creativity",
        imagenes: ["fitnessart.jpg"],
        likes: 345,
        comentarios: 41,
        compartidos: 14,
        hashtags: ["fitness", "art", "creativity", "workout"],
        fechaPublicacion: new Date("2023-06-02T17:40:00"),
      },
      {
        usuario: usuarios[4]._id,
        contenido:
          "Atardecer mágico desde mi habitación. Los viajes te regalan estos momentos ✨ #travel #sunset #adventure",
        imagenes: ["travelsunset.jpg"],
        likes: 721,
        comentarios: 63,
        compartidos: 38,
        hashtags: ["travel", "sunset", "adventure", "wanderlust"],
        ubicacion: "Maldivas",
        fechaPublicacion: new Date("2023-06-01T18:50:00"),
      },
      {
        usuario: usuarios[2]._id,
        contenido:
          "Exposición de arte digital. La tecnología y la creatividad se fusionan de formas increíbles 🖥️🎨 #art #technology #design",
        imagenes: ["digitalart1.jpg", "digitalart2.jpg"],
        likes: 498,
        comentarios: 57,
        compartidos: 29,
        hashtags: ["art", "technology", "design", "digital", "exhibition"],
        ubicacion: "Galería de Arte Digital",
        fechaPublicacion: new Date("2023-05-31T15:10:00"),
        esPatrocinado: true,
      },
      {
        usuario: usuarios[0]._id,
        contenido:
          "Aprendiendo nuevas técnicas culinarias. Nunca se deja de aprender en la cocina 👨‍🍳 #cooking #learning #foodie",
        imagenes: ["cookingclass.jpg"],
        likes: 312,
        comentarios: 45,
        compartidos: 16,
        hashtags: ["cooking", "learning", "foodie", "homemade"],
        ubicacion: "Escuela de Gastronomía",
        fechaPublicacion: new Date("2023-05-30T13:25:00"),
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
