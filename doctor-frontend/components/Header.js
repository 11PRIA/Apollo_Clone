import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md py-3 px-4 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
      <Link href="/" className="flex items-center text-blue-600 font-bold text-xl">
  <img src="/images/apollo-logo.png" alt="Apollo 247" className="h-8 mr-2" />
  {/* Apollo247 */}
</Link>

        <nav className="space-x-4 text-sm text-gray-700">
          <Link href="/" className="hover:text-blue-600">Buy Medicines</Link>
          <Link href="/doctors" className="hover:text-blue-600">Find Doctors</Link>
          <Link href="/lab-tests" className="hover:text-blue-600">Lab Tests</Link>
          <Link href="/circle" className="hover:text-blue-600">Circle Membership</Link>
          <Link href="/health-records" className="hover:text-blue-600">Health Records</Link>
          <Link href="/diabetes-reversal" className="hover:text-blue-600">Diabetes Reversal</Link>
          <Link href="/buy-insurance" className="flex items-center hover:text-blue-600">
            Buy Insurance <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold ml-1 px-1 rounded">New</span>
          </Link>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Login</Link>
        </nav>
      </div>
    </header>
  );
}