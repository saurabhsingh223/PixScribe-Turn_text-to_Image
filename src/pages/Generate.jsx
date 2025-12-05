import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { generateImage } from '../utils/api';
import Loader from '../components/Loader';

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image');
      return;
    }

    if (prompt.trim().length < 3) {
      setError('Prompt should be at least 3 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage({ url: imageUrl, prompt });
      
      // Navigate to result page with the image
      setTimeout(() => {
        navigate('/result', { state: { imageUrl, prompt } });
      }, 500);
    } catch (err) {
      setError(err.message || 'Failed to generate image. Please try again.');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Create AI Images
          </h1>
          <p className="text-gray-300 text-base">
            Turn your imagination into visuals
          </p>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card p-8"
            >
              <Loader message="Creating your image..." />
            </motion.div>
          ) : generatedImage ? (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card p-6"
            >
              <img
                src={generatedImage.url}
                alt={generatedImage.prompt}
                className="w-full rounded-xl"
              />
              <p className="text-sm text-gray-300 mt-4 text-center">Loading...</p>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card p-6"
            >
              {/* Image Preview Area */}
              <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-teal-900/20 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Your generated image will appear here</p>
                </div>
              </div>

              {/* Input Area */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe what you want to generate"
                  className="flex-1 px-6 py-3 bg-gray-700 border-none rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Generate
                </motion.button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-red-400 text-sm font-medium mb-2">⚠️ Error</p>
                  <p className="text-red-300 text-sm whitespace-pre-line">{error}</p>
                </motion.div>
              )}

              {/* Example Prompts */}
              <div className="mt-8">
                <p className="text-sm font-medium text-gray-300 mb-3">Try these examples:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'A serene lake surrounded by mountains at golden hour',
                    'Cyberpunk city street at night with neon lights',
                    'Cozy coffee shop interior with warm lighting',
                    'Majestic dragon flying over a fantasy castle',
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        {!isLoading && !generatedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 card p-4"
          >
            <h3 className="font-semibold text-white mb-2">💡 Tips for better results:</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Be specific about what you want to see</li>
              <li>• Include details about style, lighting, and mood</li>
              <li>• Mention quality keywords like "detailed", "high quality", "4k"</li>
              <li>• First generation may take 20-30 seconds as the model loads</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generate;
