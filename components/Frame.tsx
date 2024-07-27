import React from 'react';
import { useAccount } from 'wagmi';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-male-sprites';

const Frame = () => {
  const { address } = useAccount();

  const shortenAddress = (addr: any) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const avatar = createAvatar(style, {
    seed: address || 'default',
    dataUri: true,
  });

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-64 h-12 flex items-center">
      <div className="relative w-full h-full">
        <div className='w-[9rem] p-1 bg-[#121212]  border-[#1C1E14] h-full border-2 rounded-lg mx-auto'>
          <img
            src={avatar}
            alt="Avatar"
            className='h-full w-10 border rounded-lg bg-[#D0F603] border-[#1C1E14]'
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-vt323 text-1xl pl-9">
            {shortenAddress(address)}
          </span>
        </div>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
      </div>
    </div>
  );
};

export default Frame;
