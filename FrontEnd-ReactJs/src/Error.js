import React from 'react';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">الصفحة غير موجودة</h2>
        <p className="mt-2 text-lg text-gray-600">عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
