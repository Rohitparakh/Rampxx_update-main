import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { shortenAddress } from "@/lib/utils";

interface Props {
  addresses: string[];
}

const Statistics = ({ addresses }: Props) => {
  const { isConnected, address, isConnecting, isReconnecting } = useAccount();
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      const alreadyRegistered = addresses.includes(address);
      setIsRegistered(alreadyRegistered);
    }
  }, [isConnected, address, addresses]);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentDateTime(dateTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-20 left-6 sm:left-10 lg:left-20 space-y-4 text-[#D0F603] leading-tight text-lg">
      <div className="flex flex-col">
        <span>{"//initialize onramp"}</span>
        <span>{`message.broadcast("Hello World"),`}</span>
      </div>

      <div className="flex flex-col">
        <span>
          {isMounted
            ? `console.log("${currentDateTime}")`
            : 'console.log("Loading...")'}
        </span>
        <span>
          Connection:{" "}
          {isConnecting || isReconnecting
            ? ""
            : isConnected
            ? shortenAddress(address)
            : "false"}
        </span>
        <span>
          User onramped:{" "}
          {isConnecting || isReconnecting
            ? ""
            : !isConnected
            ? "Pending connection"
            : address
            ? "Yes"
            : "No"}
        </span>
      </div>
    </div>
  );
};

export default Statistics;
