import React,{useState} from 'react';
import Image from 'next/image';
import Header from "@/components/shared/Header";
import { IoCloseOutline } from "react-icons/io5";


interface NebulaProps {
  onClose: () => void;
  activeBadge: number
}

const Nebula: React.FC<NebulaProps> = ({ onClose, activeBadge }) => {
  const names = ["Nebula","Galaxia",
    "Luminara",
    "Orbitia",]
  const handleShareOnX = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my ${names[activeBadge]} Sticker!`,
          text: `I just collected a ${names[activeBadge]} Sticker! Check it out!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=I%20just%20collected%20a%20Nebula%20Sticker!%20Check%20it%20out!&url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const [isEarnBadges, setIsEarnBadges] = useState(true)
  const [isLeaderboard, setIsLeaderboard] = useState(false)
  const [isLottery, setIsLottery] = useState(false)
    
  return (
    <div className="flex  flex-col justify-center text-white overflow-hidden mx-auto">

      <div className="absolute inset-0 bg-white opacity-5"></div>

      <div className="w-[621px] shadow-[0px_0px_0px_1px_rgba(255,_255,_255,_0.1),_0px_19px_43.9px_-2px_rgba(0,_0,_0,_0.12),_0px_2px_24px_rgba(0,_0,_0,_0.32),_0px_4px_4px_-1px_rgba(0,_0,_0,_0.25)] rounded-2xl bg-[#0d0d10] box-border max-w-full overflow-hidden flex flex-col items-center justify-start pt-0 px-0 pb-[26px] gap-[24px] leading-[normal] tracking-[normal] text-left text-13xl text-white font-vt323 border-[1.3px] border-solid border-[#0f0f0f] z-10 relative">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_right,_rgba(208,_246,_3,_0.15),_transparent_70%)]"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          <IoCloseOutline />
        </button>

        <div className="w-full h-[10px] relative overflow-hidden">
        </div>

        <h2 className="text-4xl font-bold text-white mb-4 z-10">Congratulations</h2>
        <p className="text-2xl text-[#D0F603] mb-6 z-10">You&apos;ve collected <span className="text-[#D0F603]">{names[activeBadge]}</span> Sticker</p>

        <div className="relative mb-6 z-10 w-full h-[200px]">
          <Image
            src="/Confetti.png"
            alt="Confetti"
            layout="fill"
            objectFit="contain"
            className="absolute inset-0 z-0"
          />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img
              src={`/stamp${activeBadge}.png`}
              alt="Nebula Sticker"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>

        <button
          onClick={handleShareOnX}
          className="relative inline-flex w-[300px] h-[90px] overflow-hidden p-[2px] hover:shadow-[0_0_20px_rgba(179,207,61,1)] transition-all duration-[400ms] group"
        >
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#B3CF3D_0%,transparent_15%,transparent_100%)] group-hover:hidden" />
          <div className="inline-flex h-full w-full cursor-pointer items-center justify-center text-2xl text-gray-50 backdrop-blur-3xl btn-fi relative">
            Share on X
            <span className="btn-fi-line"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Nebula;