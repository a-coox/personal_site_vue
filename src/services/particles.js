import merge from 'deepmerge';

const CIRC_ANGLE = 2 * Math.PI;

function easeInOutCirc (t) {
  var result;
  if (t <= 0.5) {
    result = 0.5 - Math.sqrt(0.25 - t*t);
  } else {
    result = 0.5 + Math.sqrt(0.25 - (t-1)*(t-1));
  }
  return result;
}

function createRgbString (colour, opacity) {
  return 'rgba(' + colour + ',' + opacity + ')';
}

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  ctx = null;
  anchor = {
    x: 0,
    y: 0
  };
  pos = {
    x: 0,
    y: 0
  };
  options = {
    radius: 3,
    colours: {
      particle: '156,217,249',
      line: '156,217,249'
    },
    lineOpacity: 0.5
  };
  fillStyle = '';
  lineStyle = '';
  opacity = 0;
  anim = {
    startPos: { x: 0, y: 0},
    startTime: 0,
    duration: 0
  };
  connected = [];

  constructor(ctx, anchor, pos, options = {}) {
    this.ctx = ctx;
    this.anchor = anchor;
    this.pos = pos;
    this.options = merge(this.options, options);
    this.updateStyles();
  }

  setOpacity(val) {
    this.opacity = val;
    this.updateStyles();
  }

  updateStyles() {
    this.fillStyle = createRgbString(this.options.colours.particle, this.opacity);
    const lineOpacity = this.opacity * this.options.lineOpacity;
    this.lineStyle = createRgbString(this.options.colours.line, lineOpacity);
  }

  draw() {
    if (this.opacity > 0) {
      // console.log(this.connected);
      // Draw self
      this.ctx.beginPath();
      this.ctx.arc(this.pos.x, this.pos.y, this.options.radius, 0, CIRC_ANGLE, false);
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fill();

      // Draw lines
      this.connected.forEach((point) => this.drawLineTo(point));
    }
  }

  drawLineTo(otherPoint) {
    if (otherPoint.opacity === 0) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineStyle;
    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.ctx.lineTo(otherPoint.pos.x, otherPoint.pos.y);
    this.ctx.stroke();
  }

  startAnimateTo(x, y, duration, timestamp) {
    this.anim.startPos.x = this.pos.x;
    this.anim.startPos.y = this.pos.y;
    this.anim.deltaPos = {
      x: x - this.pos.x,
      y: y - this.pos.y
    };
    this.anim.startTime = timestamp;
    this.anim.duration = duration;
  }

  animateFrame(timestamp) {
    if (this.opacity === 0) {
      return false;
    }
    const delta = timestamp - this.anim.startTime;
    
    if (delta < this.anim.duration) {
      const percent = easeInOutCirc(delta / this.anim.duration);

      this.pos.x = this.anim.startPos.x + (this.anim.deltaPos.x * percent);
      this.pos.y = this.anim.startPos.y + (this.anim.deltaPos.y * percent);
      return false;
    } 

    return true;
  }
}


export default class ParticleAnimation {
  canvas = {
    elem: null,
    ctx: null
  };
  options = {
    particles: {
      density: 65,  // Number of pixels between particles
      maxRange: 60,
      maxDistance: 55000
    },
    lineCount: 3,
    duration: {
      min: 1000,
      max: 2000
    }
  };
  particles = [];
  visibleParticles = [];
  mousePos = {
    x: 0,
    y: 0,
    updated: true
  };
  anim = {
    req: null
  };

  constructor(canvas, options = {}) {
    this.canvas.elem = canvas;
    this.options = merge(this.options, options);
    this.init();
  }

  init() {
    this.initCanvas();
    this.initParticles(this.canvas.elem.width, this.canvas.elem.height);
  }

  initCanvas() {
    this.canvas.ctx = this.canvas.elem.getContext('2d');
    // this.mousePos.x = Math.round(this.canvas.elem.width / 2);
    // this.mousePos.y = Math.round(this.canvas.elem.height * 0.7);
  }

  updateCanvas(width, height) {
    this.particles = [];
    this.initParticles(width, height);
  }

  initParticles(width, height) {
    console.log(`${width}, ${height}`)
    const density = this.options.particles.density;
    const numParticlesX = Math.ceil(width / density) + 1;
    const numParticlesY = Math.ceil(height / density) + 1;

    for (let i = 0; i < numParticlesX; i++) {
      const particlesY = [];
      for (let j = 0; j < numParticlesY; j++) {
        const anchor = {
          x: i * density,
          y: j * density
        };
        const randPos = this.randomParticleOffset(anchor);
        const particle = new Particle(this.canvas.ctx, anchor, randPos);
        particle.options.radius = Math.round(randRange(2, 4));
        particlesY.push(particle);
      }
      this.particles.push(particlesY);
    }

    this.forEachParticle((particle, i, j) => {
      particle.connected = this.getConnectedParticles(i, j);
    });
  }

