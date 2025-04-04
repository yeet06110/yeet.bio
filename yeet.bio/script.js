// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply configuration
    applyConfig();
    
    // Handle overlay and audio/video
    setupOverlay();
    
    // Handle sound control
    setupSoundControl();
    
    // Add animations
    setupAnimations();
    
    // Dark/Light mode toggle if enabled
    setupThemeSwitcher();
    
    // Setup custom cursor
    setupCustomCursor();
});

function applyConfig() {
    // Apply profile information
    document.getElementById('profileName').textContent = config.profile.name;
    document.getElementById('profileBio').textContent = config.profile.bio;
    
    // Apply location if enabled
    const locationElement = document.getElementById('profileLocation');
    if (config.profile.location && config.profile.location.enabled) {
        locationElement.textContent = config.profile.location.text;
        locationElement.style.display = 'flex';
    } else {
        locationElement.style.display = 'none';
    }
    
    // Apply verified badge if enabled
    if (config.profile.verified) {
        document.getElementById('verifiedBadge').style.display = 'inline-flex';
    } else {
        document.getElementById('verifiedBadge').style.display = 'none';
    }
    
    // Set profile image
    if (config.profile.image) {
        // Try to load the specified image
        const setProfileImage = (imagePath) => {
            const profileImage = document.getElementById('profileImage');
            profileImage.src = imagePath;
            
            // Fallback if the image fails to load
            profileImage.onerror = () => {
                console.log(`Failed to load profile image: ${imagePath}`);
                // If using the original path failed, try alternative extensions
                if (imagePath === config.profile.image) {
                    const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));
                    
                    // Try different extensions
                    if (imagePath.endsWith('.jpg')) {
                        setProfileImage(`${basePath}.png`);
                    } else if (imagePath.endsWith('.png')) {
                        setProfileImage(`${basePath}.jpeg`);
                    } else if (imagePath.endsWith('.jpeg')) {
                        setProfileImage(`${basePath}.jpg`);
                    } else {
                        // Try common extensions if the path doesn't have a recognized extension
                        setProfileImage(`./assets/profilepic.jpg`);
                    }
                } else {
                    // If all alternatives failed, set a placeholder
                    profileImage.src = 'https://placehold.co/400x400?text=Profile';
                }
            };
        };
        
        // Start with the image path from config
        setProfileImage(config.profile.image);
    }
    
    // Set custom CSS variables
    if (config.styles) {
        Object.keys(config.styles).forEach(key => {
            const value = config.styles[key];
            if (value) {
                const cssVarName = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
                document.documentElement.style.setProperty(cssVarName, value);
                
                // Special handling for glow color
                if (key === 'glowColor' && value) {
                    document.documentElement.style.setProperty('--glow-color', value);
                    document.documentElement.style.setProperty('--neon-glow', `0 0 15px ${value}`);
                }
                
                // Set social icon color
                if (key === 'socialIconColor' && value) {
                    document.documentElement.style.setProperty('--social-icon-color', value);
                }
            }
        });
    }
    
    // Set background video
    if (config.background.video) {
        const videoSource = document.querySelector('#bgVideo source');
        videoSource.src = config.background.video;
        document.getElementById('bgVideo').load();
    }
    
    // Set background audio
    if (config.background.audio) {
        const audioElement = document.getElementById('bgAudio');
        audioElement.src = config.background.audio;
        
        // Force un état initial non muet
        audioElement.muted = false;
        if (audioElement.volume === 0) {
            audioElement.volume = 0.5;
        }
        
        // Set the audio start time when loaded
        audioElement.addEventListener('loadedmetadata', () => {
            // Set the current time to the specified start time
            if (config.background.audioStartTime && config.background.audioStartTime > 0) {
                audioElement.currentTime = config.background.audioStartTime;
            }
        });
        
        // Apply fade-in effect when audio starts playing
        const fadeInDuration = config.background.audioFadeIn || 0;
        if (fadeInDuration > 0) {
            // Set initial volume to 0
            const originalVolume = audioElement.volume;
            audioElement.volume = 0;
            
            // Create fade-in effect when audio starts playing
            audioElement.addEventListener('play', () => {
                // Reset volume to 0 at the start
                audioElement.volume = 0;
                
                let startTime = Date.now();
                const fadeAudio = setInterval(() => {
                    // Calculate how much time has passed as a fraction of the fade duration
                    const elapsed = (Date.now() - startTime) / 1000;
                    const volume = Math.min(elapsed / fadeInDuration, 1) * originalVolume;
                    
                    // Apply new volume
                    audioElement.volume = volume;
                    
                    // Clear interval when fade is complete
                    if (elapsed >= fadeInDuration) clearInterval(fadeAudio);
                }, 50);
            });
        }
        
        // Auto play audio if enabled in config
        if (config.background.audioAutoplay) {
            // Some browsers require user interaction before audio can play
            document.addEventListener('click', () => {
                if (!audioElement.paused) return; // Already playing
                audioElement.play().catch(e => console.log('Audio play failed:', e));
            }, { once: true });
        }
    }
    
    // Set page title and favicon
    if (config.page.title) {
        document.title = config.page.title;
    }
    
    if (config.page.favicon) {
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = config.page.favicon;
        document.head.appendChild(faviconLink);
    }
    
    // Set footer text
    if (config.page.footerText) {
        document.getElementById('footerText').textContent = config.page.footerText;
    }
    
    // Generate social media links
    generateSocialLinks();
    
    // Generate custom links
    generateCustomLinks();
}

