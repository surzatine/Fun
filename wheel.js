// Wheel of Fortune Configuration
var padding = { top: 20, right: 40, bottom: 0, left: 0 },
    w = 500 - padding.left - padding.right,
    h = 500 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = 0,
    picked = 100000,
    oldpick = [],
    color = d3.scale.category20();

// Prize data
var data = [
    { "label": "1", "value": 1, "question": "🎉 Your Lucky Number: 1<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "2", "value": 1, "question": "🎉 Your Lucky Number: 2<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "3", "value": 1, "question": "🎉 Your Lucky Number: 3<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "4", "value": 1, "question": "🎉 Your Lucky Number: 4<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "5", "value": 1, "question": "🎉 Your Lucky Number: 5<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "6", "value": 1, "question": "🎉 Your Lucky Number: 6<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "7", "value": 1, "question": "🎉 Your Lucky Number: 7<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "8", "value": 1, "question": "🎉 Your Lucky Number: 8<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "9", "value": 1, "question": "🎉 Your Lucky Number: 9<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "10", "value": 1, "question": "🎉 Your Lucky Number: 10<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "11", "value": 1, "question": "🎉 Your Lucky Number: 11<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "12", "value": 1, "question": "🎉 Your Lucky Number: 12<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" },
    { "label": "13", "value": 1, "question": "🎉 Your Lucky Number: 13<br><br>To Claim Your Prize<br><a href='scratch.html'>Click Me</a>" }
];

// Create SVG
var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width", w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);

var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");

var vis = container.append("g");

var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });

var arc = d3.svg.arc().outerRadius(r);

var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");

// Draw pie slices
arcs.append("path")
    .attr("fill", function (d, i) { return color(i); })
    .attr("d", function (d) { return arc(d); });

// Add text labels
arcs.append("text").attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
})
    .attr("text-anchor", "end")
    .text(function (d, i) {
        return data[i].label;
    });

container.on("click", spin);

// Spin function
function spin(d) {
    container.on("click", null);

    console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
    
    if (oldpick.length == data.length) {
        console.log("All prizes claimed!");
        d3.select("#question").select(".question-content").html(
            '<h3 style="color: #4facfe;">🎊 Congratulations! 🎊</h3>' +
            '<p>All prizes have been claimed!<br>Thank you for playing!</p>'
        );
        container.on("click", null);
        return;
    }

    var ps = 360 / data.length,
        rng = Math.floor((Math.random() * 1440) + 360);

    rotation = (Math.round(rng / ps) * ps);
    picked = Math.round(data.length - (rotation % 360) / ps);
    picked = picked >= data.length ? (picked % data.length) : picked;

    if (oldpick.indexOf(picked) !== -1) {
        d3.select(this).call(spin);
        return;
    } else {
        oldpick.push(picked);
    }

    rotation += 90 - Math.round(ps / 2);

    vis.transition()
        .duration(3000)
        .attrTween("transform", rotTween)
        .each("end", function () {
            // Mark as claimed
            d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                .attr("fill", "#2d3748");

            // Show result
            d3.select("#question").html(
                '<h1>' + data[picked].question + '</h1>'
            );

            oldrotation = rotation;
            container.on("click", spin);
        });
}

// Draw arrow pointer
svg.append("g")
    .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h / 2) + padding.top) + ")")
    .append("path")
    .attr("class", "arrow-pointer")
    .attr("d", "M-" + (r * .15) + ",0L0," + (r * .05) + "L0,-" + (r * .05) + "Z")
    .style({ "fill": "#ff6b6b" });

// Draw spin button
var spinButton = container.append("g")
    .attr("class", "spin-button");

spinButton.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 60)
    .style({ "fill": "white", "cursor": "pointer" });

spinButton.append("text")
    .attr("x", 0)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("SPIN")
    .style({ "font-weight": "bold", "font-size": "30px" });

// Rotation tween
function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}

// Responsive resize
function resizeWheel() {
    var parentWidth = document.getElementById('chart').offsetWidth;
    if (parentWidth < 500) {
        var scale = parentWidth / 500;
        d3.select('#chart svg').style('transform', 'scale(' + scale + ')');
        d3.select('#chart svg').style('transform-origin', 'center center');
    }
}

window.addEventListener('resize', resizeWheel);
window.addEventListener('load', resizeWheel);
