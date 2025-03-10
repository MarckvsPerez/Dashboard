"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  ChartData,
  Point,
} from "chart.js";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

export default function Dashboard() {
  const [usuariosPopulares, setUsuariosPopulares] = useState<ChartData<
    "bar",
    (number | Point | null)[],
    unknown
  > | null>(null);
  const [relacionSeguidores, setRelacionSeguidores] = useState<ChartData<
    "radar",
    (number | Point | null)[],
    unknown
  > | null>(null);
  const [verificados, setVerificados] = useState<ChartData<
    "pie",
    (number | Point | null)[],
    unknown
  > | null>(null);

  const [interacciones, setInteracciones] = useState<ChartData<
    "bar",
    (number | Point | null)[],
    unknown
  > | null>(null);
  const [hashtags, setHashtags] = useState<ChartData<
    "bar",
    (number | Point | null)[],
    unknown
  > | null>(null);
  const [engagement, setEngagement] = useState<ChartData<
    "line",
    (number | Point | null)[],
    unknown
  > | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosResponse = await axios.get("/api/usuarios/stats");
        setUsuariosPopulares(usuariosResponse.data.usuariosPopulares);
        setRelacionSeguidores(usuariosResponse.data.relacionSeguidores);
        setVerificados(usuariosResponse.data.verificados);

        const publicacionesResponse = await axios.get(
          "/api/publicaciones/stats"
        );
        setInteracciones(publicacionesResponse.data.interacciones);
        setHashtags(publicacionesResponse.data.hashtags);
        setEngagement(publicacionesResponse.data.engagement);

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError(
          "Error al cargar los datos. Por favor, intenta de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <p className="text-gray-600">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="pb-12 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4 bg-dark-gray text-white rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Social Media Dashboard
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Users Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg shadow p-6 col-span-1 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Popular users</h3>
            <div className="h-96">
              {usuariosPopulares ? (
                <Bar
                  data={usuariosPopulares}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#FFFFFF",
                        },
                      },
                      title: {
                        display: true,
                        text: "Top users by number of followers",
                        color: "#FFFFFF",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: "#FFFFFF",
                        },
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                      x: {
                        ticks: {
                          color: "#FFFFFF",
                        },
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-center text-white mt-10">
                  No data available
                </p>
              )}
            </div>
          </div>

          {/* Gráfico 2: Usuarios verificados vs no verificados */}
          <div className="rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Verification status</h3>
            <div className="h-80">
              {verificados ? (
                <Pie
                  data={verificados}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#FFFFFF",
                        },
                      },
                      title: {
                        display: true,
                        text: "Verified users vs non-verified users",
                        color: "#FFFFFF",
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-center text-white mt-10">
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Publications Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico 3: Interacciones por publicación */}
          <div className="rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">
              Top posts by interactions
            </h3>
            <div className="h-96">
              {interacciones ? (
                <Bar
                  data={interacciones}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#FFFFFF",
                        },
                      },
                      title: {
                        display: true,
                        text: "Breakdown of interactions per post",
                        color: "#FFFFFF",
                      },
                    },
                    scales: {
                      x: {
                        stacked: false,
                        ticks: {
                          color: "#FFFFFF",
                        },
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                      y: {
                        stacked: false,
                        beginAtZero: true,
                        ticks: {
                          color: "#FFFFFF",
                        },
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-center text-white mt-10">
                  No data available
                </p>
              )}
            </div>
          </div>

          {/* Gráfico 4: Hashtags populares */}
          <div className="rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Popular hashtags</h3>
            <div className="h-96">
              {hashtags ? (
                <Bar
                  data={hashtags}
                  options={{
                    indexAxis: "y",
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#FFFFFF",
                        },
                      },
                      title: {
                        display: true,
                        text: "Most used hashtags",
                        color: "#FFFFFF",
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                        ticks: {
                          color: "#FFFFFF",
                        },
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                      y: {
                        ticks: {
                          color: "#FFFFFF",
                        },
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-center text-white mt-10">
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico 5: Relación seguidores/seguidos */}
          <div className="rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">
              Followers/following ratio
            </h3>
            <div className="h-80">
              {relacionSeguidores ? (
                <Radar
                  data={relacionSeguidores}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#FFFFFF",
                        },
                      },
                      title: {
                        display: true,
                        text: "Followers/following ratio",
                        color: "#FFFFFF",
                      },
                    },
                    scales: {
                      r: {
                        angleLines: {
                          display: true,
                          color: "rgba(255, 255, 255, 0.2)",
                        },
                        suggestedMin: 0,
                        grid: {
                          color: "rgba(255, 255, 255, 0.2)",
                        },
                        ticks: {
                          color: "#FFFFFF",
                          backdropColor: "transparent",
                        },
                        pointLabels: {
                          color: "#FFFFFF",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-center text-white mt-10">
                  No data available
                </p>
              )}
            </div>
          </div>

          {/* Gráfico 6: Engagement por usuario */}
          <div className="rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Engagement by user</h3>
            <div className="h-80">
              {engagement ? (
                <Line
                  data={engagement}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#FFFFFF",
                        },
                      },
                      title: {
                        display: true,
                        text: "Average interactions per post",
                        color: "#FFFFFF",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: "#FFFFFF",
                        },
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                      x: {
                        ticks: {
                          color: "#FFFFFF",
                        },
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-center text-white mt-10">
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
