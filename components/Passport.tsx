import React, { useState } from 'react';
import Image from 'next/image';
import './../components/style/passport.css';
import Header from "@/components/shared/Header";
import Research from './Research';
import PassportModel from './PassportModel';
import Frame from './Frame';

interface Sticker {
  id: number;
  count: number;
}

interface PassportProps {
  onNavigateToNebula: () => void;
  canPick?: boolean;
  stickers?: Sticker[];
  questionsSubmitted?: boolean;
  onPickStamp?: (stampId: number) => Promise<void>;
  onMarkQuestionsSubmitted: () => Promise<void>;
  onResearch: any, 
  isEligible: boolean,
  isSubmitting: boolean,
  streaks: number
}

const Passport: React.FC<PassportProps> = ({ 
  onNavigateToNebula, 
  canPick, 
  stickers = [],
  questionsSubmitted,
  onPickStamp,
  onMarkQuestionsSubmitted,
  onResearch, 
  isEligible,
  isSubmitting,
  streaks
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [winnerStamp, setWinnerStamp] = useState<number | null>(null);
  const [showResearch, setShowResearch] = useState(false);
  const [showPassportModel, setShowPassportModel] = useState(false);

  const handleStampPick = async () => {
    if (!canPick) return;

    setIsAnimating(true);
    const animationDuration = 3000;
    const intervalDuration = 100;

    const interval = setInterval(() => {
      setWinnerStamp(Math.floor(Math.random() * 4) + 1);
    }, intervalDuration);

    setTimeout(async () => {
      clearInterval(interval);
      const finalWinner = Math.floor(Math.random() * 4) + 1;
      setWinnerStamp(finalWinner);
      setIsAnimating(false);

      try {
        // await onPickStamp(finalWinner);
      } catch (error) {
        console.error('Error picking stamp:', error);
        // Handle the error appropriately in your UI
      }
    }, animationDuration);
  };

  const handleResearch = () => {
    if (!questionsSubmitted) {
      setShowResearch(true);
    }
  };

  const handleBackToPassport = () => {
    setShowResearch(false);
    setShowPassportModel(false);
  };

  const handleShowPassportModel = () => {
    setShowResearch(false);
    setShowPassportModel(true);
  };

  const handleQuestionsSubmitted = async () => {
    try {
      await onMarkQuestionsSubmitted();
      setShowPassportModel(false);
      onNavigateToNebula();
    } catch (error) {
      console.error('Error marking questions as submitted:', error);
      // Handle the error appropriately in your UI
    }
  };

  if (showResearch) {
    return (
      <Research 
      streaks={streaks}
        onShowPassportModel={handleShowPassportModel}
        onBackToPassport={handleBackToPassport}
      />
    );
  }

  if (showPassportModel) {
    return (
      <PassportModel 
      isSubmitting ={isSubmitting}
        onBackToPassport={handleBackToPassport}
        onNavigateToNebula={handleQuestionsSubmitted}
      />
    );
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full">      
      <div className="container2 w-full max-w-[621px] p-4 sm:p-8 flex flex-col items-center justify-center overflow-hidden relative z-10">
        <div className="flex justify-center w-full mb-4">
          <div className="passport-image-container">
            <Image
              src="/card3.png"
              alt="Passport"
              layout="fill"
              loading='lazy'
              objectFit="contain"
              className="rounded-2xl non-interactive"
              draggable="false"
            />
            <Frame/>
            
            <div className="stamp-container ">
              {[1, 2, 3, 4].map((stampId) => {
                const sticker = stickers.find(s => s.id === stampId);
                return (
                  <div 
                    key={stampId} 
                    className={` ${sticker ? "stampColor" : "stamp"} stamp${stampId} active ${isAnimating && winnerStamp === stampId ? 'animate-pulse' : ''}`}
                  >
                    <img
                      src={`/stamp${stampId}.png`}
                      alt={`Stamp ${stampId}`}
                      loading='lazy'
                      width={90}
                      height={90}
                      className="non-interactive"
                    />
                    {sticker && sticker.count > 0 && (
                      <div className="absolute top-[-10px] right-[-8px] font-vt323  text-[#b3cf3d] text-lg px-1 rounded">
                        {sticker.count}x
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="text-center mb-2">
            <div className="newtext font-vt323 text-xl sm:text-2xl text-[#d33c3c]">NEW</div>
            <button
              onClick={handleResearch}
              disabled={!isEligible}
              className={`relative overflow-hidden bg-transparent border-none cursor-pointer py-2 px-4 font-vt323 text-3xl sm:text-4xl tracking-wider ${questionsSubmitted ? 'text-gray-500' : 'text-[#b3cf3d]'} transition-all duration-300 ease-in-out`}
            >
              <span className="relative z-10">
                {!isEligible ? 'COMPLETED' : 'RESEARCH'}
              </span>
              <div className="absolute inset-0 bg-[#b3cf3d] opacity-0 transition-all duration-300 ease-in-out btn-hover"></div>
            </button>
          </div>
          <div className="w-32 h-1 bg-[#b3cf3d] rounded-full glow"></div>
        </div>
      </div>
    </div>
  );
};

export default Passport;
