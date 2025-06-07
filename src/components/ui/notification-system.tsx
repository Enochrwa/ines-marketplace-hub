
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeNotification } from '@/store/slices/uiSlice';

const NotificationSystem = () => {
  const { notifications } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeNotification(id));
  };

  // Auto remove notifications after 5 seconds
  useEffect(() => {
    notifications.forEach(notification => {
      if (Date.now() - notification.timestamp > 5000) {
        dispatch(removeNotification(notification.id));
      }
    });
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`p-4 rounded-lg border shadow-lg backdrop-blur-sm ${getBackgroundColor(notification.type)}`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1 text-sm text-gray-800 dark:text-gray-200">
                {notification.message}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(notification.id)}
                className="h-6 w-6 p-0 hover:bg-black/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
