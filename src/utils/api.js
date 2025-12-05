// HuggingFace API integration for text-to-image generation

// Available models (in order of preference)
const MODELS = [
  'stabilityai/stable-diffusion-xl-base-1.0',  // Primary - SDXL, high quality
  'runwayml/stable-diffusion-v1-5',            // Fallback - SD 1.5, reliable
  'CompVis/stable-diffusion-v1-4',             // Fallback - SD 1.4
];

// Using local proxy server to avoid CORS issues
const PROXY_API_URL = 'http://localhost:3001/api/generate-image';

// Note: Users should add their own HuggingFace API token
// Get one free at: https://huggingface.co/settings/tokens
const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN || '';

// Check if API token is configured
const isTokenConfigured = () => {
  return API_TOKEN && API_TOKEN.length > 0 && API_TOKEN !== 'your_api_token_here';
};

/**
 * Generate an image from text prompt using HuggingFace API
 * @param {string} prompt - Text description for image generation
 * @returns {Promise<string>} Image URL (blob URL)
 * @throws {Error} If generation fails
 */
export const generateImage = async (prompt) => {
  if (!prompt || prompt.trim().length === 0) {
    throw new Error('Prompt cannot be empty');
  }

  // Check if token is configured
  if (!isTokenConfigured()) {
    throw new Error('API token not configured. Please add your HuggingFace API token to the .env file.\n\n' +
      'Steps:\n' +
      '1. Visit: https://huggingface.co/settings/tokens\n' +
      '2. Create a new token with "Read" permission\n' +
      '3. Copy the token (starts with hf_)\n' +
      '4. Open the .env file in your project root\n' +
      '5. Add: VITE_HUGGINGFACE_API_TOKEN=your_token_here\n' +
      '6. Restart the dev server (npm run dev)');
  }

  try {
    console.log('🚀 Starting image generation...');
    console.log('📝 Prompt:', prompt);
    console.log('🔑 Token configured:', isTokenConfigured());
    console.log('🌐 API URL:', PROXY_API_URL);

    let response;
    try {
      response = await fetch(PROXY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });
    } catch (fetchError) {
      console.error('❌ Network/Fetch error:', fetchError);
      throw new Error('Network error: Unable to connect to proxy server. Make sure the server is running (npm run server). Error: ' + fetchError.message);
    }

    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = '';
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('❌ Error response:', errorData);
          errorMessage = errorData.error || JSON.stringify(errorData);
        } else {
          const errorText = await response.text();
          console.error('❌ Error text:', errorText);
          errorMessage = errorText;
        }
      } catch (e) {
        console.error('❌ Could not parse error response:', e);
        errorMessage = 'Unknown error';
      }

      // Handle specific error cases
      if (response.status === 503) {
        throw new Error('Model is loading. Please wait 20-30 seconds and try again. (This is normal for the first request!)');
      } else if (response.status === 401) {
        throw new Error('Invalid API token. Please check your HuggingFace API key in the .env file.');
      } else if (response.status === 403) {
        throw new Error('Access forbidden. Your API token may not have the required permissions. Make sure you created a token with "Read" permission.');
      } else if (response.status === 404) {
        throw new Error('Model not found. The AI model may be temporarily unavailable. Please try again in a few moments.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a few minutes and try again.');
      } else if (response.status === 400) {
        throw new Error(`Bad request: ${errorMessage}`);
      } else {
        throw new Error(`Failed to generate image (${response.status}): ${errorMessage}`);
      }
    }

    console.log('✅ Response received, converting to blob...');

    // Convert response to blob
    const blob = await response.blob();
    console.log('✅ Blob created, size:', blob.size, 'bytes');
    
    // Create a blob URL
    const imageUrl = URL.createObjectURL(blob);
    console.log('✅ Image URL created:', imageUrl);
    
    return imageUrl;
  } catch (error) {
    console.error('❌ Image generation error:', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    // Re-throw with better error message
    if (error.message) {
      throw error;
    } else {
      throw new Error('Unknown error occurred during image generation. Check console for details.');
    }
  }
};

/**
 * Download image from blob URL
 * @param {string} imageUrl - Blob URL of the image
 * @param {string} filename - Desired filename for download
 */
export const downloadImage = (imageUrl, filename = 'pixscribe-creation.png') => {
  try {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
    throw new Error('Failed to download image');
  }
};

/**
 * Convert blob URL to base64 for localStorage
 * @param {string} blobUrl - Blob URL to convert
 * @returns {Promise<string>} Base64 encoded image
 */
export const blobUrlToBase64 = async (blobUrl) => {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error('Failed to convert image');
  }
};
