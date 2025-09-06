# Deployment Guide

This guide covers various ways to deploy Global Thermonuclear War to the web.

## 🚀 Quick Deploy Options

### 1. GitHub Pages (Recommended)

1. **Create a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/global-thermonuclear-war.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" folder
   - Click "Save"

3. **Access your game**:
   - Your game will be available at: `https://yourusername.github.io/global-thermonuclear-war`

### 2. Netlify (Easiest)

1. **Drag and Drop**:
   - Go to [netlify.com](https://netlify.com)
   - Drag the entire project folder to the deploy area
   - Your site will be live instantly!

2. **Git Integration**:
   - Connect your GitHub repository
   - Netlify will auto-deploy on every push

### 3. Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

### 4. Any Static Hosting

Upload these files to any web hosting service:
- `index.html`
- `styles.css`
- `game.js`
- `README.md`

## 🔧 Local Development

### Using Python (Built-in)
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

### Using Node.js
```bash
# Install a simple server
npm install -g http-server

# Run the server
http-server -p 8000
```

### Using PHP
```bash
php -S localhost:8000
```

## 📱 Mobile Optimization

The game is already mobile-optimized with:
- Responsive design
- Touch-friendly controls
- Optimized board size for small screens
- Mobile-first CSS

## 🔍 SEO Optimization

For better search engine visibility, add these meta tags to `index.html`:

```html
<meta name="description" content="Play Global Thermonuclear War - A retro chess game inspired by WarGames">
<meta name="keywords" content="chess, war games, retro, nuclear war, strategy game">
<meta name="author" content="Your Name">
<meta property="og:title" content="Global Thermonuclear War">
<meta property="og:description" content="A retro-styled chess game inspired by WarGames">
<meta property="og:type" content="website">
<meta property="og:url" content="https://your-domain.com">
```

## 🎯 Performance Tips

1. **Enable Gzip compression** on your server
2. **Set proper cache headers** for static assets
3. **Use a CDN** for faster global access
4. **Minify CSS/JS** for production (optional)

## 🛠️ Custom Domain

### GitHub Pages
1. Add a `CNAME` file with your domain name
2. Configure DNS to point to GitHub Pages

### Netlify
1. Go to Domain Settings
2. Add your custom domain
3. Configure DNS as instructed

## 📊 Analytics

Add Google Analytics to track usage:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security

- No sensitive data is stored
- No user authentication required
- All game logic runs client-side
- Safe to deploy on any hosting platform

## 📈 Monitoring

Consider adding:
- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Performance monitoring (Google PageSpeed Insights)

---

**Ready to deploy?** Choose your preferred method and get your game live! 🚀
