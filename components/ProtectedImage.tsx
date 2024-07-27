import React from 'react';
import Image, { ImageProps } from 'next/image';

const ProtectedImage: React.FC<ImageProps> = (props) => {
  return (
    <div className="relative select-none">
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      ></div>
      <Image 
        {...props} 
        className={`pointer-events-none noselect ${props.className || ''}`}
        unoptimized
        draggable="false"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
        alt={props.alt || 'Protected image'}
      />
    </div>
  );
};

export default ProtectedImage;
