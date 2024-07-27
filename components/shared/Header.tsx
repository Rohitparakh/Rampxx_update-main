"use client"
import {useEffect, useState} from "react";
import * as React from "react";
import DisconnectBtn from "../buttons/DisconnectBtn";
import { useAccount, useDisconnect } from 'wagmi';
import Image from "next/image";
import EarnBadges from "../EarnBadges";
import LeaderBoard from "../LeaderBoard";
import Lottery from "../Lottery";

interface headerProp {
  isEarnBadges: boolean;
  isLottery: boolean;
  isLeaderboard: boolean;
  openEarnBadgesPopup: () => void;
  openLotteryPopup: () => void;
  openLeaderBoardPopup: () => void;
}


const Header : React.FC<headerProp> = ({ isEarnBadges, isLottery, isLeaderboard, openEarnBadgesPopup, openLotteryPopup, openLeaderBoardPopup }) => {
  const { isConnected, isReconnecting, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const [isClient, setIsClient] = useState(false)
 

  const [registriesCount, setRegistriesCount] = useState<number>(0);
  

  useEffect(() => {
    const fetchRegistriesCount = async () => {
      try {
        const response = await fetch('/api/registriesCount?nocache=' + new Date().getTime(), { cache: 'no-store' });

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

  const logout = () => disconnect();

 
  useEffect(() => {
    setIsClient(true)
  }, [])
  // bg-[#D0F603] text-black
  
  if (isClient) {
    return (
      <div >
        {
          isConnected && (
        <div className="w-80 h-10 flex items-center gap-5 fixed top-12 right-6 sm:left-10 z-101">
          <p onClick={openEarnBadgesPopup} className={`text-xl ${isEarnBadges? "bg-[#D0F603] text-black" : "bg-[#383936] text-white"} border border-[#565948] px-3 py-1 cursor-pointer`}>EARN</p>
         
          <p onClick={openLotteryPopup} className={`text-xl ${isLottery? "bg-[#D0F603] text-black" : "bg-[#383936] text-white"} px-3 py-1 border border-[#565948] cursor-pointer`}>LOTTERY</p>
         
          <p onClick={openLeaderBoardPopup} className={`text-xl ${isLeaderboard? "bg-[#D0F603] text-black" : "bg-[#383936] text-white"} px-3 py-1 border border-[#565948] cursor-pointer`}>LEADERBOARD</p>
          
        </div>
          )
        }
      <div className="fixed top-12 left-6 sm:left-10 lg:left-1/2 lg:-translate-x-1/2 z-10">
      <svg width="146" height="40" viewBox="0 0 146 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.072 6.68156L8.60049 20.7176C3.72665 19.866 0.0229492 15.5868 0.0229492 10.435C0.0229492 4.67342 4.66694 0 10.3923 0C14.8064 0 18.578 2.77566 20.072 6.68156Z" fill="#D0F603"/>
<path d="M32.83 20.2709L48.9768 40.0002H35.7083C33.9061 40.0002 32.224 39.2642 31.2262 38.0446L25.3024 30.7795L24.7591 30.1277L24.2211 30.7795L18.2972 38.0446C17.2995 39.2642 15.6174 40.0002 13.8152 40.0002H0.546631L18.2972 18.2891C18.7465 17.837 19.1539 17.3376 19.5092 16.8066L19.5196 16.7961L31.2262 2.48146C32.224 1.26185 33.9061 0.525879 35.7083 0.525879H48.9768L32.83 20.2552H32.8404L32.83 20.2709Z" fill="#D0F603"/>
<path d="M79.3768 28.8C79.4835 29.2267 79.5368 29.76 79.5368 30.4C79.5368 31.0133 79.4835 31.5467 79.3768 32H76.1768C76.0701 31.5467 76.0168 31.0133 76.0168 30.4C76.0168 29.76 76.0701 29.2267 76.1768 28.8H74.9768C74.8701 28.3467 74.8168 27.8133 74.8168 27.2C74.8168 26.56 74.8701 26.0267 74.9768 25.6H73.7768C73.6701 25.1467 73.6168 24.6133 73.6168 24C73.6168 23.36 73.6701 22.8267 73.7768 22.4H69.7768C69.8835 22.8267 69.9368 23.36 69.9368 24C69.9368 24.6133 69.8835 25.1467 69.7768 25.6C69.8835 26.0267 69.9368 26.56 69.9368 27.2C69.9368 27.8133 69.8835 28.3467 69.7768 28.8C69.8835 29.2267 69.9368 29.76 69.9368 30.4C69.9368 31.0133 69.8835 31.5467 69.7768 32H66.5768C66.4701 31.5467 66.4168 31.0133 66.4168 30.4C66.4168 29.76 66.4701 29.2267 66.5768 28.8C66.4701 28.3467 66.4168 27.8133 66.4168 27.2C66.4168 26.56 66.4701 26.0267 66.5768 25.6C66.4701 25.1467 66.4168 24.6133 66.4168 24C66.4168 23.36 66.4701 22.8267 66.5768 22.4C66.4701 21.9467 66.4168 21.4133 66.4168 20.8C66.4168 20.16 66.4701 19.6267 66.5768 19.2C66.4701 18.7467 66.4168 18.2133 66.4168 17.6C66.4168 16.96 66.4701 16.4267 66.5768 16C66.4701 15.5467 66.4168 15.0133 66.4168 14.4C66.4168 13.76 66.4701 13.2267 66.5768 12.8C66.4701 12.3467 66.4168 11.8133 66.4168 11.2C66.4168 10.56 66.4701 10.0267 66.5768 9.6H77.7768C77.8835 10.0267 77.9368 10.56 77.9368 11.2C77.9368 11.8133 77.8835 12.3467 77.7768 12.8H79.3768C79.4835 13.2267 79.5368 13.76 79.5368 14.4C79.5368 15.0133 79.4835 15.5467 79.3768 16H78.5768C78.6835 16.4267 78.7368 16.96 78.7368 17.6C78.7368 18.2133 78.6835 18.7467 78.5768 19.2H76.1768C76.2835 19.6267 76.3368 20.16 76.3368 20.8C76.3368 21.4133 76.2835 21.9467 76.1768 22.4H76.9768C77.0835 22.8267 77.1368 23.36 77.1368 24C77.1368 24.6133 77.0835 25.1467 76.9768 25.6H78.1768C78.2835 26.0267 78.3368 26.56 78.3368 27.2C78.3368 27.8133 78.2835 28.3467 78.1768 28.8H79.3768ZM75.3768 19.2C75.2701 18.7467 75.2168 18.2133 75.2168 17.6C75.2168 16.96 75.2701 16.4267 75.3768 16C75.2701 15.5467 75.2168 15.0133 75.2168 14.4C75.2168 13.76 75.2701 13.2267 75.3768 12.8H69.7768C69.8835 13.2267 69.9368 13.76 69.9368 14.4C69.9368 15.0133 69.8835 15.5467 69.7768 16C69.8835 16.4267 69.9368 16.96 69.9368 17.6C69.9368 18.2133 69.8835 18.7467 69.7768 19.2H75.3768ZM95.3924 28.8C95.4991 29.2267 95.5524 29.76 95.5524 30.4C95.5524 31.0133 95.4991 31.5467 95.3924 32H92.1924C92.0858 31.5467 92.0324 31.0133 92.0324 30.4C92.0324 29.76 92.0858 29.2267 92.1924 28.8H90.5924C90.4858 28.3467 90.4324 27.8133 90.4324 27.2C90.4324 26.56 90.4858 26.0267 90.5924 25.6H85.7924C85.8991 26.0267 85.9524 26.56 85.9524 27.2C85.9524 27.8133 85.8991 28.3467 85.7924 28.8H90.5924C90.6991 29.2267 90.7524 29.76 90.7524 30.4C90.7524 31.0133 90.6991 31.5467 90.5924 32H84.1924C84.0858 31.5467 84.0324 31.0133 84.0324 30.4C84.0324 29.76 84.0858 29.2267 84.1924 28.8H82.5924C82.4858 28.3467 82.4324 27.8133 82.4324 27.2C82.4324 26.56 82.4858 26.0267 82.5924 25.6H84.1924C84.0858 25.1467 84.0324 24.6133 84.0324 24C84.0324 23.36 84.0858 22.8267 84.1924 22.4H90.5924C90.4858 21.9467 90.4324 21.4133 90.4324 20.8C90.4324 20.16 90.4858 19.6267 90.5924 19.2H84.9924C84.8858 18.7467 84.8324 18.2133 84.8324 17.6C84.8324 16.96 84.8858 16.4267 84.9924 16H92.1924C92.2991 16.4267 92.3524 16.96 92.3524 17.6C92.3524 18.2133 92.2991 18.7467 92.1924 19.2H93.7924C93.8991 19.6267 93.9524 20.16 93.9524 20.8C93.9524 21.4133 93.8991 21.9467 93.7924 22.4C93.8991 22.8267 93.9524 23.36 93.9524 24C93.9524 24.6133 93.8991 25.1467 93.7924 25.6C93.8991 26.0267 93.9524 26.56 93.9524 27.2C93.9524 27.8133 93.8991 28.3467 93.7924 28.8H95.3924ZM100.768 17.6C100.768 18.2133 100.715 18.7467 100.608 19.2H101.808C101.915 19.6267 101.968 20.16 101.968 20.8C101.968 21.4133 101.915 21.9467 101.808 22.4C101.915 22.8267 101.968 23.36 101.968 24C101.968 24.6133 101.915 25.1467 101.808 25.6C101.915 26.0267 101.968 26.56 101.968 27.2C101.968 27.8133 101.915 28.3467 101.808 28.8C101.915 29.2267 101.968 29.76 101.968 30.4C101.968 31.0133 101.915 31.5467 101.808 32H98.6081C98.5014 31.5467 98.4481 31.0133 98.4481 30.4C98.4481 29.76 98.5014 29.2267 98.6081 28.8C98.5014 28.3467 98.4481 27.8133 98.4481 27.2C98.4481 26.56 98.5014 26.0267 98.6081 25.6C98.5014 25.1467 98.4481 24.6133 98.4481 24C98.4481 23.36 98.5014 22.8267 98.6081 22.4C98.5014 21.9467 98.4481 21.4133 98.4481 20.8C98.4481 20.16 98.5014 19.6267 98.6081 19.2C98.5014 18.7467 98.4481 18.2133 98.4481 17.6C98.4481 16.96 98.5014 16.4267 98.6081 16H100.608C100.715 16.4267 100.768 16.96 100.768 17.6ZM105.168 17.6C105.168 18.2133 105.115 18.7467 105.008 19.2H106.208C106.315 19.6267 106.368 20.16 106.368 20.8C106.368 21.4133 106.315 21.9467 106.208 22.4C106.315 22.8267 106.368 23.36 106.368 24C106.368 24.6133 106.315 25.1467 106.208 25.6C106.315 26.0267 106.368 26.56 106.368 27.2C106.368 27.8133 106.315 28.3467 106.208 28.8C106.315 29.2267 106.368 29.76 106.368 30.4C106.368 31.0133 106.315 31.5467 106.208 32H103.808C103.701 31.5467 103.648 31.0133 103.648 30.4C103.648 29.76 103.701 29.2267 103.808 28.8C103.701 28.3467 103.648 27.8133 103.648 27.2C103.648 26.56 103.701 26.0267 103.808 25.6C103.701 25.1467 103.648 24.6133 103.648 24C103.648 23.36 103.701 22.8267 103.808 22.4C103.701 21.9467 103.648 21.4133 103.648 20.8C103.648 20.16 103.701 19.6267 103.808 19.2H101.808C101.701 18.7467 101.648 18.2133 101.648 17.6C101.648 16.96 101.701 16.4267 101.808 16H105.008C105.115 16.4267 105.168 16.96 105.168 17.6ZM111.408 22.4C111.515 22.8267 111.568 23.36 111.568 24C111.568 24.6133 111.515 25.1467 111.408 25.6C111.515 26.0267 111.568 26.56 111.568 27.2C111.568 27.8133 111.515 28.3467 111.408 28.8C111.515 29.2267 111.568 29.76 111.568 30.4C111.568 31.0133 111.515 31.5467 111.408 32H108.208C108.101 31.5467 108.048 31.0133 108.048 30.4C108.048 29.76 108.101 29.2267 108.208 28.8C108.101 28.3467 108.048 27.8133 108.048 27.2C108.048 26.56 108.101 26.0267 108.208 25.6C108.101 25.1467 108.048 24.6133 108.048 24C108.048 23.36 108.101 22.8267 108.208 22.4C108.101 21.9467 108.048 21.4133 108.048 20.8C108.048 20.16 108.101 19.6267 108.208 19.2H106.208C106.101 18.7467 106.048 18.2133 106.048 17.6C106.048 16.96 106.101 16.4267 106.208 16H109.808C109.915 16.4267 109.968 16.96 109.968 17.6C109.968 18.2133 109.915 18.7467 109.808 19.2H111.408C111.515 19.6267 111.568 20.16 111.568 20.8C111.568 21.4133 111.515 21.9467 111.408 22.4ZM127.584 24C127.584 24.6133 127.53 25.1467 127.424 25.6H125.824C125.93 26.0267 125.984 26.56 125.984 27.2C125.984 27.8133 125.93 28.3467 125.824 28.8H124.224C124.33 29.2267 124.384 29.76 124.384 30.4C124.384 31.0133 124.33 31.5467 124.224 32H117.824C117.93 32.4267 117.984 32.96 117.984 33.6C117.984 34.2133 117.93 34.7467 117.824 35.2C117.93 35.6267 117.984 36.16 117.984 36.8C117.984 37.4133 117.93 37.9467 117.824 38.4H114.624C114.517 37.9467 114.464 37.4133 114.464 36.8C114.464 36.16 114.517 35.6267 114.624 35.2C114.517 34.7467 114.464 34.2133 114.464 33.6C114.464 32.96 114.517 32.4267 114.624 32C114.517 31.5467 114.464 31.0133 114.464 30.4C114.464 29.76 114.517 29.2267 114.624 28.8C114.517 28.3467 114.464 27.8133 114.464 27.2C114.464 26.56 114.517 26.0267 114.624 25.6C114.517 25.1467 114.464 24.6133 114.464 24C114.464 23.36 114.517 22.8267 114.624 22.4C114.517 21.9467 114.464 21.4133 114.464 20.8C114.464 20.16 114.517 19.6267 114.624 19.2C114.517 18.7467 114.464 18.2133 114.464 17.6C114.464 16.96 114.517 16.4267 114.624 16H117.824C117.93 16.4267 117.984 16.96 117.984 17.6C117.984 18.2133 117.93 18.7467 117.824 19.2H119.424C119.53 19.6267 119.584 20.16 119.584 20.8C119.584 21.4133 119.53 21.9467 119.424 22.4H117.824C117.93 22.8267 117.984 23.36 117.984 24C117.984 24.6133 117.93 25.1467 117.824 25.6C117.93 26.0267 117.984 26.56 117.984 27.2C117.984 27.8133 117.93 28.3467 117.824 28.8H122.624C122.517 28.3467 122.464 27.8133 122.464 27.2C122.464 26.56 122.517 26.0267 122.624 25.6H124.224C124.117 25.1467 124.064 24.6133 124.064 24C124.064 23.36 124.117 22.8267 124.224 22.4H122.624C122.517 21.9467 122.464 21.4133 122.464 20.8C122.464 20.16 122.517 19.6267 122.624 19.2H119.424C119.317 18.7467 119.264 18.2133 119.264 17.6C119.264 16.96 119.317 16.4267 119.424 16H124.224C124.33 16.4267 124.384 16.96 124.384 17.6C124.384 18.2133 124.33 18.7467 124.224 19.2H125.824C125.93 19.6267 125.984 20.16 125.984 20.8C125.984 21.4133 125.93 21.9467 125.824 22.4H127.424C127.53 22.8267 127.584 23.36 127.584 24ZM143.439 28.8C143.546 29.2267 143.599 29.76 143.599 30.4C143.599 31.0133 143.546 31.5467 143.439 32H140.239C140.133 31.5467 140.079 31.0133 140.079 30.4C140.079 29.76 140.133 29.2267 140.239 28.8H139.039C138.933 28.3467 138.879 27.8133 138.879 27.2C138.879 26.56 138.933 26.0267 139.039 25.6H138.239C138.133 25.1467 138.079 24.6133 138.079 24C138.079 23.36 138.133 22.8267 138.239 22.4H135.839C135.946 22.8267 135.999 23.36 135.999 24C135.999 24.6133 135.946 25.1467 135.839 25.6H135.039C135.146 26.0267 135.199 26.56 135.199 27.2C135.199 27.8133 135.146 28.3467 135.039 28.8H133.839C133.946 29.2267 133.999 29.76 133.999 30.4C133.999 31.0133 133.946 31.5467 133.839 32H130.639C130.533 31.5467 130.479 31.0133 130.479 30.4C130.479 29.76 130.533 29.2267 130.639 28.8H131.839C131.733 28.3467 131.679 27.8133 131.679 27.2C131.679 26.56 131.733 26.0267 131.839 25.6H133.439C133.333 25.1467 133.279 24.6133 133.279 24C133.279 23.36 133.333 22.8267 133.439 22.4H134.639C134.533 21.9467 134.479 21.4133 134.479 20.8C134.479 20.16 134.533 19.6267 134.639 19.2H133.439C133.333 18.7467 133.279 18.2133 133.279 17.6C133.279 16.96 133.333 16.4267 133.439 16H131.839C131.733 15.5467 131.679 15.0133 131.679 14.4C131.679 13.76 131.733 13.2267 131.839 12.8H130.639C130.533 12.3467 130.479 11.8133 130.479 11.2C130.479 10.56 130.533 10.0267 130.639 9.6H133.839C133.946 10.0267 133.999 10.56 133.999 11.2C133.999 11.8133 133.946 12.3467 133.839 12.8H135.039C135.146 13.2267 135.199 13.76 135.199 14.4C135.199 15.0133 135.146 15.5467 135.039 16H135.839C135.946 16.4267 135.999 16.96 135.999 17.6C135.999 18.2133 135.946 18.7467 135.839 19.2H138.239C138.133 18.7467 138.079 18.2133 138.079 17.6C138.079 16.96 138.133 16.4267 138.239 16H139.039C138.933 15.5467 138.879 15.0133 138.879 14.4C138.879 13.76 138.933 13.2267 139.039 12.8H140.239C140.133 12.3467 140.079 11.8133 140.079 11.2C140.079 10.56 140.133 10.0267 140.239 9.6H143.439C143.546 10.0267 143.599 10.56 143.599 11.2C143.599 11.8133 143.546 12.3467 143.439 12.8H142.239C142.346 13.2267 142.399 13.76 142.399 14.4C142.399 15.0133 142.346 15.5467 142.239 16H140.639C140.746 16.4267 140.799 16.96 140.799 17.6C140.799 18.2133 140.746 18.7467 140.639 19.2H139.439C139.546 19.6267 139.599 20.16 139.599 20.8C139.599 21.4133 139.546 21.9467 139.439 22.4H140.639C140.746 22.8267 140.799 23.36 140.799 24C140.799 24.6133 140.746 25.1467 140.639 25.6H142.239C142.346 26.0267 142.399 26.56 142.399 27.2C142.399 27.8133 142.346 28.3467 142.239 28.8H143.439Z" fill="#D0F603"/>
</svg>

      </div>

        {
          isConnected && (
        <div className="fixed top-12 right-6 sm:right-10 z-101 flex items-center space-x-4">
          <button className="text-xl bg-[#383936] text-white flex px-3 py-1 border border-[#565948] cursor-pointer">
            <span role="img" aria-label="Small Icons" className="text-[#D0F603]">
              <Image
                src="/fluent_globe-12-filled.svg"
                height={24}
                width={24}
                alt="logo"
              />
            </span>
            <h4 className="ml-2">{registriesCount !== null ? registriesCount : 'Loading...'}</h4>
          </button>
          <button className="text-xl bg-[#383936] text-white px-3 py-1 border border-[#565948] cursor-pointer">
            <span
              role="img"
              aria-label="Four Question Marks"
              className="text-[#D0F603] text-xl"
            >
              ????
            </span>
          </button>
          <button
            onClick={logout}
            className="px-6 py-1 bg-gray-900 text-lg mr-2 border border-gray-900 hover:bg-gray-800 transition-colors duration-300"
          >
            Disconnect
          </button>
        </div>
          )
        }

    </div>
    )
  }

};

export default Header;
