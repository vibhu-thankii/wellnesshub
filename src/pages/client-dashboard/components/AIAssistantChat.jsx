import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistantChat = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I\'m your wellness AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on your recent activity, I notice you\'ve been consistent with your yoga sessions. That\'s great progress!",
        "I can help you find trainers that match your wellness goals. What type of session are you looking for?",
        "Your sleep patterns have improved by 15% this week. Keep up the good work!",
        "Would you like me to suggest some mindfulness exercises for stress management?",
        "I see you haven't logged your water intake today. Staying hydrated is important for your wellness journey."
      ];

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickSuggestions = [
    "Find yoga trainers near me",
    "Track my progress",
    "Schedule a session",
    "Meditation recommendations"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 micro-interaction z-50"
      >
        <Icon name="MessageCircle" size={24} className="mx-auto" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-background rounded-card border border-border-light shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-light">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={16} className="text-primary-foreground" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-text-primary">
              AI Assistant
            </h4>
            <p className="text-xs text-text-secondary">
              Always here to help
            </p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-1 text-text-secondary hover:text-text-primary micro-interaction"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-button text-sm ${
                message.type === 'user' ?'bg-primary text-primary-foreground' :'bg-surface-100 text-text-primary'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface-100 text-text-primary p-3 rounded-button">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="text-xs bg-surface-100 text-text-secondary px-2 py-1 rounded-button hover:bg-surface-200 micro-interaction"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border-light">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 bg-surface-100 border border-border rounded-button px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            iconName="Send"
          >
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantChat;