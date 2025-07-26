'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TextBoxProps {
  lines: string[];
  onNext: () => void;
}

export default function TextBox({ lines, onNext }: TextBoxProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [previousLines, setPreviousLines] = useState<string[]>([]);
  const shouldStopTypingRef = useRef(false);

  const currentLine = lines[currentLineIndex] || '';

  useEffect(() => {
    // Check if we got new lines (new slide)
    const isNewSlide = JSON.stringify(lines) !== JSON.stringify(previousLines);
    
    if (isNewSlide) {
      setPreviousLines(lines);
      setCurrentLineIndex(0);
      setDisplayedText('');
      setIsTyping(true);
      shouldStopTypingRef.current = false;
      
      // Don't continue processing in this render cycle
      return;
    }
    
    if (currentLineIndex >= lines.length) {
      onNext();
      return;
    }

    if (!currentLine) {
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    shouldStopTypingRef.current = false;
    
    const typeText = async () => {
      const text = currentLine;
      for (let i = 0; i <= text.length; i++) {
        // Check if we should stop typing (user clicked)
        if (shouldStopTypingRef.current) {
          setDisplayedText(text);
          setIsTyping(false);
          shouldStopTypingRef.current = false;
          return;
        }
        
        setDisplayedText(text.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      setIsTyping(false);
    };

    typeText();
  }, [lines, currentLineIndex, currentLine, previousLines]);

  const handleClick = () => {
    if (isTyping) {
      // Signal the typing animation to stop immediately
      shouldStopTypingRef.current = true;
    } else {
      // Move to next line
      setCurrentLineIndex(prev => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-8"
      onClick={handleClick}
    >
      <div className="bg-black/80 retro-border rounded-lg p-8 cursor-pointer hover:bg-black/85 transition-colors">
        <div className="min-h-[140px] flex items-center justify-center">
          <div className="text-white font-pkmn text-base leading-loose text-center w-full">
            {displayedText}
            {showCursor && (
              <span className="animate-blink text-white ml-1">▌</span>
            )}
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="text-xs text-gray-300 font-pkmn">
            {isTyping ? 'Click to skip...' : 'Click to continue...'}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 