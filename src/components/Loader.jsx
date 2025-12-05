import { motion } from 'framer-motion';

const Loader = ({ message = 'Creating your image...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Animated Spinner */}
      <div className="relative w-20 h-20 mb-8">
        <motion.div
          className="absolute inset-0 border-4 border-gray-700 rounded-full"
        />
        <motion.div
          className="absolute inset-0 border-4 border-blue-400 rounded-full border-t-transparent"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-xl font-semibold text-white mb-2">{message}</p>
        <p className="text-sm text-gray-300">This may take 20-30 seconds</p>
        <motion.div
          className="flex gap-1 justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
