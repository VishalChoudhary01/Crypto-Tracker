import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Toast = ({ showFeedback, isSaved }) => {
  const isSuccess = isSaved(showFeedback);
  
  return (
    <AnimatePresence>
    {showFeedback && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ 
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 0.3
        }}
        className="fixed z-40 top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 "
      >
        <div className={`
          relative flex items-center space-x-2 sm:space-x-3 p-3 md:top-8 top-11  sm:p-4 pr-4 sm:pr-6 
          rounded-lg sm:rounded-xl md:w-[calc(100vw-10rem)]  max-w-[200px] sm:max-w-[190px]
          ${isSuccess ? 'bg-green-900/40' : 'bg-red-900/40'}
          border ${isSuccess ? 'border-green-800/80' : 'border-red-800/80'}
          backdrop-blur-lg shadow-2xl ${isSuccess ? 'shadow-green-900/10' : 'shadow-red-900/10'}
          text-xs sm:text-sm font-medium
        `}>
          <div className="shrink-0">
            {isSuccess ? (
              <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            ) : (
              <FaTimesCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            )}
          </div>
          
          <span className={`${isSuccess ? 'text-green-200 md:text-[0.9rem] text-[0.7rem]' : 'text-red-200 md:text-[0.9rem] text-[0.7rem]'}`}>
            {isSuccess ? "Coin Saved!" : "Coin Removed!"}
          </span>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'linear' }}
            className={`absolute bottom-0 left-0 h-[2px] ${isSuccess ? 'bg-green-400/30' : 'bg-red-400/30'} rounded-full`}
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};

export default Toast;