
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Phone, Video, MoreVertical, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller: {
    name: string;
    avatar: string;
    reputation: number;
    verified: boolean;
  };
  itemTitle: string;
}

const ChatModal = ({ isOpen, onClose, seller, itemTitle }: ChatModalProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm interested in your item. Is it still available?",
      sender: 'me',
      time: '2:30 PM'
    },
    {
      id: 2,
      text: "Yes, it's still available! Would you like to see it in person?",
      sender: 'other',
      time: '2:32 PM'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 1,
      text: message,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md h-[600px] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white p-4 rounded-t-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-3">
              <img src={seller.avatar} alt={seller.name} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold">{seller.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs ml-1">{seller.reputation}</span>
                  </div>
                  {seller.verified && (
                    <Badge className="text-xs bg-green-500 text-white">Verified</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <MoreVertical className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-300 truncate">About: {itemTitle}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'me' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Button 
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatModal;
