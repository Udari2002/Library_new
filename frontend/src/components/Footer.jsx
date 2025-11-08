import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100 py-4 text-center">
      <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600">
        <div>© {new Date().getFullYear()} ShelfLife — Built with ❤️</div>
        <div className="mt-1">v0.1.0</div>
      </div>
    </footer>
  );
}
