module.exports = function(app, methods) {
    methods.invertColor = (hex, bw) => {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            // https://stackoverflow.com/a/3943023/112731
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        }
        // invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        // pad each with zeros and return
        return "#" + String(r).padStart(2, '0') + String(g).padStart(2, '0') + String(b).padStart(2, '0');
    }

    methods.renderColorImage = (color = 'ffffff', text = '') => {
        const canvas = methods.createCanvas(320, 320);
        const ctx = canvas.getContext('2d');
        const margin = 32;
        ctx.fillStyle = '#' + color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = methods.invertColor(color, true);
        if (text != '') {
            ctx.font = 'bold 24px sans-serif';
            ctx.fillText('#' + color.toUpperCase(), margin, 320 - (margin + 32));
            ctx.font = 'bold 32px sans-serif';
            ctx.fillText(text, margin, 320 - margin);
        } else {
            ctx.font = 'bold 32px sans-serif';
            ctx.fillText('#' + color.toUpperCase(), margin, 320 - margin);
        }
        return canvas;
    }
}