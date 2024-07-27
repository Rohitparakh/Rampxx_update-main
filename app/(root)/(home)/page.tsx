"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { getAllRegistrants, register, isUserRegistered } from "@/lib/actions/registry.action";
import Statistics from "@/components/Statistics";
import Web3ConnectBtn from "@/components/buttons/Web3ConnectBtn";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PassportCreation from "@/components/PassportCreation";
import Passport from "@/components/Passport";
import Research from "@/components/Research";
import PassportModel from "@/components/PassportModel";
import Nebula from "@/components/Nebula";
import ProtectedImage from "@/components/ProtectedImage";
import '@/app/modulepage.css'
import EarnBadges from "@/components/EarnBadges";
import Lottery from "@/components/Lottery";
import LeaderBoard from "@/components/LeaderBoard";

type Registrant = {
  address: string;
};

type RegistrantsResponse = {
  registrants: Registrant[];
};

export default function Home() {
  const { isConnected, address, isReconnecting, isConnecting  } = useAccount();
  const [currentView, setCurrentView] = useState<'initial' | 'passportCreation' | 'passport' | 'research' | 'passportModel' | 'nebula'>('initial');
  const [addresses, setAddresses] = useState<string[]>([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeBadge, setActiveBadge] = useState<number>(1);
  const [isEligible, setIsEligible] = useState(true);
  const [isSubmitting ,setIsSubmitting] = useState(false);
  const [registriesCount, setRegistriesCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true)

 useEffect(() => {
  const preventDefault = (e: any) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  };

  const preventZoom = (e: any) => {
    if (e.ctrlKey || e.metaKey || e.key === 'Meta') {
      e.preventDefault();
    }
  };

  const preventWheelZoom = (e: any) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
    }
  };

  document.addEventListener('touchmove', preventDefault, { passive: false });
  document.addEventListener('wheel', preventWheelZoom, { passive: false });
  document.addEventListener('keydown', preventZoom);

  return () => {
    document.removeEventListener('touchmove', preventDefault);
    document.removeEventListener('wheel', preventWheelZoom);
    document.removeEventListener('keydown', preventZoom);
  };
}, []);


  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/getRegistereduseraddress=${address}`);
      const data = await response.json();
      setUser(data);
      checkEligibility(data.lastStampPick);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const checkEligibility = (updatedAt: string) => {
    const lastUpdated = new Date(updatedAt);
    const now = new Date();
    const differenceInHours = Math.abs(now.getTime() - lastUpdated.getTime()) / 36e5;
    setIsEligible(differenceInHours > 24);
  };

  useEffect(() => {
    if (isConnected) {
      fetchUser();
    }
  }, [isConnected, currentView, address]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      img, svg {
        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
      .noselect {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -khtml-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      checkRegistrationStatus();
      fetchAddresses();
    } else {
      setCurrentView('initial');
      setIsRegistered(false);
    }
  }, [isConnected, address]);

  const checkRegistrationStatus = async () => {
    if (address) {
      try {
        const registrant = await isUserRegistered({ userAddress: address });
        setIsRegistered(!!registrant);
        setCurrentView(registrant ? 'passport' : 'passportCreation');
      } catch (error) {
        console.error("Error checking registration status:", error);
        setCurrentView('passportCreation');
      }
    }
  };

  const fetchAddresses = async () => {
    try {
      const response: RegistrantsResponse = await getAllRegistrants();
      const fetchedAddresses = response.registrants.map((registrant: Registrant) => registrant.address);
      setAddresses(fetchedAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleGeneratePassport = async () => {
    if (address) {
      try {
        await register({ address, path: '/' });
        setIsRegistered(true);
        setCurrentView('passport');
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  const onMarkQuestionsSubmitted = async () => {

    try {
      setIsSubmitting(true)
      const randomNum = Math.floor(Math.random() * 4) + 1; 
      setActiveBadge(randomNum);
      const stickers = [{ id: randomNum, count: 1 }];
      
      // Get the current date for lastStampPick
      const lastStampPick = new Date().toISOString();
      
      // Retrieve the current totalStreaks value from the user or set a default
      const currentTotalStreaks = parseInt(user?.totalStreaks) || 0; // Replace totalStreaks with the actual value
      const newTotalStreaks = (currentTotalStreaks + 1).toString(); // Increment totalStreaks by 1
  
      const response = await fetch('/api/updateUser', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address: address, 
          stickers,
          lastStampPick,
          totalStreaks: newTotalStreaks
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error updating stickers: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to update stickers:', error);
      throw error;
    } finally {
      setIsSubmitting(false)
    }
  };

  useEffect(() => {
    const fetchRegistriesCount = async () => {
      try {
        const response = await fetch('/api/registriesCount', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRegistriesCount(data);
      } catch (error) {
        console.error('Failed to fetch registries count:', error);
      }
    };

    if (isConnected && !isConnecting && !isReconnecting) {
      fetchRegistriesCount();
    }
  }, [isConnected, isConnecting, isReconnecting]);

  const handleResearch = () => setCurrentView('research');
  const handleShowPassportModel = () => setCurrentView('passportModel');
  const handleBackToPassport = () => setCurrentView('passport');
  const handleNavigateToNebula = () => setCurrentView('nebula');
  const handleCloseNebula = () => setCurrentView(isRegistered ? 'passport' : 'initial');
 
  useEffect(() => {
    setIsLoading(false)
  },[])


  const [isEarnBadges, setIsEarnBadges] = useState(false)
  const [isLeaderboard, setIsLeaderboard] = useState(false)
  const [isLottery, setIsLottery] = useState(false)
  
  const openEarnBadgesPopup = () => {
    setIsEarnBadges(true);
    closeLeaderboardPopup();
    closeLotteryPopup();
  };

  const closeEarnBadgesPopup = () => {
    setIsEarnBadges(false);
  };

  const openLeaderBoardPopup = () => {
    setIsLeaderboard(true);
    closeEarnBadgesPopup();
    closeLotteryPopup();
  };

  const closeLeaderboardPopup = () => {
    setIsLeaderboard(false);
  };
 
  const openLotteryPopup = () => {
    setIsLottery(true);
    closeEarnBadgesPopup();
    closeLeaderboardPopup();
  };

  const closeLotteryPopup = () => {
    setIsLottery(false);
  };


  if (!isLoading) {
    return (
      <main className="flex h-screen flex-col justify-center text-white overflow-hidden w-full">
        <EarnBadges isOpen={isEarnBadges} onClose={closeEarnBadgesPopup}/>
          <Lottery isOpen={isLottery} onClose={closeLotteryPopup}/>
          <LeaderBoard isOpen ={isLeaderboard} onClose={closeLeaderboardPopup}/>
        <Header openLeaderBoardPopup={openLeaderBoardPopup} openEarnBadgesPopup={openEarnBadgesPopup} openLotteryPopup={openLotteryPopup}
        isEarnBadges={isEarnBadges} isLottery={isLottery} isLeaderboard={isLeaderboard}/>
        <div className="wrap z-[-5]">
          <div className="top-plane"></div>
          <div className="bottom-plane"></div>
        </div>
        <div className="flex items-center justify-center lg:justify-between">
          <div className="pb-32 max-w-[40%] hidden lg:block">
            <ProtectedImage
              src="/assets/images/left-hand-final.svg"
              alt="left-hand"
              width={600}
              height={600}
            />
          </div>
          <div className="pl-6 pr-8">
            <Web3ConnectBtn />
          </div>
          <div className="pt-96 max-w-[40%] hidden lg:block">
            <ProtectedImage
              src="/assets/images/right-hand-final.svg"
              alt="right-hand"
              width={600}
              height={600}
            />
          </div>
        </div>
        <Statistics addresses={addresses} />
        {currentView === 'passportCreation' && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff21] z-50">
            <PassportCreation 
              onClose={() => setCurrentView('initial')} 
              onGenerate={handleGeneratePassport} 
            />
          </div>
        )}
        {currentView === 'passport' && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff21] z-50">
            <Passport streaks={parseInt(user?.totalStreaks)}  isSubmitting={isSubmitting} isEligible={isEligible} stickers={user?.stickers} onNavigateToNebula={handleNavigateToNebula} onMarkQuestionsSubmitted={onMarkQuestionsSubmitted} onResearch={handleResearch} />
          </div>
        )}
  
          <>
            {currentView === 'research' && (
              <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff21] z-50">
                <Research streaks={parseInt(user?.totalStreaks)} isSubmitting={isSubmitting} onShowPassportModel={handleShowPassportModel} />
              </div>
            )}
            {currentView === 'passportModel' && (
              <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff21] z-50">
                <PassportModel 
                  isSubmitting={isSubmitting}
                  onBackToPassport={handleBackToPassport}
                  onNavigateToNebula={handleNavigateToNebula}
                />
              </div>
            )}
            {currentView === 'nebula' && (
              <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff21] z-50">
                <Nebula onClose={handleCloseNebula} activeBadge={activeBadge} />
              </div>
            )}
          </>
  
        <Footer />
      </main>
    );  
  }
}
