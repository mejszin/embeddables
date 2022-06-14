module.exports = function(app, methods) {
    methods.renderHelloWorldImage = () => {
        const canvas = methods.createCanvas(200, 200);
        const ctx = canvas.getContext('2d');
        ctx.font = '24px serif';
        ctx.rotate(0.3);
        ctx.fillText('Hello world!', 50, 70);
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath();
        ctx.lineTo(50, 80);
        ctx.lineTo(50 + ctx.measureText('Hello world!').width, 80);
        ctx.stroke();
        return canvas;
    }
}