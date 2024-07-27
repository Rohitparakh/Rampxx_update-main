"use client";
import React from "react";
import { useDisconnect, useAccount } from "wagmi";
import Image from "next/image";
import "../style/point.css";

const DisconnectBtn = ({registriesCount}: {registriesCount: number}) => {
  const { disconnect } = useDisconnect();
  const { isConnected, isReconnecting, isConnecting } = useAccount();


  const logout = () => disconnect();
  

  return (
    <>
      {isConnected && !isConnecting && !isReconnecting && (
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
            <div
              role="img"
              aria-label="Four Question Marks"
              className="text-[#D0F603] text-xl"
            >
              ????
            </div>
          </button>
          <button
            onClick={logout}
            className="px-6 py-1 bg-gray-900 text-lg mr-2 border border-gray-900 hover:bg-gray-800 transition-colors duration-300"
          >
            Disconnect
          </button>
        </div>
      )}
    </>
  );
};

export default DisconnectBtn;