function generateSocialLinks() {
    const socialLinksContainer = document.getElementById('socialLinks');
    socialLinksContainer.innerHTML = '';
    
    // Social media platform icons map
    const platformIcons = {
        discord: 'fab fa-discord',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        youtube: 'fab fa-youtube',
        twitch: 'fab fa-twitch',
        github: 'fab fa-github',
        tiktok: 'fab fa-tiktok',
        telegram: 'fab fa-telegram',
        linkedin: 'fab fa-linkedin',
        facebook: 'fab fa-facebook',
        reddit: 'fab fa-reddit',
        snapchat: 'fab fa-snapchat',
        spotify: 'fab fa-spotify',
        soundcloud: 'fab fa-soundcloud',
        medium: 'fab fa-medium',
        patreon: 'fab fa-patreon',
        steam: 'fab fa-steam',
        website: 'fas fa-globe'
    };
    
    // Create social media links
    let delay = 0;
    for (const platform in config.social) {
        if (config.social[platform] && config.social[platform].enabled) {
            const link = document.createElement('a');
            
            // Handle copy to clipboard functionality
            if (platform === 'discord' && config.social[platform].copyToClipboard) {
                link.href = "javascript:void(0)"; // Prevent navigation
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    copyToClipboard(config.social[platform].url);
                    showNotification('Discord ID copied to clipboard');
                });
            } else {
                link.href = config.social[platform].url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
            
            link.className = 'social-link';
            link.style.animationDelay = `${delay}s`;
            delay += 0.05;
            
            const icon = document.createElement('i');
            icon.className = platformIcons[platform] || 'fas fa-link';
            
            // Add title for tooltip
            link.title = platform.charAt(0).toUpperCase() + platform.slice(1);
            
            link.appendChild(icon);
            socialLinksContainer.appendChild(link);
        }
    }
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .catch(err => {
            console.error('Could not copy text: ', err);
            
            // Fallback method for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';  // Avoid scrolling to bottom
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback: Could not copy text: ', err);
            }
            document.body.removeChild(textarea);
        });
}

