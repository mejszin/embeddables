module.exports = function(app, methods) {
    methods.renderTimeImage = () => {
        const canvas = methods.createCanvas(200, 64);
        const ctx = canvas.getContext('2d');
        ctx.font = '24px sans-serif';
        var text = new Date().toLocaleString();
        ctx.canvas.width  = ctx.measureText(text).width + 32;
        ctx.fillStyle = '#1338be';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px sans-serif';
        ctx.fillText(text, 16, 40);
        return canvas;
    }
}