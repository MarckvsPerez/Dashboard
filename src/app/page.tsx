"use client";

import { Suspense, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { IoStatsChart, IoHeart } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { use } from "react";

interface SocialData {
  id: string;
  createdAt: string;
  name: string;
  likes: number;
  shares: number;
  platform: string;
  image: string;
}

const fetchSocialData = async (): Promise<SocialData[]> => {
  const response = await fetch(
    "https://67ce8f08125cd5af757af6fe.mockapi.io/camaleonic/Posts"
  );

  if (!response.ok) {
    throw new Error("Error al obtener datos");
  }

  return response.json();
};

const socialDataPromise = fetchSocialData();

const SocialDataGrid = () => {
  const socialData = use(socialDataPromise);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {socialData.map((item) => (
        <SocialCard key={item.id} item={item} />
      ))}
    </div>
  );
};

const SocialCard = ({ item }: { item: SocialData }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <div className="relative h-48 w-full">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <motion.h3
            className="text-xl font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {item.name}
          </motion.h3>
          <motion.span
            className="px-3 py-1 bg-teal-600 rounded-full text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5 }}
          >
            {item.platform}
          </motion.span>
        </div>

        <motion.div
          className="flex justify-between text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <IoHeart className="w-5 h-5 mr-1" />
            <span>{item.likes} likes</span>
          </div>
          <div className="flex items-center">
            <CiShare2 className="w-5 h-5 mr-1" />
            <span>{item.shares} shares</span>
          </div>
        </motion.div>

        <motion.div
          className="mt-4 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          PUBLISHED ON {new Date(item.createdAt).toLocaleDateString()}
        </motion.div>
      </div>
    </motion.div>
  );
};

const LoadingFallback = () => (
  <div className="text-center py-10">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="text-xl"
    >
      Loading...
    </motion.div>
  </div>
);

export default function Home() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <div className="bg-turquoise text-white">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase max-w-4xl mx-auto leading-tight">
            AI TECHNOLOGY THAT OBTAINS ALL THE ADVERTISEMENT IMPACTS
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium ">
            INCREASE YOUR SOCIAL MEDIA ENGAGEMENT
            <br />
            INCREASE YOUR ADVERTISEMENT ROI
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="h-px bg-white/30 "></div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold uppercase text-center ">SERVICES</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 border-2 border-white/50 flex items-center justify-center transform rotate-45 mb-6">
              <MdEmail className="w-10 h-10 transform -rotate-45 text-white" />
            </div>
            <h3 className="text-xl font-medium uppercase tracking-wide">
              REAL TIME ANALYTICS
            </h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 border-2 border-white/50 flex items-center justify-center transform rotate-45 mb-6">
              <FaHeart className="w-10 h-10 transform -rotate-45 text-white" />
            </div>
            <h3 className="text-xl font-medium uppercase tracking-wide">
              SOCIAL MEDIA
            </h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 border-2 border-white/50 flex items-center justify-center transform rotate-45 mb-6">
              <FaCode className="w-10 h-10 transform -rotate-45 text-white" />
            </div>
            <h3 className="text-xl font-medium uppercase tracking-wide">
              IMAGE TAGGING
            </h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 border-2 border-white/50 flex items-center justify-center transform rotate-45 mb-6">
              <IoStatsChart className="w-10 h-10 transform -rotate-45 text-white" />
            </div>
            <h3 className="text-xl font-medium uppercase tracking-wide">
              DASHBOARD & REPORT
            </h3>
          </div>
        </div>
      </div>

      {/* Social Media Posts Section */}
      <div className="py-16 px-4">
        <motion.h2
          ref={titleRef}
          className="text-3xl font-bold uppercase text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={
            isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          SOCIAL MEDIA POSTS
        </motion.h2>

        <Suspense fallback={<LoadingFallback />}>
          <SocialDataGrid />
        </Suspense>
      </div>
    </div>
  );
}
