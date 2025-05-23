import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import "../styles/swiper.css"; // Import your CSS styles

const SwipeToOrder = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  
  const containerWidth = 320;
  const buttonWidth = 60;
  const maxDrag = containerWidth - buttonWidth - 8; // 8px padding

  const handleDrag = (event, info) => {
    const progress = Math.max(0, Math.min(1, info.offset.x / maxDrag));
    setDragProgress(progress);
  };

  const handleDragEnd = (event, info) => {
    const progress = info.offset.x / maxDrag;
    if (progress > 0.8) {
      setIsCompleted(true);
      console.log('Order placed!');
    } else {
      setDragProgress(0);
    }
  };

  return (
    <div className="swipe-container">
      <div 
        className="swipe-track"
        style={{ width: containerWidth, height: 68 }}
      >
        {/* Background fill that follows drag progress */}
        <motion.div
          className="swipe-fill"
          initial={{ width: buttonWidth }}
          animate={{ 
            width: isCompleted ? '100%' : `${buttonWidth + dragProgress * maxDrag}px` 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Text */}
        <div className="swipe-text">
          {isCompleted ? 'Order Placed!' : 'Swipe to Order'}
        </div>

        {/* Draggable button */}
        <motion.div
          className="swipe-button"
          style={{ width: buttonWidth, height: buttonWidth }}
          drag={!isCompleted ? "x" : false}
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.1}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={{ 
            x: isCompleted ? maxDrag : dragProgress * maxDrag,
            backgroundColor: isCompleted ? '#10b981' : '#D9D9D9'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          whileDrag={{ scale: 1.05 }}
        >
          {isCompleted ? (
            <Check className="swipe-icon check" />
          ) : (
            <ArrowRight className="swipe-icon arrow" />
          )}
        </motion.div>

        {/* Shine effect */}
        <motion.div
          className="shine-effect"
          initial={{ x: -100 }}
          animate={{ x: isCompleted ? containerWidth : -100 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            delay: isCompleted ? 0.2 : 0
          }}
        />
      </div>
    </div>
  );
};

export default SwipeToOrder;
