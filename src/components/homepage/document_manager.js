import React from 'react';

export default function Document() {
  return (
    <div className="min-h-screen bg-white p-4 flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-darkblue">Document Manager</h1>
        <button className="text-blue-600">
          <i className="fas fa-cog"></i>
        </button>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-2 gap-4 flex-grow">
        <div className="bg-blue-100 p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <i className="fas fa-folder text-blue-600 text-2xl"></i>
          </div>
          <h2 className="font-semibold text-blue-600">Health</h2>
          <p className="text-sm text-blue-600">24 Dec 2020</p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <i className="fas fa-folder text-purple-600 text-2xl"></i>
            <button className="text-gray-600">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <h2 className="font-semibold text-purple-600">Career</h2>
          <p className="text-sm text-purple-600">24 Dec 2020</p>
        </div>

        <div className="bg-pink-100 p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <i className="fas fa-folder text-pink-600 text-2xl"></i>
            <button className="text-gray-600">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <h2 className="font-semibold text-pink-600">Education</h2>
          <p className="text-sm text-pink-600">23 Dec 2020</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <i className="fas fa-folder text-blue-600 text-2xl"></i>
            <button className="text-gray-600">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <h2 className="font-semibold text-blue-600">Family</h2>
          <p className="text-sm text-blue-600">24 Dec 2020</p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <i className="fas fa-folder text-purple-600 text-2xl"></i>
            <button className="text-gray-600">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <h2 className="font-semibold text-purple-600">Finance</h2>
          <p className="text-sm text-purple-600">24 Dec 2020</p>
        </div>

        <div className="bg-pink-100 p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <i className="fas fa-folder text-pink-600 text-2xl"></i>
            <button className="text-gray-600">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <h2 className="font-semibold text-pink-600">Property</h2>
          <p className="text-sm text-pink-600">23 Dec 2020</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <i className="fas fa-folder text-blue-600 text-2xl"></i>
            <button className="text-gray-600">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <h2 className="font-semibold text-blue-600">Pattern</h2>
          <p className="text-sm text-blue-600">24 Dec 2020</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white flex justify-around items-center p-4">
        <button className="text-gray-600">
          <i className="fas fa-bell"></i>
        </button>
        <button className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
          <i className="fas fa-plus"></i>
        </button>
        <button className="text-gray-600">
          <i className="fas fa-check"></i>
        </button>
      </footer>
    </div>
  );
}

