import * as React from "react";
import './style/leaderBoard.css';

interface leaderBoardProps {
    isOpen: boolean;
    onClose: () => void;
  }

const LeaderBoard : React.FC<leaderBoardProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

  return (
    <>
    <div className="div leaderBoard">
    <p onClick={onClose} style={{cursor:'pointer', position:'absolute', top:'5px', right: '30px', fontSize: '40px'}}>x</p>
  <div className="leaderBoardInner">
    <div className="leaderBoardHeader">
      <div className="leaderBoardTitle" style={{color:'#D0F603'}}>LEADERBOARD</div>
      <div className="leaderBoardNumbers">
        <div className="top-10">TOP 10</div>
        <div className="leaderBoardUsersHolder">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/187176a23679f9d6b0a3723a5f1ab331b7c8cfb08d2ebd0f5e7d90196892f4c9?"
            className="img"
          />
          <div className="leaderBoardUsers">640</div>
        </div>
      </div>
    </div>
    <div className="leaderBoardSingle">
      <div className="leaderBoardSingleInner">
        <div className="leaderBoardPosition">420</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81d971b3b449b8bf7a69275c71c7b4a4b0989ed53a2e3e414e7750535ea668d?"
          className="userImage"
        />
        <div className="userNameHolder">
          <div className="userNameTitle">YOU</div>
          <div className="streaksHolder">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e30d6390767528835a9a4e979b2af97621cee9850770aa308bf8fa7646d5ea9e?"
              className="globeIcons"
            />
            <div className="streaksTitle">2 days Streaks</div>
          </div>
        </div>
      </div>
      <div className="leaderBoardSingleBadge">
        <div className="badgeNumber">3</div>
        <div className="badgeTitle">Badges</div>
      </div>
    </div>  
    <div className="leaderBoardSingle">
      <div className="leaderBoardSingleInner">
        <div className="leaderBoardPosition" style={{color:"#D0F603"}}>1</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81d971b3b449b8bf7a69275c71c7b4a4b0989ed53a2e3e414e7750535ea668d?"
          className="userImage"
        />
        <div className="userNameHolder">
          <div className="userNameTitle">YOU</div>
          <div className="streaksHolder">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e30d6390767528835a9a4e979b2af97621cee9850770aa308bf8fa7646d5ea9e?"
              className="globeIcons"
            />
            <div className="streaksTitle">2 days Streaks</div>
          </div>
        </div>
      </div>
      <div className="leaderBoardSingleBadge">
        <div className="badgeNumber">3</div>
        <div className="badgeTitle">Badges</div>
      </div>
    </div>  
    <div className="leaderBoardSingle">
      <div className="leaderBoardSingleInner">
        <div className="leaderBoardPosition">2</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81d971b3b449b8bf7a69275c71c7b4a4b0989ed53a2e3e414e7750535ea668d?"
          className="userImage"
        />
        <div className="userNameHolder">
          <div className="userNameTitle">YOU</div>
          <div className="streaksHolder">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e30d6390767528835a9a4e979b2af97621cee9850770aa308bf8fa7646d5ea9e?"
              className="globeIcons"
            />
            <div className="streaksTitle">2 days Streaks</div>
          </div>
        </div>
      </div>
      <div className="leaderBoardSingleBadge">
        <div className="badgeNumber">3</div>
        <div className="badgeTitle">Badges</div>
      </div>
    </div>  
    <div className="leaderBoardSingle">
      <div className="leaderBoardSingleInner">
        <div className="leaderBoardPosition">3</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81d971b3b449b8bf7a69275c71c7b4a4b0989ed53a2e3e414e7750535ea668d?"
          className="userImage"
        />
        <div className="userNameHolder">
          <div className="userNameTitle">YOU</div>
          <div className="streaksHolder">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e30d6390767528835a9a4e979b2af97621cee9850770aa308bf8fa7646d5ea9e?"
              className="globeIcons"
            />
            <div className="streaksTitle">2 days Streaks</div>
          </div>
        </div>
      </div>
      <div className="leaderBoardSingleBadge">
        <div className="badgeNumber">3</div>
        <div className="badgeTitle">Badges</div>
      </div>
    </div>  
    <div className="leaderBoardSingle">
      <div className="leaderBoardSingleInner">
        <div className="leaderBoardPosition">4</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f81d971b3b449b8bf7a69275c71c7b4a4b0989ed53a2e3e414e7750535ea668d?"
          className="userImage"
        />
        <div className="userNameHolder">
          <div className="userNameTitle">YOU</div>
          <div className="streaksHolder">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e30d6390767528835a9a4e979b2af97621cee9850770aa308bf8fa7646d5ea9e?"
              className="globeIcons"
            />
            <div className="streaksTitle">2 days Streaks</div>
          </div>
        </div>
      </div>
      <div className="leaderBoardSingleBadge">
        <div className="badgeNumber">3</div>
        <div className="badgeTitle">Badges</div>
      </div>
    </div>  
  </div>
</div>

    </>
  );
}

export default LeaderBoard;