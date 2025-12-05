import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full mb-8 shadow-sm"
          >
            <span className="text-sm text-gray-300">Best text to image generator</span>
            <span>🔥</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold mb-6 text-white"
          >
            Turn text to{' '}
            <span className="text-gradient">image</span>, in seconds.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Unleash your creativity with AI. Turn your imagination into visual art in
            seconds - just type, and watch the magic happen.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/generate">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg inline-flex items-center gap-2"
              >
                Generate Images ✨
              </motion.button>
            </Link>
          </motion.div>

          {/* Sample Images Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto"
          >
            {[
              'https://picsum.photos/seed/ai1/400/400',
              'https://picsum.photos/seed/ai2/400/400',
              'https://picsum.photos/seed/ai3/400/400',
              'https://picsum.photos/seed/ai4/400/400',
              'https://picsum.photos/seed/ai5/400/400',
              'https://picsum.photos/seed/ai6/400/400'
            ].map((url, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <img
                  src={url}
                  alt={`AI generated sample ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>

          <p className="text-sm text-gray-400 mt-6">Generated images from PixScribe</p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">How it works</h2>
            <p className="text-gray-300 text-lg">Transform Words Into Stunning Images</p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8 flex items-start gap-6"
            >
              <div className="feature-icon flex-shrink-0">
                <span>👁️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Describe Your Vision</h3>
                <p className="text-gray-300">
                  "Type a phrase, sentence, or paragraph that describes the image you want to create."
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-8 flex items-start gap-6"
            >
              <div className="feature-icon flex-shrink-0">
                <span>🪄</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Watch the Magic</h3>
                <p className="text-gray-300">
                  "Our AI-powered engine will transform your text into a high-quality, unique image in seconds."
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card p-8 flex items-start gap-6"
            >
              <div className="feature-icon flex-shrink-0">
                <span>⬇️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Download & Share</h3>
                <p className="text-gray-300">
                  "Instantly download your creation or share it with the world directly from our platform."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Create AI Images</h2>
            <p className="text-gray-300 text-lg">Turn your imagination into visuals</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://picsum.photos/seed/ai-feature/800/800"
                alt="AI generated showcase"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">
                Introducing the AI-Powered Text to Image Generator
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Easily bring your ideas to life with our free AI image generator. Whether you
                need stunning visuals or unique imagery, our tool transforms your text into
                eye-catching images with just a few clicks. Imagine it, describe it, and watch it
                come to life instantly.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Simply type in a text prompt, and our cutting-edge AI will generate high-quality
                images in seconds. From product visuals to character designs and portraits, even
                concepts that don't yet exist can be visualized effortlessly. Powered by advanced
                AI technology, the creative possibilities are limitless!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            See the magic. Try now
          </h2>
          <Link to="/generate">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 shadow-lg inline-flex items-center gap-2"
            >
              Generate Images ✨
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-white">PixScribe</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <Link to="/generate" className="hover:text-white transition-colors">Generate</Link>
              <Link to="/my-creations" className="hover:text-white transition-colors">My Gallery</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} PixScribe. All rights reserved.</p>
            <p className="mt-2">Powered by AI • Built with React</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
