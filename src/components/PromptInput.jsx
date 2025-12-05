import { useState } from 'react';
import { motion } from 'framer-motion';

const PromptInput = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt);
    }
  };

  const examplePrompts = [
    'Cyberpunk city at night in anime style, ultra detailed',
    'Majestic dragon flying over mountains at sunset',
    'Futuristic spaceship interior with holographic displays',
    'Enchanted forest with glowing mushrooms and fireflies',
  ];

  const handleExampleClick = (example) => {
    setPrompt(example);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vision... (e.g., 'A serene lake surrounded by mountains at golden hour')"
            className="w-full px-6 py-4 bg-black/40 border-2 border-teal/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/50 transition-all resize-none shadow-lg"
            rows="4"
            disabled={isLoading}
          />
          
          {/* Character Count */}
          <div className="absolute bottom-3 right-3 text-sm text-teal/70 font-medium">
            {prompt.length} / 500
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          whileHover={{ scale: prompt.trim() && !isLoading ? 1.02 : 1 }}
          whileTap={{ scale: prompt.trim() && !isLoading ? 0.98 : 1 }}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
            prompt.trim() && !isLoading
              ? 'bg-teal text-white hover:shadow-xl hover:shadow-teal/60 hover:bg-teal-dark'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                ⚡
              </motion.span>
              Generating...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>✨</span>
              Generate Visual
            </span>
          )}
        </motion.button>
      </form>

      {/* Example Prompts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <p className="text-sm text-teal font-semibold mb-3">✨ Try these examples:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examplePrompts.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-left px-4 py-3 glass-card glass-card-hover text-sm text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border-teal/20"
            >
              {example}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PromptInput;
