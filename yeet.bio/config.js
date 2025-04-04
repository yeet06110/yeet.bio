// Configuration for your personal link page
// Edit these values to customize your page

const config = {
    // ======= PROFILE =======
    profile: {
        name: "YEET",                       // Your name
        bio: "\"no matter what ill succeed\"", // Your quote or bio
        location: {
            enabled: false,                 // true to show location, false to hide it
            text: "Paris, France"           // Your location
        },
        image: "./assets/profilepic.jpg",   // Profile picture (jpg, jpeg, png)
        verified: true                      // Verification badge (true to show, false to hide)
    },
    
    // ======= PAGE =======
    page: {
        title: "yeet",                      // Page title (shown in browser tab)
        footerText: "© 2025 - Created with passion by yeet8", // Footer text
        favicon: "./assets/favicon.png"     // Page icon
    },
    
    // ======= BACKGROUND =======
    background: {
        video: "./assets/video.mp4",        // Background video
        audio: "./assets/song.mp3",         // Background music
        audioAutoplay: true,                // Auto-play music
        audioStartTime: 34,                 // Start music at this second
        audioFadeIn: 2                      // Audio fade-in duration in seconds
    },
    
    // ======= FEATURES =======
    features: {
        skipOverlay: false,                 // Skip the "Click to Enter" screen
        themeSwitcher: true,                // Enable theme switcher button
    },
    
    // ======= STYLE =======
    styles: {
        // Colors and visual style
        profileBorderColor: "rgba(138, 43, 226, 0.7)", // Profile image border
        cardBgColor: "rgba(33, 33, 82, 0.4)",          // Cards background
        linkCardBgColor: "rgba(46, 46, 90, 0.4)",      // Link cards background
        fontFamily: "'Poppins', sans-serif",           // Font family
        glowColor: "rgba(138, 43, 226, 0.6)",          // Glow effects color
        socialIconColor: "#a990ff",                    // Social icons color
        
        // Custom cursor
        cursorDotColor: "#a990ff",                     // Cursor dot color
        cursorOutlineColor: "rgba(138, 43, 226, 0.5)"  // Cursor outline color
    },
    
    // ======= SOCIAL MEDIA =======
    // Enable/disable social networks (enabled: true/false)
    social: {
        discord: {
            enabled: true,                  // Show Discord
            url: "yeet8",                   // Discord ID to copy
            copyToClipboard: true           // true to copy ID instead of redirecting
        },
        twitter: {
            enabled: true,
            url: "https://twitter.com/yeetftn"
        },
        instagram: {
            enabled: false,
            url: "https://instagram.com/yourusername"
        },
        youtube: {
            enabled: true,
            url: "https://youtube.com/@yeetftn"
        },
        twitch: {
            enabled: false,
            url: "https://twitch.tv/yourusername"
        },
        github: {
            enabled: false,
            url: "https://github.com/yourusername"
        },
        tiktok: {
            enabled: false,
            url: "https://tiktok.com/@yourusername"
        },
        telegram: {
            enabled: false,
            url: "https://t.me/yourusername"
        }
    },
    
    // ======= CUSTOM LINKS =======
    // These are the buttons shown on your page
    links: [
        {
            title: "Xploit Website",           // Link title
            url: "https://xploit.shop",        // Link URL
            icon: "fas fa-globe",              // Icon (FontAwesome or image)
            iconColor: "#a990ff",              // Icon color
            enabled: true                      // true to show, false to hide
        },
        {
            title: "Xploit Discord",
            url: "https://discord.gg/xploitx",
            icon: "fab fa-discord",
            iconColor: "#a990ff",
            enabled: true
        },
        {
            title: "My YouTube Channel",
            url: "https://youtube.com/@yourchannel",
            icon: "fab fa-youtube",
            iconColor: "#a990ff",
            enabled: false
        },
        {
            title: "website source code",
            url: "https://github.com/yeet06110/yeet.bio",
            icon: "./assets/github.png",       // Example of custom icon
            iconColor: "#a990ff",
            enabled: true
        },
        {
            title: "My Shop",
            url: "https://shop.yourwebsite.com",
            icon: "./assets/shop-icon.png",
            iconColor: "#a990ff",
            enabled: false
        },
        {
            title: "My Music",
            url: "https://soundcloud.com/yourusername",
            icon: "./assets/music-icon.png",
            iconColor: "#a990ff",
            enabled: false
        },
        {
            title: "Support Me",
            url: "https://patreon.com/yourusername",
            icon: "./assets/support-icon.png",
            iconColor: "#a990ff",
            enabled: false
        }
    ]
}; 