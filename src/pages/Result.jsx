import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ImageCard from '../components/ImageCard';
import Loader from '../components/Loader';
import { saveCreation } from '../utils/storage';
import { generateImage, blobUrlToBase64 } from '../utils/api';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(location.state);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  useEffect(() => {
    // Redirect to home if no image data
    if (!imageData) {
      navigate('/');
    }
  }, [imageData, navigate]);

  const handleSave = async () => {
    try {
      // Convert blob URL to base64 for localStorage
      const base64Image = await blobUrlToBase64(imageData.imageUrl);
      
      const success = saveCreation({
        imageUrl: base64Image,
        prompt: imageData.prompt,
      });

      if (success) {
        setSaveMessage('✅ Saved to My Creations!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('❌ Failed to save. Please try again.');
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage('❌ Failed to save. Please try again.');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    
    try {
      const newImageUrl = await generateImage(imageData.prompt);
      setImageData({
        imageUrl: newImageUrl,
        prompt: imageData.prompt,
      });
    } catch (error) {
      console.error('Regeneration error:', error);
      alert('Failed to regenerate image. Please try again.');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!imageData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Your Creation is Ready! ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Download it, save it to your gallery, or generate a new variation
          </p>
        </motion.div>

        {/* Save Message */}
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-xl text-center font-bold shadow-lg ${
              saveMessage.includes('✅')
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-500'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-2 border-red-500'
            }`}
          >
            {saveMessage}
          </motion.div>
        )}

        {/* Image Card or Loader */}
        {isRegenerating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-12 dark:bg-gray-800 dark:border-gray-700"
          >
            <Loader message="Regenerating your visual..." />
          </motion.div>
        ) : (
          <ImageCard
            imageUrl={imageData.imageUrl}
            prompt={imageData.prompt}
            onSave={handleSave}
            onRegenerate={handleRegenerate}
          />
        )}

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToHome}
            className="px-8 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-bold transition-all border border-gray-300 dark:border-gray-600"
          >
            ← Create Another
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/my-creations')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg"
          >
            View My Gallery →
          </motion.button>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card p-6 dark:bg-gray-800 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 Next Steps</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-lg">
            <li>• Click <strong className="text-gray-900 dark:text-white">Download</strong> to save the image to your device</li>
            <li>• Click <strong className="text-gray-900 dark:text-white">Save to Gallery</strong> to keep it in your collection</li>
            <li>• Click <strong className="text-gray-900 dark:text-white">Regenerate</strong> to create a new variation with the same prompt</li>
            <li>• Try different prompts to explore various artistic styles</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Result;
