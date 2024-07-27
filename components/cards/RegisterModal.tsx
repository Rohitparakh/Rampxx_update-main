"use client";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
// import { signMessage } from "viem/accounts";
import { useSignMessage, useAccount, useDisconnect } from "wagmi";
import { usePathname } from "next/navigation";
import { register } from "@/lib/actions/registry.action";
import Image from "next/image";
import { TypewriterEffectSmooth } from "../TypewriterEffect";
import { motion } from "framer-motion";

const fadeUp = {
  offScreen: {
    opacity: 0,
    y: 10,
  },
  onScreen: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: 0.5,
    },
  },
};

interface Props {
  addresses: string[];
}

// TODO - check to see if can remove !isConnecting && !isReconnecting && by looking for a disconnect on reload method
const RegisterModal = ({ addresses }: Props) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const { disconnect } = useDisconnect();
  const { isConnected, address, isConnecting, isReconnecting } = useAccount();

  const pathname = usePathname();

  const logout = () => disconnect();

  const alreadyRegistered = addresses.some((r) => r === address);


  const words = [
    {
      text: "The",
    },
    {
      text: "Future",
    },
    {
      text: "Awaits.",
      className: "text-a-fluo",
    },
  ];

  const handleRegister = async () => {
    setBtnLoading(true);

    try {
      await register({
        address,
        path: pathname,
      });

      toast.success("Successfully registered");
      setBtnLoading(false);
    } catch (e) {
      setBtnLoading(false);
      toast.error("Something went wrong");
    }
  };

  const { isLoading, isSuccess, signMessage } = useSignMessage({
    message: "The Future Awaits",
    onSuccess(data) {
      handleRegister();
    },
    onError(error) {
      setBtnLoading(false);
      toast.error("User rejected request");
    },
  });

  const handleClick = () => {
    // setBtnLoading(true);
    signMessage?.();
  };

  // console.log("loadeing", isLoading);

  return (
    // <>
    //   {!alreadyRegistered &&
    //     isConnected &&
    //     !isConnecting &&
    //     !isReconnecting && (
    //       <button
    //         onClick={handleClick}
    //         disabled={btnLoading || isLoading}
    //         className="relative inline-flex w-[300px] h-[90px]  overflow-hidden  p-[2px] hover:shadow-[0_0_20px_rgba(179,207,61,1)] transition-all duration-[400ms] group"
    //       >
    //         <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#B3CF3D_0%,#000000_15%,#000000_100%)] group-hover:hidden" />
    //         <div className="inline-flex h-full w-full cursor-pointer items-center justify-center text-2xl bg-black px-8 py-1  text-gray-50 backdrop-blur-3xl btn-fi">
    //           {btnLoading
    //             ? "Registering..."
    //             : isLoading
    //             ? "Sign message"
    //             : "Register"}
    //           <span className="btn-fi-line"></span>
    //           <Image
    //             src="/assets/images/line.svg"
    //             height={0}
    //             width={0}
    //             alt="tech-line"
    //             className="w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    //           />
    //         </div>
    //       </button>
    //     )}
    //   {alreadyRegistered && isConnected && !isConnecting && !isReconnecting && (
    //     <TypewriterEffectSmooth words={words} />
    //   )}
    // </>
    <>
      {!alreadyRegistered &&
        isConnected &&
        !isConnecting &&
        !isReconnecting && (
          <div className="fixed top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2 z-20">
            <motion.div
              variants={fadeUp}
              initial="offScreen"
              animate="onScreen"
              className="w-[400px]  bg-a-grey rounded-xl p-4 border border-dark-400"
            >
              <h1 className="text-a-green text-xl border-b border-gray-800 pb-2">
                Sign in
              </h1>

              <div className="mt-14 relative">
                <Image
                  src="/assets/images/register-modal-pattern.svg"
                  alt="pattern"
                  width={320}
                  height={320}
                  className="absolute left-1/2 -translate-x-1/2  top-[-80px]"
                />

                <p className="text-a-green text-4xl text-center ">
                  Sign in your Wallet
                  <br /> to Proceed
                </p>
                <p className="text-white text-xl text-center mt-6 leading-tight">
                  Rampx uses signatures to verify
                  <br /> the Wallet address.
                </p>
              </div>

              <div className="flex  flex-col items-center mt-10 gap-8  pb-6">
                <button
                  onClick={handleClick}
                  disabled={btnLoading || isLoading}
                  className="relative inline-flex w-[250px] h-[90px]  overflow-hidden  p-[2px] hover:shadow-[0_0_20px_rgba(179,207,61,1)] 
                transition-all duration-[400ms] group"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_270deg_at_50%_50%,#B3CF3D_0%,#0F0F11_15%,#0F0F11_100%)] group-hover:hidden" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center text-2xl bg-a-grey bg-opacity-50 px-8 py-1  text-gray-50 backdrop-blur-3xl btn-fi">
                    {btnLoading
                      ? "Registering..."
                      : isLoading
                      ? "Sign message"
                      : "Continue"}
                    <span className="btn-fi-line"></span>
                  </div>
                </button>

                <button
                  onClick={logout}
                  disabled={btnLoading || isLoading}
                  className="relative inline-flex w-[250px] h-[90px]  overflow-hidden  p-[2px] hover:shadow-[0_0_20px_rgba(179,207,61,1)] 
                transition-all duration-[400ms] group"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#B3CF3D_0%,#0F0F11_15%,#0F0F11_100%)] group-hover:hidden" />
                  <div
                    className="inline-flex h-full w-full cursor-pointer items-center justify-center text-2xl bg-gray-600 bg-opacity-30 px-8 py-1  
                text-gray-50 backdrop-blur-3xl btn-fi"
                  >
                    <p className="text-white  ">Disconnect</p>
                    <span className="btn-fi-line"></span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      {!alreadyRegistered &&
        isConnected &&
        !isConnecting &&
        !isReconnecting && (
          <div className="bg-black h-screen w-full fixed top-0 z-10 bg-opacity-50" />
        )}
    </>
  );
};

export default RegisterModal;
