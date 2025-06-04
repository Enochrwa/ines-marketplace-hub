
import ChatSystem from '@/components/chat/ChatSystem';

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
  return (
    <ChatSystem 
      isOpen={isOpen} 
      onClose={onClose} 
      contactId="1" // This would be dynamically set based on the seller
    />
  );
};

export default ChatModal;
