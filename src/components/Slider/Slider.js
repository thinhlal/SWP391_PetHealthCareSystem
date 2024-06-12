import React, { useState, useEffect } from 'react';
import './Slider.css'; // Đảm bảo đã import CSS cho Slider component

function Slider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId); // Xóa interval khi component bị hủy
  }, [images]); // Thiết lập dependency là images

  return (
    <div className='slider'>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={
            index === currentIndex ? 'slider-item active' : 'slider-item'
          }
        />
      ))}
    </div>
  );
}

export default Slider;
