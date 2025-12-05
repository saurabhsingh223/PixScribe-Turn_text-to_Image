import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log('Generating image for prompt:', prompt);

    // Using Pollinations.ai - completely free, no API key needed
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

    console.log('Fetching from Pollinations.ai...');
    const response = await fetch(imageUrl);

    if (!response.ok) {
      console.error('Pollinations API error:', response.status);
      return res.status(response.status).json({ 
        error: 'Failed to generate image',
        status: response.status 
      });
    }

    const imageBuffer = await response.arrayBuffer();
    res.set('Content-Type', 'image/jpeg');
    res.send(Buffer.from(imageBuffer));
    
    console.log('✅ Image generated successfully!');
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
  console.log(`🎨 Using Pollinations.ai - Free image generation (no API key needed)`);
});
