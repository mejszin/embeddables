module.exports = function(app, methods) {
    methods.renderPingStatus = (url, isActive) => {
        const canvas = methods.createCanvas(200, 80);
        const ctx = canvas.getContext('2d');
        ctx.font = '24px sans-serif';
        ctx.canvas.width  = ctx.measureText(url).width + 96;
        ctx.fillStyle = isActive ? "#7cd992" : "#eb6060";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        methods.drawText(ctx, url, 80, 36, '24px sans-serif');
        methods.drawText(ctx, isActive ? 'Online' : 'Offline', 80, 60, '16px sans-serif');
        var x = ctx.canvas.height / 2;
        var y = ctx.canvas.height / 2;
        var r = (ctx.canvas.height - 40) / 2;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        methods.drawCircle(ctx, x, y, r);
        if (isActive) {
            methods.drawLine(ctx, x - 12, y + 2, x - 4, y + 10);
            methods.drawLine(ctx, x - 4, y + 10, x + 10, y - 8);
        } else {
            methods.drawLine(ctx, x - 8, y - 8, x + 8, y + 8);
            methods.drawLine(ctx, x - 8, y + 8, x + 8, y - 8);
        }
        return canvas;
    }
}