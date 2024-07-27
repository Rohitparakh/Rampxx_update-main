import React from 'react';
import Image from 'next/image';
import './../components/style/passportCreation.css'
import Header from "@/components/shared/Header";

interface PassportCreationProps {
  onClose: () => void;
  onGenerate: () => void;
}

const PassportCreation: React.FC<PassportCreationProps> = ({ onClose, onGenerate }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none w-full">          
      <div className="max-h-screen w-[100vw] flex items-center justify-center">
        <div className="max-h-[500px] w-[620px] rounded-2xl shadow-xl bg-gradient-to-br from-[#0D0D10] to-[#06060A] p-8 flex flex-col items-center justify-end overflow-hidden relative pointer-events-auto">
          {/* Subtle gradient in the bottom-right corner only */}
          <div className="absolute bottom-0 right-0 w-[250px] h-[150px] bg-gradient-to-br from-transparent via-transparent to-[#D0F603] opacity-15"></div>

          {/* Passport Image */}
          <div className="passimg relative w-full h-[240px] max-w-[370px] overflow-hidden rounded-t-2xl">
            <Image
              src="/pass.png"
              alt="Passport Image"
              layout="fill"
              objectFit="cover"
              className="rounded-t-2xl"
            />
          </div>

          {/* Content Section */}
          <section className="flex flex-col items-center justify-center gap-6 mt-6 text-center text-white relative z-10">
            <h1 className="passtext">Let&apos;s Create your Passport</h1>
            <p className="passtext2">Onramping you to the Rampx ecosystem</p>
          </section>

          {/* Generate Button */}
          <div className="w-[394px] flex flex-col items-center justify-center py-0 px-[50px] box-border max-w-full mq394:pl-5 mq394:pr-5 mq394:box-border relative z-10">
            <button
              onClick={onGenerate}
              className="genbtn"
              style={{ color: '#b3cf3d', transition: 'color 0.3s' }}
            >
              <span className="gentext relative z-10 text-3xl tracking-0.02em leading-32px font-vt323 text-center inline-block min-w-81px">
                Generate
              </span>
              <div 
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-[1px] bg-[#b3cf3d]"
                style={{
                  boxShadow: '0 0 5px #b3cf3d, 0 0 6px #b3cf3d',
                  transition: 'box-shadow 0.6s',
                }}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportCreation;