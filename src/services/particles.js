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
    radius: 5,
    colours: {
      particle: '156,217,249',
      line: '156,217,249'
    },
  };
  fillStyle = null;
  opacity = 0;
  anim = {
    startPos: { x: 0, y: 0},
    startTime: 0,
    duration: 0
  };

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
  }

  draw() {
    if (this.opacity > 0) {
      this.ctx.beginPath();
      this.ctx.arc(this.pos.x, this.pos.y, this.options.radius, 0, CIRC_ANGLE, false);
      this.ctx.fillStyle = this.fillStyle;
      this.ctx.fill();
    }
  }

  drawLineTo(otherPoint, opacity) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = createRgbString(this.options.colours.line, opacity);
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
      density: 80,  // Number of pixels between particles
      maxRange: 100,
      maxDistance: 40000
    },
    lineRange: 2,
    lineCount: 5,
    duration: {
      min: 1000,
      max: 3000
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
    this.initParticles();
  }

  initCanvas() {
    this.canvas.ctx = this.canvas.elem.getContext('2d');
  }

  initParticles() {
    const { width, height } = this.canvas.elem;
    const density = this.options.particles.density;
    const numParticlesX = Math.round(width / density);
    const numParticlesY = Math.round(height / density);

    for (let i = 0; i < numParticlesX; i++) {
      const particlesY = [];
      for (let j = 0; j < numParticlesY; j++) {
        const anchor = {
          x: i * density,
          y: j * density
        };
        const randPos = this.randomParticleOffset(anchor);
        particlesY.push(new Particle(this.canvas.ctx, anchor, randPos, { opacity: 1 }));
      }
      this.particles.push(particlesY);
    }
  }

  start() {
    this.forEachParticle(this.startParticleAnimate.bind(this));
    requestAnimationFrame(this.animateFrame.bind(this));
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

  stop() {
    if (this.anim.req != null) {
      cancelAnimationFrame(this.anim.req);
      this.anim.req = null;
    }
  }

  animateFrame(delta) {
    // if (this.mousePos.updated) {
    //   this.mousePos.updated = false;
    //   // const mousePoint = this.findClosestParticleToMouse();
    //   // this.updateVisibleParticles(mousePoint);
    // }

    this.canvas.ctx.clearRect(0, 0, this.canvas.elem.width, this.canvas.elem.height);
    this.forEachParticle((particle, i, j) => {
      this.updateParticleOpacity(particle, i, j);
      if (particle.animateFrame(delta)) {
        this.startParticleAnimate(particle);
      }
      particle.draw();
    });
    requestAnimationFrame(this.animateFrame.bind(this));
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
      return; // No need to do the rest, it's not visible
    }
    // console.log

    const lineDistances = this.getLineDistances(particle, i, j);
    for (let line of lineDistances) {
      // const lineOpacity = this.distanceToOpacity(line.distance);
      particle.drawLineTo(line.particle, this.distanceToLineOpacity(line.distance));
    }
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

    return 1 - (distance / maxDistance);
  }

  distanceToLineOpacity(distance) {
    let opacity = this.distanceToOpacity(distance);
    opacity *= 0.5;
    // opacity *= opacity;

    // if (opacity < 0.1) {
    //   opacity = 0;
    // }
    return opacity;
  }

  onMousemove(evt) {
    // console.log(evt);
    this.mousePos.x = evt.clientX;
    this.mousePos.y = evt.clientY;
    this.mousePos.updated = true;
  }
}
