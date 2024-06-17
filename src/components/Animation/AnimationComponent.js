import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animation/Animation - 1718517486011.json'; // Đường dẫn tới file JSON

const AnimationComponent = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ width: 232, height: 282 }}
      />
    </div>
  );
};

export default AnimationComponent;
