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
import axios from "axios";

import ChartSection from "@/components/dashboard/ChartSection";
import ChartContainer from "@/components/dashboard/ChartContainer";
import LoadingError from "@/components/common/LoadingError";
import BarChart from "@/components/dashboard/BarChart";
import LineChart from "@/components/dashboard/LineChart";
import PieChart from "@/components/dashboard/PieChart";
import RadarChart from "@/components/dashboard/RadarChart";

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
  const [popularUsers, setPopularUsers] = useState<ChartData<
    "bar",
    (number | Point | null)[],
    unknown
  > | null>(null);
  const [followersRatio, setFollowersRatio] = useState<ChartData<
    "radar",
    (number | Point | null)[],
    unknown
  > | null>(null);
  const [verifiedStatus, setVerifiedStatus] = useState<ChartData<
    "pie",
    (number | Point | null)[],
    unknown
  > | null>(null);

  // Post analytics state
  const [interactions, setInteractions] = useState<ChartData<
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

  // Filtros de usuario
  const [verifiedFilter, setVerifiedFilter] = useState<
    "all" | "verified" | "unverified"
  >("all");
  // Filtro de publicaciones
  const [sponsoredFilter, setSponsoredFilter] = useState<
    "all" | "sponsored" | "normal"
  >("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("/api/usuarios/stats", {
          params: { verifiedFilter },
        });
        setPopularUsers(usersResponse.data.usuariosPopulares);
        setFollowersRatio(usersResponse.data.relacionSeguidores);
        setVerifiedStatus(usersResponse.data.verificados);

        const postsResponse = await axios.get("/api/publicaciones/stats", {
          params: { sponsoredFilter },
        });
        setInteractions(postsResponse.data.interacciones);
        setHashtags(postsResponse.data.hashtags);
        setEngagement(postsResponse.data.engagement);

        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Error loading data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [verifiedFilter, sponsoredFilter]);

  // Función para manejar cambios en el filtro de usuarios
  const handleVerifiedFilterChange = (
    filter: "all" | "verified" | "unverified"
  ) => {
    setVerifiedFilter(filter);
  };

  // Función para manejar cambios en el filtro de publicaciones
  const handleSponsoredFilterChange = (
    filter: "all" | "sponsored" | "normal"
  ) => {
    setSponsoredFilter(filter);
  };

  return (
    <div className="bg-custom-background">
      {/* Handle loading and error states */}
      <LoadingError loading={loading} error={error} />

      {/* Dashboard content */}
      {!loading && !error && (
        <div className="pb-12 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  text-white rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Social Media Dashboard
          </h1>

          {/* User Analysis Section */}
          <ChartSection
            title="User Analysis"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Filtros de usuario */}
            <div className="flex col-span-1 lg:col-span-2">
              <div className="bg-gray-800 p-3 rounded-lg flex space-x-4">
                <span className="self-center">Filter by verification:</span>
                <button
                  className={`px-3 py-1 rounded cursor-pointer ${
                    verifiedFilter === "all"
                      ? "bg-turquoise"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleVerifiedFilterChange("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded cursor-pointer ${
                    verifiedFilter === "verified"
                      ? "bg-turquoise"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleVerifiedFilterChange("verified")}
                >
                  Verified
                </button>
                <button
                  className={`px-3 py-1 rounded cursor-pointer ${
                    verifiedFilter === "unverified"
                      ? "bg-turquoise"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleVerifiedFilterChange("unverified")}
                >
                  Unverified
                </button>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
              <ChartContainer title="Popular Users" height="h-96">
                <BarChart
                  data={popularUsers}
                  title="Top users by number of followers"
                />
              </ChartContainer>
            </div>

            <ChartContainer title="Verification Status">
              <PieChart
                data={verifiedStatus}
                title="Verified users vs non-verified users"
              />
            </ChartContainer>
          </ChartSection>

          {/* Post Analysis Section */}
          <ChartSection title="Post Analysis">
            {/* Filtros de publicaciones */}
            <div className="col-span-1 lg:col-span-2 flex">
              <div className="bg-gray-800 p-3 rounded-lg flex space-x-4">
                <span className="self-center">Filter by sponsorship:</span>
                <button
                  className={`px-3 py-1 rounded cursor-pointer ${
                    sponsoredFilter === "all"
                      ? "bg-turquoise"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleSponsoredFilterChange("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded cursor-pointer ${
                    sponsoredFilter === "sponsored"
                      ? "bg-turquoise"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleSponsoredFilterChange("sponsored")}
                >
                  Sponsored
                </button>
                <button
                  className={`px-3 py-1 rounded cursor-pointer ${
                    sponsoredFilter === "normal"
                      ? "bg-turquoise"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleSponsoredFilterChange("normal")}
                >
                  Normal
                </button>
              </div>
            </div>

            <ChartContainer title="Top Posts by Interactions" height="h-96">
              <BarChart
                data={interactions}
                title="Breakdown of interactions per post"
              />
            </ChartContainer>

            <ChartContainer title="Popular Hashtags" height="h-96">
              <BarChart
                data={hashtags}
                title="Most used hashtags"
                indexAxis="y"
              />
            </ChartContainer>
          </ChartSection>

          {/* Advanced Analysis Section */}
          <ChartSection title="Advanced Analysis">
            <ChartContainer title="Followers/Following Ratio">
              <RadarChart
                data={followersRatio}
                title="Followers/following ratio"
              />
            </ChartContainer>

            <ChartContainer title="Engagement by User">
              <LineChart
                data={engagement}
                title="Average interactions per post"
              />
            </ChartContainer>
          </ChartSection>
        </div>
      )}
    </div>
  );
}
