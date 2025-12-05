import { motion } from 'framer-motion';
import { downloadImage } from '../utils/api';

const ImageCard = ({ imageUrl, prompt, onSave, onRegenerate, showActions = true, onDelete }) => {
  const handleDownload = () => {
    const filename = `pixscribe-${Date.now()}.png`;
    downloadImage(imageUrl, filename);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="card p-6 max-w-4xl mx-auto"
    >
      {/* Image Container */}
      <div className="relative rounded-xl overflow-hidden mb-6 bg-gray-700">
        <motion.img
          src={imageUrl}
          alt={prompt || 'Generated image'}
          className="w-full h-auto max-h-[70vh] object-contain mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
          whileHover={{ opacity: 1 }}
        >
          <p className="text-white text-center px-6 text-lg">
            {prompt}
          </p>
        </motion.div>
      </div>

      {/* Prompt Display */}
      {prompt && (
        <div className="mb-6 bg-gray-700 p-4 rounded-xl border border-gray-600">
          <p className="text-sm text-blue-400 font-semibold mb-2">Prompt:</p>
          <p className="text-gray-100">{prompt}</p>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex-1 min-w-[150px] px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>⬇️</span>
            Download
          </motion.button>

          {onSave && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSave}
              className="flex-1 min-w-[150px] px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-gray-600"
            >
              <span>💾</span>
              Save to Gallery
            </motion.button>
          )}

          {onRegenerate && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegenerate}
              className="flex-1 min-w-[150px] px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-gray-600"
            >
              <span>🔄</span>
              Regenerate
            </motion.button>
          )}

          {onDelete && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="flex-1 min-w-[150px] px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-gray-600"
            >
              <span>🗑️</span>
              Delete
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ImageCard;
