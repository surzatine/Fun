// VERSION 1: Always show 1.jpeg
// Uncomment this section and comment out VERSION 2 to always show 1.jpeg

/*
$(document).ready(function() {
    $("#card").wScratchPad({
        size: 80,
        bg: 'Images/1.jpeg', // Always shows 1.jpeg
        fg: createScratchSurface(),
        cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\"><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"%23FFD700\" stroke=\"%23FFA500\" stroke-width=\"2\"/></svg>') 16 16, auto",
        scratchUp: function(e, percent) {
            if (percent > 50) {
                this.clear();
                celebratePrize();
            }
        }
    });
});
*/

// VERSION 2: Show random image from 1.jpeg to 13.jpeg
// This version picks a random prize image each time
var num = Math.floor(Math.random() * 13) + 1;

$(document).ready(function() {
    $("#card").wScratchPad({
        size: 80,
        bg: `Images/${num}.jpeg`, // Shows random image from 1.jpeg to 13.jpeg
        fg: createScratchSurface(),
        cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\"><circle cx=\"16\" cy=\"16\" r=\"14\" fill=\"%23FFD700\" stroke=\"%23FFA500\" stroke-width=\"2\"/></svg>') 16 16, auto",
        scratchUp: function(e, percent) {
            if (percent > 50) {
                this.clear();
                celebratePrize();
            }
        }
    });
});

// Create scratch surface with silver metallic effect
function createScratchSurface() {
    var canvas = document.createElement('canvas');
    canvas.width = 450;
    canvas.height = 500;
    var ctx = canvas.getContext('2d');
    
    // Silver metallic gradient
    var gradient = ctx.createLinearGradient(0, 0, 450, 500);
    gradient.addColorStop(0, '#E8E8E8');
    gradient.addColorStop(0.25, '#C0C0C0');
    gradient.addColorStop(0.5, '#A8A8A8');
    gradient.addColorStop(0.75, '#C0C0C0');
    gradient.addColorStop(1, '#E8E8E8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 450, 500);
    
    // Add texture pattern
    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (Math.random() * 0.3) + ')';
        ctx.fillRect(Math.random() * 450, Math.random() * 500, 2, 2);
    }
    
    // Scratch instruction overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.roundRect(100, 200, 250, 100, 15);
    ctx.fill();
    
    // Text
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 28px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🖐️ SCRATCH HERE', 225, 240);
    
    ctx.fillStyle = '#718096';
    ctx.font = '600 18px Poppins, sans-serif';
    ctx.fillText('to reveal your prize!', 225, 275);
    
    return canvas.toDataURL();
}

// Celebration effect when prize is revealed
function celebratePrize() {
    // Create confetti effect
    createConfetti();
    
    // Add celebration message
    setTimeout(function() {
        var celebration = document.createElement('div');
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 3rem;
            border-radius: 25px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
            text-align: center;
            z-index: 1000;
            animation: popIn 0.5s ease;
        `;
        celebration.innerHTML = `
            <h2 style="font-size: 2.5rem; color: #667eea; margin-bottom: 1rem;">🎊 Amazing! 🎊</h2>
            <p style="font-size: 1.3rem; color: #718096; margin-bottom: 2rem;">You've revealed your prize!</p>
            <button onclick="this.parentElement.remove()" style="
                padding: 15px 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 50px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            ">Awesome!</button>
        `;
        document.body.appendChild(celebration);
    }, 500);
}

// Confetti animation
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(function() {
            var confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'][Math.floor(Math.random() * 6)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                border-radius: 50%;
                animation: fall ${2 + Math.random() * 3}s linear;
                z-index: 999;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(function() {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Add fall animation style
var style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            top: 100%;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg);
        }
    }
    @keyframes popIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Helper function for rounded rectangles (for older browsers)
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
    };
}
