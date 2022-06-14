module.exports = function(app, methods) {
    methods.drawCircle = (ctx, x, y, r) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    };
    
    methods.drawLine = (ctx, x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };
    
    methods.drawText = (ctx, str, x, y, font = '') => {
        ctx.font = font;
        ctx.fillText(str, x, y);
    }
}