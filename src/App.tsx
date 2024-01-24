import React, { useState } from 'react';
import './App.css';

import { MdHome, MdSettings, MdPerson, MdChat } from 'react-icons/md';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { TbChevronCompactRight, TbChevronCompactLeft } from 'react-icons/tb';

import Conversation from './components/Conversation';

function App() {
  // State to track whether the sidebar is visible
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className='flex flex-row min-h-screen bg-[#343a40] relative'>

      <div className={`sticky top-0 h-screen transition-width duration-500 ${isSidebarVisible ? 'w-72' : 'w-0'} bg-black text-white flex flex-col justify-between overflow-hidden`}>
        
        <div>
          <div className="px-4 py-2">
            <div className="sidebar-item flex items-center group">
              <MdHome className="mr-2 text-gray-400 group-hover:text-white" />
              <span className="group-hover:text-white">Taskvisory AI Assistant</span>
            </div>
            <div className="sidebar-item flex items-center group mt-2">
              <MdChat className="mr-2 text-gray-400 group-hover:text-white" />
              <span className="group-hover:text-white">New Chat</span>
            </div>
          </div>
          {/* ... other main sidebar content ... */}
        </div>
        
        <div>
          <div className="px-4 py-2">
            <div className="sidebar-item flex items-center group">
              <MdSettings className="mr-2 text-gray-400 group-hover:text-white" />
              <span className="group-hover:text-white">Settings</span>
            </div>
          </div>
          <div className="px-4 py-2">
            <div className="sidebar-item flex items-center group">
              <MdPerson className="mr-2 text-gray-400 group-hover:text-white" />
              <span className="group-hover:text-white">Andrew Lark</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-tab-icon" onClick={toggleSidebar} style={{ zIndex: 20, left: isSidebarVisible ? '18rem' : '0rem' }}>
        {isSidebarVisible ? (
          <TbChevronCompactLeft className="text-gray-500 text-4xl cursor-pointer" />
        ) : (
          <TbChevronCompactRight className="text-gray-500 text-4xl cursor-pointer" />
        )}
      </div>

      <div className="flex flex-col grow">
        <header className="sticky top-0 z-10 flex justify-end p-4 bg-[#343a40] text-white w-full">
          <RxOpenInNewWindow className="text-2xl cursor-pointer" />
        </header>
        <main className="grow flex justify-center items-center p-4">
          <div className="w-full max-w-4xl">
            <Conversation conversationId={"AEmtDjRXv2oWWsZYe74tc1HK"} />
          </div>
        </main>
        <footer className="sticky bottom-0 z-10 text-center text-xs font-medium bg-[#343a40] text-gray-500 py-2 w-full">
          &copy; 2023 Taskvisory, All rights reserved | To report any issues contact support | A Taskvisory Product
        </footer>
      </div>
    </div>
  );
}

export default App;
