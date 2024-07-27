import * as React from "react";
import './style/earnBadges.css';

interface earnBadgesProp {
    isOpen: boolean;
    onClose: () => void;
  }

const EarnBadges : React.FC<earnBadgesProp> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

  return (
    <>
      <div className="div earn">
        <p onClick={onClose} style={{cursor:'pointer', position:'absolute', top:'5px', right: '30px', fontSize: '40px'}}>x</p>
    <div className="earnOuter">
      <div className="earnInner">
        <div className="earnHeading" style={{color:'#D0F603'}}>EARN BADGES</div>
        <div className="earnParagraph">
          Here’s your chance to earn exclusive badges by engaging with our
          content on X (formerly Twitter). Like, retweet, and share our posts to
          collect badges and showcase your support.Start interacting now and
          watch your badge collection grow!
        </div>
        <div className="earnLower">
          <div className="earnLowerInner">
            <img
              loading="lazy"
              src="..."
              className="img"
            />
            <div className="twitterRight">
              <div className="userNameHolder">
                <div className="userName">
                  <div className="userNameVerified">
                    <div className="userName">Rampx</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a57917df05b006ad3a4bb5e0bcb3c0c0027d8296adfc0c44f7ea4c4c4dd27a15?"
                      className="verifiedBadge"
                    />
                  </div>
                  <div className="userId">@RampxProtocol</div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/60dac6c0b75f41ecee9a24157f77f629ad505ec520c1249c05400e77f1d2c510?"
                  className="twitterLogo"
                />
              </div>
              <div className="twitterDescription">gm</div>
              <div className="twitterImageHolder">
                <div className="twitterImage">
                  <img
                    loading="lazy"
                    src="..."
                    className="img-4"
                  />
                  <img
                    loading="lazy"
                    src="..."
                    className="img-5"
                  />
                </div>
              </div>
              <div className="twitterBottom">
                <div className="likeRetweet">
                  <div className="retweetHolder">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0589837c755835b99f8938c2cf4671f7e2a980509d7a6c450d1889205715671?"
                      className="retweetIcon"
                    />
                    <div className="retweetCount">2</div>
                  </div>
                  <div className="likeHolder">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a61f2f457c01dbc04638c34fd6c51bd497230e0296821e3fc66121d18cdd8f77?"
                      className="likeIcon"
                    />
                    <div className="likeCount">7</div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/785210acff7503fbe02335b5db182a710f55c9166d87144e6cb3c34b639063a7?"
                  className="infoIcon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    </>
  );
}

export default EarnBadges;