// Function to show notification
function showNotification(message) {
    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notificationContainer');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notificationContainer';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.left = '50%';
        notificationContainer.style.transform = 'translateX(-50%)';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.backgroundColor = 'rgba(33, 33, 82, 0.9)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.marginTop = '10px';
    notification.style.boxShadow = '0 0 10px rgba(138, 43, 226, 0.7)';
    notification.style.backdropFilter = 'blur(5px)';
    notification.style.animation = 'fadeInUp 0.3s, fadeOut 0.3s 2.7s forwards';
    notification.textContent = message;
    
    // Add notification to container
    notificationContainer.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add keyframes for notification animations to the document
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;
document.head.appendChild(style);

function generateCustomLinks() {
    const customLinksContainer = document.getElementById('customLinks');
    customLinksContainer.innerHTML = '';
    
    // Create custom links
    config.links.forEach((link, index) => {
        if (!link.enabled) return;
        
        const linkCard = document.createElement('a');
        linkCard.href = link.url;
        linkCard.target = '_blank';
        linkCard.rel = 'noopener noreferrer';
        linkCard.className = 'link-card';
        
        // Check if icon is a URL (starts with http:// or https://)
        if (link.icon && (link.icon.startsWith('http://') || link.icon.startsWith('https://'))) {
            // Create an image element for custom icon
            const iconImg = document.createElement('img');
            iconImg.src = link.icon;
            iconImg.alt = link.title + ' icon';
            iconImg.className = 'link-icon-img';
            
            if (link.iconColor) {
                // Apply filter for colored images if needed
                // This is optional and can be removed if not needed
                iconImg.style.filter = `drop-shadow(0 0 5px ${link.iconColor})`;
            }
            
            linkCard.appendChild(iconImg);
        } else {
            // Use Font Awesome icon
            const icon = document.createElement('i');
            icon.className = link.icon || 'fas fa-link';
            icon.classList.add('link-icon');
            
            if (link.iconColor) {
                icon.style.color = link.iconColor;
            }
            
            linkCard.appendChild(icon);
        }
        
        const title = document.createElement('span');
        title.className = 'link-title';
        title.textContent = link.title;
        
        linkCard.appendChild(title);
        customLinksContainer.appendChild(linkCard);
        
        // Add animation delay for staggered entrance
        linkCard.style.animationDelay = `${0.1 + (index * 0.1)}s`;
    });
}

function setupOverlay() {
    const overlay = document.getElementById('overlay');
    const clickMeButton = document.getElementById('clickMe');
    const bgVideo = document.getElementById('bgVideo');
    const bgAudio = document.getElementById('bgAudio');
    
    // Check if overlay should be shown
    if (config.features && config.features.skipOverlay) {
        overlay.style.display = 'none';
        playMedia();
        return;
    }
    
    clickMeButton.addEventListener('click', function() {
        // Make sure audio is not muted when starting
        bgAudio.muted = false;
        
        // Set a reasonable volume if it's at 0
        if (bgAudio.volume === 0) {
            bgAudio.volume = 0.5;
        }
        
        // Start media after setting audio state
        playMedia();
        
        // Update audio controls UI immediately
        updateAudioControlsUI();
        
        // Hide overlay with fade effect
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    });
    
    // Function to update audio controls UI
    function updateAudioControlsUI() {
        const muteIcon = document.querySelector('#muteButton i');
        const volumeSlider = document.getElementById('volumeSlider');
        
        // Update volume slider to match audio volume
        volumeSlider.value = bgAudio.volume * 100;
        
        // Update icon based on volume
        if (bgAudio.muted || bgAudio.volume === 0) {
            muteIcon.className = 'fas fa-volume-mute';
        } else if (bgAudio.volume < 0.5) {
            muteIcon.className = 'fas fa-volume-down';
        } else {
            muteIcon.className = 'fas fa-volume-up';
        }
    }
    
    // Add a playing event listener to update UI when audio actually starts
    bgAudio.addEventListener('playing', function() {
        // Update UI when audio starts playing
        updateAudioControlsUI();
    });
    
    function playMedia() {
        // Start background video
        bgVideo.play().catch(error => {
            console.log('Video autoplay was prevented:', error);
        });
        
        // Start background audio if autoplay is enabled
        if (config.background.audioAutoplay !== false) {
            bgAudio.play().catch(error => {
                console.log('Audio autoplay was prevented:', error);
            });
        }
    }
}

function setupSoundControl() {
    const muteButton = document.getElementById('muteButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const bgAudio = document.getElementById('bgAudio');
    const muteIcon = muteButton.querySelector('i');
    
    // Force un état initial non muet avec volume par défaut
    bgAudio.muted = false;
    if (bgAudio.volume === 0) {
        bgAudio.volume = 0.5;
    }
    
    // Initialize volume slider value based on audio element
    volumeSlider.value = bgAudio.volume * 100;
    
    // Force l'icône à montrer le mode non-muet
    if (bgAudio.volume < 0.5) {
        muteIcon.className = 'fas fa-volume-down';
    } else {
        muteIcon.className = 'fas fa-volume-up';
    }
    
    // Handle mute button click
    muteButton.addEventListener('click', () => {
        if (bgAudio.muted || bgAudio.volume === 0) {
            // Unmute and set volume to 50% if it was muted or at 0
            bgAudio.muted = false;
            bgAudio.volume = 0.5;
            volumeSlider.value = 50;
            muteIcon.className = 'fas fa-volume-up';
        } else {
            // Mute and set slider to 0
            bgAudio.muted = true;
            volumeSlider.value = 0;
            muteIcon.className = 'fas fa-volume-mute';
        }
    });
    
    // Handle volume slider change
    volumeSlider.addEventListener('input', function() {
        const volumeValue = this.value / 100;
        bgAudio.volume = volumeValue;
        bgAudio.muted = volumeValue === 0;
        
        // Update icon based on volume level
        if (volumeValue === 0) {
            muteIcon.className = 'fas fa-volume-mute';
        } else if (volumeValue < 0.5) {
            muteIcon.className = 'fas fa-volume-down';
        } else {
            muteIcon.className = 'fas fa-volume-up';
        }
    });
}

function setupAnimations() {
    // Add hover effects to links
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.link-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
            
            const iconImg = this.querySelector('.link-icon-img');
            if (iconImg) {
                iconImg.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.link-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            const iconImg = this.querySelector('.link-icon-img');
            if (iconImg) {
                iconImg.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Add animations to social icons
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.textShadow = '0 0 15px var(--glow-color), 0 0 20px var(--glow-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.textShadow = '0 0 10px var(--glow-color)';
        });
    });
    
    // Add scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements with animation classes
    document.querySelectorAll('.link-card').forEach(card => {
        observer.observe(card);
    });
}

