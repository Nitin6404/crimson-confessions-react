
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  username: string;
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate receiving messages from other users
  useEffect(() => {
    const simulatedMessages = [
      { text: "Hey there! How's it going?", username: "Anonymous User 1" },
      { text: "I'm good too, just chilling. What's on your mind?", username: "Anonymous User 1" },
      { text: "Hey guys, just joined! Anything interesting going on?", username: "Anonymous User 2" },
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < simulatedMessages.length) {
        const msg = simulatedMessages[messageIndex];
        setMessages(prev => [...prev, {
          id: Date.now() + messageIndex,
          text: msg.text,
          isUser: false,
          username: msg.username,
          timestamp: new Date()
        }]);
        messageIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        isUser: true,
        username: 'You',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm p-4 flex items-center space-x-4 border-b border-green-500/20">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-green-400" />
          <h1 className="text-xl font-semibold text-white">Anonymous Chat</h1>
        </div>
        <div className="flex-1"></div>
        <button
          onClick={() => navigate('/confessions')}
          className="text-green-400 hover:text-green-300 font-medium transition-colors"
        >
          Confessions
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${message.isUser ? 'order-2' : 'order-1'}`}>
              {!message.isUser && (
                <div className="text-xs text-gray-400 mb-1 px-3">
                  {message.username}
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white ml-auto'
                    : 'bg-gray-700 text-white'
                } shadow-lg`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              {message.isUser && (
                <div className="text-xs text-gray-400 mt-1 px-3 text-right">
                  You
                </div>
              )}
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              message.isUser ? 'order-1 mr-3 bg-gradient-to-r from-green-400 to-emerald-500' : 'order-2 ml-3 bg-gray-600'
            }`}>
              <span className="text-white text-sm font-semibold">
                {message.isUser ? 'Y' : 'A'}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-black/30 backdrop-blur-sm border-t border-green-500/20">
        <div className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700/50 text-white placeholder-gray-400 px-4 py-3 rounded-2xl border border-gray-600 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-2xl hover:from-green-500 hover:to-emerald-600 transition-all duration-200 shadow-lg"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
