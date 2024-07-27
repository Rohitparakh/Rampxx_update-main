"use client";
import React, { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useAccount } from "wagmi";

const Web3ConnectBtn = () => {
  const { open } = useWeb3Modal();
  const { isConnected, isConnecting, isReconnecting, address } = useAccount();

  const [users, setUsers] = useState([]);


  const handleWalletConnect = () => open();

  const handleRegisterUser = async () => {
    try {
      const response = await fetch('/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({address: address }),
      });
      const data = await response.json();
      if (response.status === 409) {
        console.log('Client already exists');
      } else {
        console.log('Client registered successfully', data);
      }
    } catch (error: any) {
      console.log('Failed to register client:', error.message);
    }
  };

  useEffect(() => {
    if (isConnected) {
      handleRegisterUser();
    }
  }, [address, isConnected]);

  return (
    <>
      <div className="w-[300px]">
        {!isConnected && !isConnecting && !isReconnecting && (
          <button
            onClick={handleWalletConnect}
            className="relative inline-flex w-[300px] h-[90px] overflow-hidden p-[2px] hover:shadow-[0_0_20px_rgba(179,207,61,1)] transition-all duration-[400ms] group"
          >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#B3CF3D_0%,#000000_15%,#000000_100%)] group-hover:hidden" />
            <div className="inline-flex h-full w-full cursor-pointer items-center justify-center text-2xl bg-black bg-opacity-70 px-8 py-1 text-gray-50 backdrop-blur-3xl btn-fi">
              Connect
              <span className="btn-fi-line"></span>
              <Image
                src="/assets/images/line.svg"
                height={0}
                width={0}
                alt="tech-line"
                className="w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </button>
        )}
      </div>
    </>
  );
};

export default Web3ConnectBtn;
