# PixScribe 🎨

**AI-Powered Text-to-Image Generator** — Transform your ideas into stunning visuals with AI

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react) ![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite) ![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎨 **AI Image Generation** - Convert text descriptions into images
- 💾 **Local Gallery** - Save and manage your creations
- 🌙 **Dark Mode UI** - Beautiful, modern interface
- ⚡ **100% Free** - No API keys, no signup, no limits
- 🚀 **Fast Generation** - Images ready in 5-10 seconds
- 🎯 **Example Prompts** - Get started instantly

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

**Option A: PowerShell Script (Easiest)**
```powershell
.\start.ps1
```

**Option B: Manual Start**

Open two separate terminals:

**Terminal 1 - Proxy Server:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will automatically open in Chrome at `http://localhost:5173`

## 🎯 How to Use

1. Navigate to the **Generate** page
2. Enter a text description (e.g., "A serene lake at sunset")
3. Click **Generate**
4. Wait 5-10 seconds
5. Save to gallery or download your image

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite 7** - Lightning-fast build tool
- **TailwindCSS v4** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Router v7** - Client-side routing

### Backend
- **Express.js** - Lightweight proxy server
- **Node.js** - JavaScript runtime
- **Pollinations.ai API** - Free AI image generation

### Storage
- **LocalStorage** - Browser-based gallery persistence

## 📁 Project Structure

```
pixscribe/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Loader.jsx      # Loading animations
│   │   ├── ImageCard.jsx   # Image display card
│   │   └── PromptInput.jsx # Input component
│   ├── pages/              # Page components
│   │   ├── Landing.jsx     # Home page
│   │   ├── Generate.jsx    # Image generation page
│   │   ├── Result.jsx      # Result display page
│   │   └── MyCreations.jsx # Gallery page
│   ├── utils/              # Utility functions
│   │   ├── api.js         # API integration
│   │   └── storage.js     # LocalStorage management
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── server.js              # Express proxy server
├── start.ps1              # Startup script
├── package.json           # Dependencies
└── vite.config.js         # Vite configuration
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (Port 5173) |
| `npm run server` | Start proxy server (Port 3001) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 AI Image Generation

### How It Works

```
User Input (Text Prompt)
    ↓
React Frontend
    ↓
Express Proxy Server (localhost:3001)
    ↓
Pollinations.ai API
    ↓
AI-Generated Image
    ↓
Display in Browser
```

### Why Pollinations.ai?

- ✅ **Completely Free** - No cost, unlimited generations
- ✅ **No API Key Required** - No signup or authentication
- ✅ **Fast** - 5-10 second generation time
- ✅ **High Quality** - Modern AI models
- ✅ **Reliable** - 99.9% uptime
- ✅ **No Rate Limits** - Generate as many images as you want

### Why a Proxy Server?

The Express proxy server:
- Avoids CORS issues with external APIs
- Provides a consistent interface
- Enables easy API switching in the future
- Handles errors gracefully

## 💡 Tips for Better Images

### Be Specific
❌ "A cat"
✅ "A fluffy orange cat sitting on a windowsill, photorealistic"

### Include Style
- "digital art"
- "oil painting"
- "photorealistic"
- "anime style"
- "watercolor"

### Mention Lighting
- "golden hour"
- "dramatic lighting"
- "soft glow"
- "neon lights"
- "sunset"

### Add Quality Terms
- "highly detailed"
- "4k"
- "professional"
- "masterpiece"
- "trending on artstation"

### Example Prompts

```
"A majestic dragon flying over a fantasy castle at sunset, highly detailed, digital art, 4k"

"Cozy coffee shop interior with warm lighting, wooden furniture, plants, photorealistic"

"Cyberpunk city street at night with neon signs, rain-soaked pavement, cinematic"

"Serene mountain lake reflecting snow-capped peaks, golden hour, landscape photography"
```

## 🔍 Key Components

### API Integration (`src/utils/api.js`)
- Handles image generation requests
- Communicates with proxy server
- Manages error states
- Converts responses to usable image URLs

### Storage Management (`src/utils/storage.js`)
- Saves images to browser LocalStorage
- Manages gallery data
- Handles CRUD operations
- Converts images to base64 for storage

### Proxy Server (`server.js`)
- Express.js server on port 3001
- Forwards requests to Pollinations.ai
- Handles CORS
- Returns images as buffers

## 🐛 Troubleshooting

### Servers Won't Start
- Ensure ports 3001 and 5173 are not in use
- Run `npm install` to install all dependencies
- Close all terminal windows and try again

### Images Not Generating
- Check that both servers are running
- Look at proxy server console for errors
- Try a simpler prompt first
- Check your internet connection

### Images Not Saving to Gallery
- Check if you're in private/incognito mode
- LocalStorage may be restricted
- Try clearing browser cache
- Check browser console for errors

### Chrome Doesn't Open Automatically
- Manually navigate to `http://localhost:5173`
- Check if Chrome is your default browser
- Try a different browser

## 📝 License

MIT License - Free to use for personal or commercial projects

## 🙏 Acknowledgments

- **Pollinations.ai** - Free AI image generation API
- **React Team** - Amazing UI framework
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Beautiful utility-first CSS
- **Framer Motion** - Smooth animations

---

**Made with ❤️ and React**
