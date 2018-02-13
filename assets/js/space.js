/* <!--Copyright (c) 2017 by Amay (http://codepen.io/Amaj/pen/azXvXY)


 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
A Pen created at CodePen.io. You can find this one at http://codepen.io/Amaj/pen/azXvXY.

Space particles. Created with TypeScript.

Uncomment...

    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = "#fff";

...if you want to see more space in space. But remember - it's slow.
@Amay 2015


"Spaaaaaace!"
- Portal 2
*/


var Space = (function () {
    function Space() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.ratio = window.innerHeight < 400 ? 0.6 : 1;
        this.r = 400;
        this.counter = 0;
    }
    Space.prototype.init = function () {
        this.createElement();
        this.loop();
    };
    Space.prototype.createElement = function () {
        var scale = this.ratio;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.background = 'rgba(0, 0, 0, 0)';
        this.canvas.style.position = 'absolute';
        this.canvas.id = 'canvas';
        this.ctx.transform(scale, 0, 0, -scale, this.canvas.width / 2, this.canvas.height / 2);
        document.body.appendChild(this.canvas);
        for (var i = 0; i < 450; i++) {
            this.createParticle();
        }
    };
    Space.prototype.createParticle = function () {
        this.particles.push({
            color: Math.random() > 0.5 ? "rgba(255, 255, 255, 1)" : "rgba(53, 168, 224, 1)",
            radius: Math.random() * 5,
            x: Math.cos(Math.random() * 7 + Math.PI) * this.r,
            y: Math.sin(Math.random() * 7 + Math.PI) * this.r,
            ring: Math.random() * this.r * 3,
            move: ((Math.random() * 4) + 1) / 3500,
            random: Math.random() * 7
        });
    };
    Space.prototype.moveParticle = function (p) {
        p.ring = Math.max(p.ring - 1, this.r);
        p.random += p.move;
        p.x = Math.cos(p.random + Math.PI) * p.ring;
        p.y = Math.sin(p.random + Math.PI) * p.ring;
    };
    Space.prototype.resetParticle = function (p) {
        p.ring = Math.random() * this.r * 3;
        p.radius = Math.random() * 5;
    };
    Space.prototype.disappear = function (p) {
        if (p.radius < 0.8) {
            this.resetParticle(p);
        }
        p.radius *= 0.994;
    };
    Space.prototype.draw = function (p) {
        this.ctx.beginPath();
        this.ctx.fillStyle = p.color;
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
    };
    Space.prototype.loop = function () {
        this.ctx.clearRect(-this.canvas.width , -this.canvas.height, this.canvas.width * 2, this.canvas.height * 2);
        if (this.counter < this.particles.length) {
            this.counter++;
        }
        //this.ctx.shadowBlur = 20;
        //this.ctx.shadowColor = "#fff";
        for (var i = 0; i < this.counter; i++) {
            this.disappear(this.particles[i]);
            this.moveParticle(this.particles[i]);
            this.draw(this.particles[i]);
        }
        requestAnimationFrame(this.loop.bind(this));
    };
    return Space;
})();
window.onload = function () {

    var space = new Space();
    space.init();
    $('#canvas').appendTo( $('#canvasplace'));

};
window.onresize = function(event) {
var space = new Space();
var canvas = document.getElementById("canvas");
canvas.remove();
  space.init();
  $('#canvas').appendTo( $('#canvasplace'));

};
