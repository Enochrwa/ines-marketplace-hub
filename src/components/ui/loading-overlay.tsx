
import { motion } from 'framer-motion';
import LoadingSpinner from './loading-spinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

const LoadingOverlay = ({ isLoading, message = 'Loading...', className = '' }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center"
      >
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          {message}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;
