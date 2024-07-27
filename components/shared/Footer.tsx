import React from 'react'

const Footer = () => {

    const instanceArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="fixed bottom-0 flex overflow-x-hidden w-full text-xl">
    <div className="animate-marquee whitespace-nowrap text-a-green">
      {instanceArray.map((id) => (
        <span key={id} className=" mx-4">
          Probably Something
        </span>
      ))}
    </div>

    <div className="absolute top-0  animate-marquee2 whitespace-nowrap text-a-green">
      {instanceArray.map((id) => (
        <span key={id} className=" mx-4">
          Probably Something
        </span>
      ))}
    </div>
  </div>
  )
}

export default Footer