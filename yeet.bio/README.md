# Personal Link Page

A stylish and fully customizable personal link page with a modern design.

![Personal Link Page Preview](https://placehold.co/600x400/8a43e2/ffffff?text=Personal+Link+Page+Preview)

## Installation

1. **Download the files** - Download all files from the repository
2. **Create an `assets` folder** - Add your media files (profile picture, video, audio, icons) to this folder
3. **Edit the `config.js` file** - Customize your page by editing this file
4. **Upload to hosting** - Host the files on your web hosting service or GitHub Pages

## File Structure

```
assets/
├── profilepic.jpg    # Your profile picture (can be .jpg, .jpeg, or .png)
├── favicon.png       # Your site favicon
├── video.mp4         # Background video
├── song.mp3          # Background audio
└── [icons].png       # Custom icons for your links
```

## Customization

All customization is done in the `config.js` file.

### Profile

```js
profile: {
    name: "Your Name",                // Displayed name
    bio: "\"Your quote\"",            // Quote or bio (with quotation marks)
    location: {
        enabled: true,                // Show/hide location
        text: "Paris, France"         // Your location
    },
    image: "./assets/profilepic.jpg", // Profile picture
    verified: true                    // Verification badge
}
```

### Page Settings

```js
page: {
    title: "Your Name - Links",       // Page title (shown in tab)
    footerText: "© 2024 - Created by...", // Footer text
    favicon: "./assets/favicon.png"   // Favicon
}
```

### Background Media

```js
background: {
    video: "./assets/video.mp4",      // Background video
    audio: "./assets/song.mp3",       // Background music
    audioAutoplay: true,              // Auto-play music
    audioStartTime: 0,                // Start music at this second
    audioFadeIn: 2                    // Audio fade-in duration in seconds
}
```

### Features

```js
features: {
    skipOverlay: false,               // Skip the "Click to Enter" screen
    themeSwitcher: true,              // Enable theme switcher button
}
```

### Custom Style

```js
styles: {
    profileBorderColor: "rgba(138, 43, 226, 0.7)", // Profile image border
    cardBgColor: "rgba(33, 33, 82, 0.4)",          // Cards background
    linkCardBgColor: "rgba(46, 46, 90, 0.4)",      // Link cards background
    fontFamily: "'Poppins', sans-serif",           // Font family
    glowColor: "rgba(138, 43, 226, 0.6)",          // Glow effects color
    socialIconColor: "#a990ff",                    // Social icons color
    cursorDotColor: "#a990ff",                     // Cursor dot color
    cursorOutlineColor: "rgba(138, 43, 226, 0.5)"  // Cursor outline color
}
```

### Social Media

```js
social: {
    discord: {
        enabled: true,                // Enable/disable this network
        url: "your-discord-id",       // Discord ID to copy
        copyToClipboard: true         // Copy ID instead of navigating
    },
    twitter: {
        enabled: true,
        url: "https://twitter.com/yourusername"
    },
    // More platforms...
}
```

### Custom Links

```js
links: [
    {
        title: "My Website",               // Link title
        url: "https://mywebsite.com",      // Link URL
        icon: "fas fa-globe",              // FontAwesome icon or image path
        iconColor: "#a990ff",              // Icon color
        enabled: true                      // Enable/disable this link
    },
    // More links...
]
```

## Icon Options

Two ways to specify icons for your links:

1. **FontAwesome icons** - Use class names like `fas fa-globe` or `fab fa-discord`
2. **Custom images** - Use paths to your own images (`./assets/my-icon.png`)

## Supported Platforms

- Discord (with ID copy option)
- Twitter
- Instagram
- YouTube
- Twitch
- GitHub
- TikTok
- Telegram
- LinkedIn
- Facebook
- Reddit
- Snapchat
- Spotify
- SoundCloud
- Medium
- Patreon
- Steam

## Features

- Modern design with purple neon effects
- Responsive layout for all devices
- Background video with fluid animations
- "Click to Enter" welcome screen
- Customizable profile card
- Social media and custom links
- Custom icon support
- Sound control with volume slider
- Light/Dark mode
- Custom cursor
- Smooth animations and transitions
- Easy configuration via a single file 