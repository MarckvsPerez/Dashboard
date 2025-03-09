import { MdEmail } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

export default function Home() {
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
    </div>
  );
}
