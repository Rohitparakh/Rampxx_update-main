import React from 'react';
import type { NextPage } from "next";
import Image from 'next/image';
import './../components/style/research.css';
import Header from "@/components/shared/Header";

interface ResearchProps {
  onShowPassportModel: () => void;
  onBackToPassport?: () => void;
  isSubmitting?: boolean
  streaks: number
}

const Research: NextPage<ResearchProps> = ({streaks, onShowPassportModel, onBackToPassport, isSubmitting }) => {
("rs")
return (
    <div className="fixed inset-0 flex items-center justify-center w-full">      
      <div
        className="max-w-[90%] max-h-[510px] md:max-w-[621px] md:w-[80%] rounded-2xl bg-gradient-to-br from-[#0D0D10] to-[#06060A] shadow-xl overflow-hidden flex flex-col items-center justify-end pt-[20px] pb-[22px] pr-5 pl-[21px] gap-[29px] leading-[normal] tracking-[normal] relative z-10"
      >
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_right,_rgba(208,_246,_3,_0.15),_transparent_70%)]"></div>

        {/* <button 
          onClick={onBackToPassport}
          className="absolute top-4 left-4 text-white text-sm flex items-center"
        >
          <span className="mr-1"></span> 
        </button> */}

        <Image 
          src="/nabulaicon.png" 
          alt="Nebula Icon" 
          width={540} 
          height={240} 
          className="mb-4" 
        />
        <section className="flex flex-col items-center justify-center gap-[17px] max-w-full text-center text-[36px] font-vt323">
          <h1 className="streaktext font-vt323">
            Day {streaks + 1 } Streak 🔥
          </h1>
          <h1 className="streaktext2 font-vt323">
            WELCOME TO THE RAMPX
          </h1>
          <div className="flex flex-row items-center justify-center w-full text-base">
            <div 
              onClick={onShowPassportModel}
              className="relative inline-flex w-[300px] h-[70px] overflow-hidden p-[2px] transition-all duration-[400ms] group cursor-pointer"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#B3CF3D_0%,transparent_15%,transparent_100%)] group-hover:hidden" />
              <div className="inline-flex h-full w-full items-center justify-center text-2xl text-gray-50 backdrop-blur-3xl btn-fi relative">
                Let&apos;s Get you Onboard
                <span className="btn-fi-line"></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Research;