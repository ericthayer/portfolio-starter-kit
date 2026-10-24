// bento-core.js — data-agnostic interaction layer for bento dashboards.
// No dependencies. Exposes window.Bento. Every helper is optional and
// respects prefers-reduced-motion. Storage is per-viewer and failure-tolerant.
(function () {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;

  const store = {
    prefix: "bento:",
    get(k, d) { try { const v = localStorage.getItem(this.prefix + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(this.prefix + k, JSON.stringify(v)); } catch { /* private mode */ } },
  };

  const fmt = {
    compact(n, digits = 2) {
      if (n >= 1e9) return +(n / 1e9).toFixed(digits) + "B";
      if (n >= 1e6) return +(n / 1e6).toFixed(digits) + "M";
      if (n >= 1e4) return +(n / 1e3).toFixed(1) + "K";
      return Math.round(n).toLocaleString("en-US");
    },
    int: (n) => Math.round(n).toLocaleString("en-US"),
    pct: (r, digits = 0) => (r * 100).toFixed(digits) + "%",
    day: (iso, o = { month: "short", day: "numeric" }) => new Date(iso.length === 10 ? iso + "T12:00:00" : iso).toLocaleDateString("en-US", o),
    until(iso) {
      const ms = new Date(iso) - Date.now(); if (ms <= 0) return "now";
      const h = Math.floor(ms / 36e5), m = Math.floor((ms % 36e5) / 6e4);
      return h >= 24 ? `${Math.floor(h / 24)}d ${h % 24}h` : h ? `${h}h ${m}m` : `${m}m`;
    },
  };

  // <b data-count="2708749" data-fmt="compact" data-digits="1" data-prefix="$" data-suffix="+">
  // Renders the final value at rest; replays the count when scrolled into view.
  function countUp(root = document) {
    const els = [...root.querySelectorAll("[data-count]")];
    const render = (el, v) => {
      const f = fmt[el.dataset.fmt || "int"] || fmt.int;
      el.textContent = (el.dataset.prefix || "") + f(v, el.dataset.digits ? +el.dataset.digits : undefined) + (el.dataset.suffix || "");
    };
    els.forEach((el) => render(el, parseFloat(el.dataset.count)));
    if (reduced) return;
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return; io.unobserve(en.target);
      const el = en.target, target = parseFloat(el.dataset.count), t0 = performance.now(), dur = +(el.dataset.duration || 1400);
      const tick = (now) => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        render(el, p < 1 ? (Number.isInteger(target) ? Math.round(target * e) : target * e) : target);
        if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }), { threshold: 0.4 });
    els.filter((el) => el.getBoundingClientRect().top > innerHeight).forEach((el) => io.observe(el));
  }

  // Cards in the first screen stay put (complete at rest); cards below the fold
  // rise in when scrolled to. Pair with the .reveal rules in each style sheet.
  function reveal(selector = ".reveal") {
    const els = [...document.querySelectorAll(selector)];
    els.forEach((el, i) => el.style.setProperty("--i", i % 12));
    if (reduced) { els.forEach((el) => el.classList.add("is-in", "is-static")); return; }
    els.forEach((el) => el.classList.add(...(el.getBoundingClientRect().top > innerHeight ? ["is-pending"] : ["is-in", "is-static"])));
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.replace("is-pending", "is-in"); io.unobserve(en.target);
    }), { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    els.filter((el) => el.classList.contains("is-pending")).forEach((el) => io.observe(el));
  }

  // Sets --mx/--my on hover for a radial spotlight in CSS.
  function spotlight(selector) {
    if (!finePointer) return;
    document.querySelectorAll(selector).forEach((el) => el.addEventListener("pointermove", (e) => {
      const b = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - b.left) / b.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - b.top) / b.height) * 100 + "%");
    }));
  }

  // Buttons lean toward the pointer.
  function magnetic(selector, strength = 0.2) {
    if (!finePointer || reduced) return;
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("pointermove", (e) => { const b = el.getBoundingClientRect();
        el.style.translate = `${(e.clientX - b.left - b.width / 2) * strength}px ${(e.clientY - b.top - b.height / 2) * strength}px`; });
      el.addEventListener("pointerleave", () => (el.style.translate = ""));
    });
  }

  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = Object.assign(document.createElement("div"), { className: "bento-toast" });
      toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite"); document.body.append(toastEl); }
    toastEl.textContent = msg; toastEl.classList.remove("is-on"); void toastEl.offsetWidth; toastEl.classList.add("is-on");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(() => toastEl.classList.remove("is-on"), 2200);
  }

  // [data-copy="text"] buttons; clipboard call stays inside the click handler.
  async function copyText(text, label = "Copied") {
    try { await navigator.clipboard.writeText(text); toast(label); return true; }
    catch { toast("Copy blocked here. Select the text and copy it manually."); return false; }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]"); if (!b) return;
    copyText(b.dataset.copy, b.dataset.copyLabel || "Copied");
    b.classList.add("is-copied"); setTimeout(() => b.classList.remove("is-copied"), 1400);
  });

  // Slot-machine idea generator.
  // generator(root, { seeds: {key: [..]}, template: (state) => "prompt", hotkey: "g" })
  // Markup: [data-reel=key] > [data-reel-value], [data-lock=key] (aria-pressed), [data-spin], [data-copy-prompt], [data-prompt]
  function generator(root, { seeds, template, hotkey = "g", storeKey = "idea" }) {
    if (!root) return;
    const keys = Object.keys(seeds), locks = new Set(store.get(storeKey + ":locks", []));
    let state = store.get(storeKey, null) || Object.fromEntries(keys.map((k) => [k, seeds[k][0]]));
    const pick = (k, not) => { const p = seeds[k].filter((x) => x !== not); return p[(Math.random() * p.length) | 0]; };
    const reels = [...root.querySelectorAll("[data-reel]")];
    const paint = () => {
      reels.forEach((r) => { const v = r.querySelector("[data-reel-value]"); if (v) v.textContent = state[r.dataset.reel]; });
      root.querySelectorAll("[data-prompt]").forEach((el) => (el.textContent = template(state)));
      root.querySelectorAll("[data-lock]").forEach((b) => b.setAttribute("aria-pressed", locks.has(b.dataset.lock)));
    };
    function spin() {
      const next = { ...state }; keys.forEach((k) => { if (!locks.has(k)) next[k] = pick(k, state[k]); });
      root.classList.add("is-spinning");
      const done = () => { state = next; store.set(storeKey, state); paint(); root.classList.remove("is-spinning"); };
      if (reduced) return done();
      reels.forEach((r, i) => { const k = r.dataset.reel, v = r.querySelector("[data-reel-value]"); if (!v || locks.has(k)) return;
        r.classList.add("is-rolling"); let n = 0; const total = 6 + i * 3;
        const roll = () => { v.textContent = n < total ? pick(k) : next[k];
          if (n++ < total) setTimeout(roll, 45 + n * 6); else r.classList.remove("is-rolling"); };
        roll(); });
      setTimeout(done, 520 + reels.length * 190);
    }
    root.querySelectorAll("[data-spin]").forEach((b) => b.addEventListener("click", spin));
    root.querySelectorAll("[data-lock]").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.lock; locks.has(k) ? locks.delete(k) : locks.add(k); store.set(storeKey + ":locks", [...locks]); paint(); }));
    root.querySelectorAll("[data-copy-prompt]").forEach((b) => b.addEventListener("click", () => copyText(template(state), "Prompt copied")));
    if (hotkey) document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() !== hotkey || e.metaKey || e.ctrlKey || e.altKey || e.target.closest("input, textarea, [contenteditable]")) return;
      spin(); });
    paint();
    return { spin, get state() { return state; } };
  }

  // Checklist with per-viewer persistence.
  // checklist(listEl, items[{id,...}], render(item) => <li> containing input[type=checkbox], { storeKey })
  // Updates [data-open-count], [data-done-count], [data-progress] (--p 0..1), [data-next-item].
  function checklist(list, items, render, { storeKey = "done" } = {}) {
    if (!list) return;
    const done = new Set(store.get(storeKey, []));
    const counters = () => {
      const open = items.filter((p) => !done.has(p.id));
      document.querySelectorAll("[data-open-count]").forEach((el) => (el.textContent = open.length));
      document.querySelectorAll("[data-done-count]").forEach((el) => (el.textContent = items.length - open.length));
      document.querySelectorAll("[data-progress]").forEach((el) => el.style.setProperty("--p", (items.length - open.length) / items.length));
      document.querySelectorAll("[data-next-item]").forEach((el) => (el.textContent = open[0] ? open[0].title : "All clear."));
    };
    list.replaceChildren(...items.map((item) => {
      const el = render(item), box = el.querySelector("input[type=checkbox]");
      box.checked = done.has(item.id); el.classList.toggle("is-done", box.checked);
      box.addEventListener("change", () => {
        box.checked ? done.add(item.id) : done.delete(item.id);
        el.classList.toggle("is-done", box.checked);
        if (box.checked) { el.classList.add("is-popping"); setTimeout(() => el.classList.remove("is-popping"), 600); }
        store.set(storeKey, [...done]); counters();
      });
      return el;
    }));
    counters();
  }

  // Focus timer. root: [data-timer-display], [data-timer-toggle], [data-timer-reset],
  // [data-timer-preset="25"], [data-timer-progress] (gets --p 0..1)
  function timer(root) {
    if (!root) return;
    let total = 25 * 60, left = total, id = null, endAt = 0;
    const disp = root.querySelector("[data-timer-display]"), toggle = root.querySelector("[data-timer-toggle]");
    const paint = () => {
      disp.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
      root.querySelectorAll("[data-timer-progress]").forEach((p) => p.style.setProperty("--p", 1 - left / total));
      toggle.textContent = id ? "Pause" : left < total ? "Resume" : "Start focus";
      root.classList.toggle("is-running", !!id);
    };
    const stop = () => { clearInterval(id); id = null; };
    toggle.addEventListener("click", () => {
      if (id) { stop(); return paint(); }
      endAt = Date.now() + left * 1000;
      id = setInterval(() => { left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
        if (!left) { stop(); toast("Focus block done."); left = total; } paint(); }, 250);
      paint();
    });
    root.querySelector("[data-timer-reset]")?.addEventListener("click", () => { stop(); left = total; paint(); });
    root.querySelectorAll("[data-timer-preset]").forEach((b) => b.addEventListener("click", () => {
      stop(); total = left = +b.dataset.timerPreset * 60;
      root.querySelectorAll("[data-timer-preset]").forEach((x) => x.setAttribute("aria-pressed", x === b)); paint(); }));
    paint();
  }

  // SVG helpers: svg("line", {x1..}), arc(cx, cy, r, fromDeg, toDeg) with 0deg = 12 o'clock.
  const svg = (tag, attrs = {}) => { const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); return el; };
  function arc(cx, cy, r, a0, a1) {
    const p = (a) => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
  }

  window.Bento = { reduced, finePointer, store, fmt, countUp, reveal, spotlight, magnetic, toast, copyText, generator, checklist, timer, svg, arc };
})();
