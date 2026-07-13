// Design Tiles — plain DOM/CSS word-tile bar with fly-in reveal and idle color shuffle.
// No canvas, no framework: a flex row of <span> tiles driven by a rAF loop.

export const SWATCHES = [
  { bg: "#0a0a0a", fg: "#ffffff" },
  { bg: "#ff2e20", fg: "#0a0a0a" },
  { bg: "#f0c2f7", fg: "#0a0a0a" },
  { bg: "#22e58b", fg: "#0a0a0a" },
  { bg: "#7c4dff", fg: "#ffffff" },
  { bg: "#ffe14d", fg: "#0a0a0a" },
  { bg: "#18b6ff", fg: "#0a0a0a" },
  { bg: "#ff7a1a", fg: "#0a0a0a" },
  { bg: "#ff4fa3", fg: "#0a0a0a" },
];

const FLY_STAGGER = 110; // ms between each tile's reveal start
const FLY_MS = 620; // reveal animation duration
const SHUFFLE_MIN = 1400; // ms
const SHUFFLE_MAX = 3400; // ms

function randomSwatchAvoiding(exclude) {
  const pool = SWATCHES.filter((s) => !exclude.includes(s));
  const list = pool.length ? pool : SWATCHES;
  return list[(Math.random() * list.length) | 0];
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export class DesignTiles {
  constructor(host, opts = {}) {
    this.host = host;
    this.words = opts.words || ["design", "is", "how", "it", "works"];
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.tiles = [];
    this._raf = 0;
    this._running = false;

    this._mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    this._onMotionChange = (e) => {
      this.reduced = e.matches;
    };
    this._mm.addEventListener("change", this._onMotionChange);

    this._build();
  }

  _build() {
    const bar = document.createElement("div");
    bar.className = "dt-bar";
    bar.setAttribute("role", "text");
    bar.setAttribute("aria-label", this.words.join(" "));

    const used = [];
    this.words.forEach((word, i) => {
      const swatch = randomSwatchAvoiding(used);
      used.push(swatch);

      const tile = document.createElement("span");
      tile.className = "dt-tile";
      tile.textContent = word;
      tile.style.setProperty("--i", i);

      this._paint(tile, swatch, false);

      const onEnter = () => this._reroll(entry);
      tile.addEventListener("pointerenter", onEnter);

      const entry = { el: tile, swatch, nextAt: 0, onEnter };
      bar.appendChild(tile);
      this.tiles.push(entry);
    });

    if (this.reduced) bar.classList.add("dt-static");

    this.host.appendChild(bar);
    this.bar = bar;
  }

  _paint(tile, swatch, animateColor) {
    tile.style.transition = animateColor
      ? "background-color 520ms ease, color 520ms ease"
      : "none";
    tile.style.backgroundColor = swatch.bg;
    tile.style.color = swatch.fg;
  }

  _reroll(entry) {
    const others = this.tiles.filter((t) => t !== entry).map((t) => t.swatch);
    const swatch = randomSwatchAvoiding([...others, entry.swatch]);
    entry.swatch = swatch;
    this._paint(entry.el, swatch, !this.reduced);
  }

  _reveal() {
    this.tiles.forEach((entry, i) => {
      const delay = i * FLY_STAGGER;
      const t = window.setTimeout(() => {
        entry.el.classList.add("dt-in");
      }, delay);
      this._timers = this._timers || [];
      this._timers.push(t);
    });
  }

  _scheduleShuffles() {
    const assembledAt = this.reduced
      ? 0
      : this.tiles.length * FLY_STAGGER + FLY_MS;
    const now = performance.now();
    this.tiles.forEach((entry) => {
      entry.nextAt = now + assembledAt + rand(SHUFFLE_MIN, SHUFFLE_MAX);
    });
  }

  start() {
    if (this._running) return;
    this._running = true;

    if (this.reduced) {
      this.tiles.forEach((entry) => entry.el.classList.add("dt-in"));
    } else {
      this._reveal();
    }

    if (!this.reduced) {
      this._scheduleShuffles();
      this._raf = requestAnimationFrame(this._loop);
    }
  }

  _loop = () => {
    if (!this._running) return;
    if (!this.reduced) {
      const now = performance.now();
      for (const entry of this.tiles) {
        if (now >= entry.nextAt) {
          this._reroll(entry);
          entry.nextAt = now + rand(SHUFFLE_MIN, SHUFFLE_MAX);
        }
      }
    }
    this._raf = requestAnimationFrame(this._loop);
  };

  stop() {
    this._running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  destroy() {
    this.stop();
    (this._timers || []).forEach((t) => window.clearTimeout(t));
    this._mm.removeEventListener("change", this._onMotionChange);
    this.tiles.forEach((entry) => entry.el.removeEventListener("pointerenter", entry.onEnter));
    this.bar.remove();
  }
}
