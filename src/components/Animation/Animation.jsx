import React from 'react';
import  Lottie  from 'lottie-react';
import animation from './../assets/Animation - 1730366723190.json';

export default function Animation () {
  return (
    <Lottie 
      animationData={animation} 
      loop={true} // Chạy lại animation sau khi kết thúc
      style={{ width: 300, height: 300 }} // Tuỳ chỉnh kích thước
    />
  );
};

