import React, { useState } from 'react';
import { clsx } from 'clsx';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  isOnline?: boolean;
}

interface Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  avatar?: string;
}

const MessagesPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');

  // Mock data for chats
  const chats: Chat[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastMessage: 'Hey! How are you doing?',
      time: '2 min',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastMessage: 'The meeting is scheduled for tomorrow',
      time: '15 min',
      unread: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastMessage: 'Thanks for your help!',
      time: '1h',
      unread: 0,
      isOnline: true
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastMessage: 'Can we reschedule our call?',
      time: '3h',
      unread: 1,
      isOnline: false
    },
    {
      id: '5',
      name: 'James Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastMessage: 'Great work on the project!',
      time: '1d',
      unread: 0,
      isOnline: false
    }
  ];

  // Mock data for messages
  const messages: Message[] = [
    {
      id: '1',
      chatId: '1',
      content: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '2',
      chatId: '1',
      content: 'I\'m doing great! Just working on some new features for the car dashboard.',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      chatId: '1',
      content: 'That sounds exciting! What kind of features are you working on?',
      timestamp: '10:33 AM',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '4',
      chatId: '1',
      content: 'We\'re adding a new messaging system and improving the settings page. The UI is looking really clean!',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: '5',
      chatId: '1',
      content: 'Nice! I\'d love to see it when you\'re ready to show it off.',
      timestamp: '10:36 AM',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  const currentChat = chats.find(chat => chat.id === activeChat);
  const chatMessages = messages.filter(msg => msg.chatId === activeChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Chat List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white"
              placeholder="Search messages..."
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={clsx(
                'flex items-center p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors',
                activeChat === chat.id && 'bg-purple-50 border-purple-200'
              )}
            >
              <div className="relative flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={chat.avatar}
                  alt={chat.name}
                />
                {chat.isOnline && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 bg-green-400 rounded-full ring-2 ring-white" />
                )}
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {chat.name}
                  </p>
                  <p className="text-xs text-gray-500">{chat.time}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread && chat.unread > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={currentChat.avatar}
                    alt={currentChat.name}
                  />
                  {currentChat.isOnline && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 bg-green-400 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {currentChat.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {currentChat.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={clsx(
                    'flex',
                    message.isOwn ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={clsx(
                      'flex max-w-xs lg:max-w-md',
                      message.isOwn ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    {!message.isOwn && message.avatar && (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={message.avatar}
                        alt="Avatar"
                      />
                    )}
                    <div
                      className={clsx(
                        'px-4 py-2 rounded-lg',
                        message.isOwn
                          ? 'bg-purple-600 text-white mr-2'
                          : 'bg-gray-100 text-gray-900 ml-2'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={clsx(
                          'text-xs mt-1',
                          message.isOwn ? 'text-purple-200' : 'text-gray-500'
                        )}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Type your message..."
                    rows={1}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={clsx(
                    'inline-flex items-center px-4 py-3 rounded-lg font-medium transition-colors',
                    newMessage.trim()
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  )}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No chat selected</h3>
              <p className="mt-1 text-sm text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
