# 🎡 Spin & Win - Fortune Wheel Game 🎁

A beautiful, interactive web-based game that combines a spinning wheel of fortune with scratch card prizes!

## ✨ Features

- **Beautiful Modern Design**: Stunning gradients, animations, and responsive layout
- **Interactive Spinning Wheel**: Click to spin and discover your lucky number (1-13)
- **Scratch Card Prizes**: Scratch to reveal your prize with realistic effects
- **Smooth Animations**: Engaging animations and transitions throughout
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Confetti Celebration**: Fun confetti animation when you reveal your prize!

## 🎮 How to Play

1. **Spin the Wheel**: Click the "SPIN" button on the fortune wheel
2. **Get Your Number**: Wait for the wheel to stop and reveal your lucky number
3. **Claim Your Prize**: Click "Click Me" to go to the scratch card page
4. **Scratch to Win**: Use your mouse or finger to scratch the silver surface
5. **Celebrate**: Enjoy the confetti and see your prize!

## 📁 Project Structure

```
├── index.html          # Main page with spinning wheel
├── scratch.html        # Scratch card prize page
├── style.css           # Main page styles
├── scratch-style.css   # Scratch card page styles
├── wheel.js            # Spinning wheel JavaScript
├── scratch.js          # Scratch card JavaScript
├── wScratchpad.min.js  # Scratch card library
└── README.md           # This file
```

## 🚀 Getting Started

1. **Download all files** to the same directory
2. **Open `index.html`** in a modern web browser
3. **Start playing!** No installation or setup required

## 💻 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern gradients, animations, and flexbox/grid layouts
- **JavaScript**: Interactive functionality
- **D3.js**: For the spinning wheel visualization
- **jQuery**: For DOM manipulation
- **wScratchPad**: Custom scratch card library

## 🎨 Design Highlights

- **Color Scheme**: Beautiful purple gradients with complementary colors
- **Animations**: 
  - Floating background circles
  - Bounce and slide-in effects
  - Smooth wheel rotation
  - Confetti celebration
- **Responsive**: Mobile-first approach with breakpoints for all devices
- **Accessibility**: Reduced motion support for users with motion sensitivity

## 🌟 Customization

### Change the Number of Wheel Segments

Edit the `data` array in `wheel.js`:

```javascript
var data = [
    { "label": "1", "value": 1, "question": "Your message here" },
    // Add or remove items as needed
];
```

### Customize Colors

Edit CSS variables in `style.css` or `scratch-style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    /* Customize your colors here */
}
```

### Adjust Scratch Sensitivity

Modify the `scratchUp` callback in `scratch.js`:

```javascript
scratchUp: function(e, percent) {
    if (percent > 50) { // Change this threshold (0-100)
        this.clear();
        celebratePrize();
    }
}
```

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project uses code with the MIT License. See original license headers in files.

## 🎯 Future Enhancements

- [ ] Add sound effects
- [ ] Include actual prize images
- [ ] Save high scores/history
- [ ] Add social sharing features
- [ ] Implement different game modes
- [ ] Add prize inventory system

## 🤝 Contributing

Feel free to fork this project and make it your own! Suggestions and improvements are welcome.

## 📧 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Enjoy playing and good luck! 🍀**

Made with ❤️ and lots of CSS gradients
