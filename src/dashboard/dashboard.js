import "./ledger.css"
import "./dashboard.css"
import "./bento-core.js"
import D from "./data.js"

const { fmt } = window.Bento
const $ = (id) => document.getElementById(id)
const day = (iso, o) => fmt.day(iso, o ?? { month: "short", day: "numeric", year: "numeric" })
const month = (ym) => new Date(ym + "-15").toLocaleDateString("en-US", { month: "short", year: "2-digit" })

// ---------- headline numbers ----------
const monthly = D.git.monthly
const peak = monthly.reduce((a, b) => (b[1] > a[1] ? b : a))
const peaks = monthly.filter((m) => m[1] === peak[1]).map((m) => month(m[0]))
const active = monthly.filter((m) => m[1] > 0).length
const lh = D.lighthouse.scores
const lhAvg = Math.round(lh.reduce((s, x) => s + x.value, 0) / lh.length)

$("commits").dataset.count = D.git.commits
$("since").textContent = day(D.git.firstCommit)
$("prs").dataset.count = D.git.mergedPRs
$("releases").dataset.count = D.git.releases.length
$("latest-tag").textContent = D.git.releases.at(-1).tag
$("perf").textContent = lh[0].value
$("lh-avg").textContent = lhAvg
$("lh-date").textContent = day(D.lighthouse.runAt)
$("peak").dataset.count = peak[1]
$("peak-months").textContent = peaks.join(" and ")
$("active-months").textContent = `${active} of ${monthly.length}`
$("last-commit").textContent = day(D.git.lastCommit)

// ---------- phone: today ----------
$("phone-tag").textContent = D.git.releases.at(-1).tag
$("phone-js").textContent = D.migration.jsComponents.length

// ---------- cumulative commit staircase (one step per active month) ----------
let run = 0
const steps = monthly.filter((m) => m[1] > 0).map((m) => ({ ym: m[0], cum: (run += m[1]) }))
const w = 100 / steps.length
$("steps").innerHTML = steps.map((s, k) => `<div class="step${k === 0 ? " first" : ""}" style="left:${k * w}%;width:${100 - k * w}%;height:${10 + 90 * (s.cum / run)}%;--k:${k};background:${k % 2 ? "var(--yellow-2)" : "#ffda55"}">${k === 0 || k === steps.length - 1 ? `<span>${s.cum} — ${month(s.ym)}</span>` : ""}</div>`).join("")

// ---------- Lighthouse bars ----------
$("limits").innerHTML = lh.map((s) => `<div><span>${s.label}</span><span class="tr"><i style="--w:${s.value / 100}"></i></span><b>${s.value}</b></div>`).join("")

// ---------- monthly silhouette ----------
$("sil").innerHTML = monthly.map(([ym, n], k) => `<i style="--h:${n / peak[1]};--k:${k}" title="${month(ym)}: ${n} commits"></i>`).join("")
$("sil").setAttribute("aria-label", `Commits per month from ${month(monthly[0][0])} to ${month(monthly.at(-1)[0])}; peaks of ${peak[1]} in ${peaks.join(" and ")}`)

// ---------- vitals ----------
$("vitals").innerHTML = D.lighthouse.vitals.map((v) => `<div><b>${v.value}</b><span>${v.short} · ${v.label}</span></div>`).join("")

// ---------- migration ----------
$("migr-detail").textContent = D.migration.detail
$("migr-link").href = D.migration.href
$("migr-js").textContent = D.migration.jsComponents.join(" · ")
$("migr-date").textContent = day(D.migration.mergedAt)

// ---------- stack + commands ----------
$("stack").innerHTML = D.stack.map(([n, v]) => `<li><span>${n}</span><code>${v}</code></li>`).join("")
$("cmds").innerHTML = D.commands.map((c) => `<button type="button" class="chip-cmd" data-copy="${c.cmd}" data-copy-label="${c.label} command copied">${c.cmd}</button>`).join("")

// ---------- roadmap checklist ----------
// Shipped items start ticked the first time a viewer opens the page.
const shipped = D.roadmap.filter((r) => r.shipped).map((r) => r.id)
Bento.store.prefix = "yofolio:"
if (Bento.store.get("roadmap", null) == null) Bento.store.set("roadmap", shipped)
Bento.checklist($("road"), D.roadmap, (r) => {
  const li = document.createElement("li")
  li.innerHTML = `<label><span class="q">${r.quarter}</span><span><span class="t">${r.title}</span>${r.note ? `<span class="n">${r.note}</span>` : ""}<span class="tag${r.shipped ? " shipped" : ""}">${r.shipped ? "Shipped" : "Planned"}</span></span><input type="checkbox" aria-label="Mark “${r.title}” done"></label>`
  return li
}, { storeKey: "roadmap" })

// ---------- ticker ----------
const items = [
  ...D.git.releases.map((r) => `<span>${r.tag}<small>${r.note}</small></span>`),
  ...D.pages.map((p) => `<span>${p.split(" · ")[0]}<small>${p.split(" · ")[1]}</small></span>`),
]
const track = `<div class="ticker-track">${items.map((i) => `<span>${i}</span><span class="star" aria-hidden="true">✳</span>`).join("")}</div>`
$("ticker").innerHTML = track + track.replace('class="ticker-track"', 'class="ticker-track" aria-hidden="true" inert')
$("tick-ctl").addEventListener("click", (e) => {
  const b = e.currentTarget, paused = b.getAttribute("aria-pressed") !== "true"
  b.setAttribute("aria-pressed", paused); b.textContent = paused ? "▶" : "II"
  b.setAttribute("aria-label", paused ? "Play ticker" : "Pause ticker")
  b.closest(".b-ticker").classList.toggle("is-paused", paused)
})
if (Bento.reduced) $("ticker").style.flexWrap = "wrap"

$("collected").textContent = day(D.collectedAt)

Bento.reveal(".reveal")
Bento.countUp()
Bento.magnetic(".cta", 0.12)