  start() {
    this.forEachParticle(this.startParticleAnimate.bind(this));
    this.anim.req = requestAnimationFrame(this.animateFrame.bind(this));
  }

  stop() {
    if (this.anim.req != null) {
      cancelAnimationFrame(this.anim.req);
      this.anim.req = null;
    }
  }

  continue() {
    this.anim.req = requestAnimationFrame(this.animateFrame.bind(this));
  }

  startParticleAnimate(particle) {
    const timestamp = performance.now();
    const {x, y} = this.randomParticleOffset(particle.anchor);
    const randDuration = randRange(this.options.duration.min, this.options.duration.max);
    particle.startAnimateTo(x, y, randDuration, timestamp);
  }

  randomParticleOffset(anchor) {
    const maxRange = this.options.particles.maxRange;
    return {
      x: anchor.x + randRange(-maxRange, maxRange),
      y: anchor.y + randRange(-maxRange, maxRange)
    };
  }

  animateFrame(delta) {
    this.canvas.ctx.clearRect(0, 0, this.canvas.elem.width, this.canvas.elem.height);
    this.forEachParticle((particle, i, j) => {
      this.updateParticleOpacity(particle, i, j);
      if (particle.animateFrame(delta)) {
        this.startParticleAnimate(particle);
      }
      particle.draw();
    });
    this.anim.req = requestAnimationFrame(this.animateFrame.bind(this));
  }

  forEachParticle(func) {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = 0; j < this.particles[i].length; j++) {
        func(this.particles[i][j], i, j);
      }
    }
  }

  findClosestParticleToMouse() {
    return {
      x: Math.round(this.mousePos.x / this.options.particles.density),
      y: Math.round(this.mousePos.y / this.options.particles.density),
    };
  }

  updateParticleOpacity(particle, i, j) {
    const distance = this.distanceFromMouse(particle);
    particle.setOpacity(this.distanceToOpacity(distance));
    if (particle.opacity === 0) {
      
    }
  }

  getConnectedParticles(pointI, pointJ) {
    const minX = Math.max(0, pointI - 1);
    const maxX = Math.min(this.particles.length - 1, pointI + 1);
    const minY = Math.max(0, pointJ - 1);
    const maxY = Math.min(this.particles[0].length - 1, pointJ + 1);
    const connected = [];

    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        if (i == pointI && j == pointJ) {
          continue;
        }
        connected.push(this.particles[i][j]);
      }
    }
    return connected.slice(0, this.options.lineCount);
  }

  getLineDistances(particle, i, j) {
    const offset = this.options.lineRange;
    const minX = Math.max(0, i - offset);
    const maxX = Math.min(this.particles.length - 1, i + offset);
    const minY = Math.max(0, j - offset);
    const maxY = Math.min(this.particles[0].length - 1, j + offset);

    const distances = [];
    for (let i = minX; i < maxX; i++) {
      for (let j = minY; j < maxY; j++) {
        if (i == particle.anchor.x && j == particle.anchor.y) {
          continue; // Skip self
        }
        const neighbour = this.particles[i][j];
        distances.push({
          particle: neighbour, 
          distance: this.distance(particle.pos, neighbour.pos) 
        });
      }
    }
    // return distances;
    distances.sort((a, b) => {
      if (a.distance == b.distance) {
        return 0;
      } else if (a.distance < b.distance) {
        return -1;
      }
      return 1;
    });
    return distances.slice(0, this.options.lineCount);
  }

  distanceFromMouse(particle) {
    return this.distance(particle.pos, this.mousePos);
  }

  distance(pointA, pointB) {
    const disX = pointA.x - pointB.x;
    const disY = pointA.y - pointB.y;
    return disX * disX + disY * disY;
  }

  distanceToOpacity(distance) {
    const maxDistance = this.options.particles.maxDistance;
    if (distance > maxDistance) {
      return 0;
    }

    let opacity = 1 - (distance / maxDistance);
    return opacity;
  }

  distanceToLineOpacity(distance) {
    let opacity = this.distanceToOpacity(distance);
    opacity *= 0.5;
    return opacity;
  }

  onMouseMove(evt) {
    const rect = this.canvas.elem.getBoundingClientRect();
    this.mousePos.x = evt.clientX - rect.left;
    this.mousePos.y = evt.clientY - rect.top;
    this.mousePos.updated = true;
  }
}
