import * as React from "react";
import './style/lottery.css';
import lotteryImage from '../assets/lottery.png';
interface lotteryProp {
    isOpen: boolean;
    onClose: () => void;
  }

const Lottery : React.FC<lotteryProp> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
    
  return (
    <>
      <div className="lottery div">
      <p onClick={onClose} style={{cursor:'pointer', position:'absolute', top:'5px', right: '30px', fontSize: '40px',zIndex:'99'}}>x</p>
  <div className="lotteryOuter">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/8dd10f79fb74742a6c302127e954fafd0e4b2b935f7583b3774f37113fe40c10?"
      className="img"
    />
    <div className="lotteryInner">
      <div className="lotteryHeading" style={{color:'#D0F603'}}>LOTTERY</div>
      <div className="lotteryMessage">
        Welcome to the Lottery page! This is your chance to win exciting prizes
        and rewards. Participate in our lottery by completing simple tasks, such
        as liking, sharing, or commenting on our posts. Check back often to see
        if you're a lucky winner and discover the latest prizes up for grabs.
        Good luck!
      </div>
      <div className="youAreIn">You are in</div>
      <img
        loading="lazy"
        src={lotteryImage.src}
        className="lotteryImage"
      />
      <div className="timer">23:43:56</div>
    </div>
  </div>
</div>
    </>
  );
}

export default Lottery;