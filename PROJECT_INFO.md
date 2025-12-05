# PixScribe - Project Information

## 📋 Overview

PixScribe is a modern web application that uses AI to generate images from text descriptions. Built with React and powered by Pollinations.ai's free API.

## 🎯 What It Does

- Takes text input from users (e.g., "a sunset over mountains")
- Sends request to AI image generation API
- Displays the generated image
- Allows users to save images to a local gallery
- Stores images in browser's LocalStorage

## 🏗️ Architecture

### Frontend (React App)
- **Port**: 5173
- **Framework**: React 19 with Vite
- **Styling**: TailwindCSS v4
- **Routing**: React Router v7
- **Animations**: Framer Motion

### Backend (Proxy Server)
- **Port**: 3001
- **Framework**: Express.js
- **Purpose**: Forward requests to Pollinations.ai API
- **Why needed**: Avoids CORS issues

### AI API
- **Service**: Pollinations.ai
- **Cost**: 100% Free
- **Authentication**: None required
- **Endpoint**: `https://image.pollinations.ai/prompt/`

## 📊 Data Flow

```
1. User enters text prompt in React app
2. React app sends POST request to localhost:3001/api/generate-image
3. Express server forwards request to Pollinations.ai
4. Pollinations.ai generates image
5. Express server returns image to React app
6. React app displays image
7. User can save image to LocalStorage
```

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main React component with routing |
| `src/pages/Generate.jsx` | Image generation page |
| `src/utils/api.js` | API integration logic |
| `src/utils/storage.js` | LocalStorage management |
| `server.js` | Express proxy server |
| `start.ps1` | Startup script |

## 🚀 How to Run

### Quick Start
```powershell
.\start.ps1
```

### Manual Start
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

## 🔧 Configuration

### No API Keys Needed!
The app uses Pollinations.ai which requires no authentication.

### Ports
- Frontend: 5173
- Proxy Server: 3001

### Storage
- Images saved to browser's LocalStorage
- Stored as base64 encoded strings
- Managed in `src/utils/storage.js`

## 📦 Dependencies

### Production
- `react` - UI framework
- `react-dom` - React DOM rendering
- `react-router-dom` - Routing
- `framer-motion` - Animations
- `tailwindcss` - Styling
- `express` - Proxy server
- `cors` - CORS handling
- `node-fetch` - HTTP requests

### Development
- `vite` - Build tool
- `eslint` - Code linting
- `@vitejs/plugin-react` - Vite React plugin

## 🎨 Features

### Current Features
- ✅ AI image generation
- ✅ Local gallery
- ✅ Image download
- ✅ Dark mode UI
- ✅ Responsive design
- ✅ Example prompts

### Technical Features
- ✅ Client-side routing
- ✅ LocalStorage persistence
- ✅ Error handling
- ✅ Loading states
- ✅ Smooth animations

## 🔒 Security & Privacy

- No user data sent to external servers (except the prompt text)
- Images stored locally in browser
- No tracking or analytics
- No user accounts or authentication
- Open source code

## 🌐 Browser Compatibility

- Chrome (recommended)
- Edge
- Firefox
- Safari
- Any modern browser with LocalStorage support

## 📈 Performance

- Image generation: 5-10 seconds
- Page load: < 1 second
- Smooth 60fps animations
- Optimized bundle size with Vite

## 🛠️ Development

### Tech Stack Choices

**Why React?**
- Component-based architecture
- Large ecosystem
- Excellent developer experience

**Why Vite?**
- Lightning-fast HMR
- Optimized builds
- Modern tooling

**Why TailwindCSS?**
- Utility-first approach
- Rapid development
- Consistent design

**Why Pollinations.ai?**
- Completely free
- No API key required
- Reliable uptime
- Good image quality

## 📝 Notes

- First-time setup requires `npm install`
- Both servers must run simultaneously
- Images are stored in browser (not on server)
- Clearing browser data will delete saved images
- No backend database required

---

**For full documentation, see README.md**
