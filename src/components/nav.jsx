import React from 'react';
import { Home, Library, User, Bell, History } from 'lucide-react';
import AuthModals from './modals';

const Navigation = ({ borrowedBooks, onHistoryClick, user }) => {
  return (
    <nav className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-sky-500">BookHub</h1>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <Home size={18} />
                <span>Home</span>
              </button>
              <button 
                onClick={onHistoryClick}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <History size={18} />
                <span>History</span>
              </button>
              {/* <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <Library size={18} />
                <span>My Books</span>
              </button> */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
              <Bell size={20} />
              {borrowedBooks.length > 0 && (
                <span className="absolute top-0 right-0 bg-sky-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {borrowedBooks.length}
                </span>
              )}
            </button>
            <p>{user && user}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;