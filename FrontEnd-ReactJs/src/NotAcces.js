import React from 'react';

export default function NotAccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">ليس لديك صلاحية الوصول</h1>
        <p className="text-gray-600 mb-4">
          عذرًا، لا يمكنك الوصول إلى هذه الصفحة بسبب عدم وجود صلاحيات.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          العودة إلى الصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}