function setupThemeSwitcher() {
    if (!config.features || !config.features.themeSwitcher) return;
    
    const themeButton = document.getElementById('themeButton');
    const themeIcon = themeButton.querySelector('i');
    
    // Set up theme toggle functionality
    themeButton.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    });
}

function setupCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Appliquer les couleurs depuis la configuration
    if (config.styles && config.styles.cursorDotColor) {
        cursorDot.style.backgroundColor = config.styles.cursorDotColor;
        cursorDot.style.boxShadow = `0 0 10px ${config.styles.glowColor || 'rgba(138, 43, 226, 0.6)'}, 0 0 5px #fff`;
    }
    
    if (config.styles && config.styles.cursorOutlineColor) {
        cursorOutline.style.borderColor = config.styles.cursorOutlineColor;
    }
    
    // Positions initiales en dehors de l'écran
    let cursorX = -100;
    let cursorY = -100;
    
    // Positions cibles (position actuelle de la souris)
    let mouseX = -100;
    let mouseY = -100;
    
    // Attendre un peu avant d'afficher le curseur
    setTimeout(() => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    }, 1000);
    
    // Écouter les mouvements de souris
    document.addEventListener('mousemove', (e) => {
        // Mettre à jour la position cible
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation fluide du curseur
    function animateCursor() {
        // Mouvement fluide avec interpolation
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        // Appliquer les positions
        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorOutline.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        // Continuer l'animation
        requestAnimationFrame(animateCursor);
    }
    
    // Détection d'éléments cliquables
    const clickables = document.querySelectorAll('a, button, input[type="range"], .link-card');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
            cursorDot.style.backgroundColor = '#fff';
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.7)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorDot.style.backgroundColor = config.styles && config.styles.cursorDotColor ? 
                config.styles.cursorDotColor : 
                getComputedStyle(document.documentElement).getPropertyValue('--glow-color');
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = config.styles && config.styles.cursorOutlineColor ? 
                config.styles.cursorOutlineColor : 
                'rgba(138, 43, 226, 0.5)';
        });
    });
    
    // Désactiver le curseur sur appareils tactiles
    if ('ontouchstart' in window) {
        document.body.style.cursor = 'auto';
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    } else {
        // Démarrer l'animation
        animateCursor();
    }
} 