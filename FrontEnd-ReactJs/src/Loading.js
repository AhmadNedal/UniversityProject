import React, { useState, useEffect } from 'react';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">.... جاري التحميل , انتظر من فضلك </h2>
          <div className="w-16 h-16 border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    </div>
  );
};

export default LoadingPage;
