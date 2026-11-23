/* Reads window.INVITE (invite.config.js) and builds the page. No libraries.
   One animation loop drives every scroll effect (see "scroll scenes"). */
(function () {
  "use strict";
  const I = window.INVITE, C = I.copy;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // ?render = frame-by-frame mode used to export the video (each __tick() is one video frame)
  const RENDER = /[?&]render\b/.test(location.search);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const br = s => esc(s).replace(/\n/g, "<br>");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const MONTHS = ["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्टूबर","नवम्बर","दिसम्बर"];
  const DAYS = ["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"];
  const img = f => "assets/img/" + f;
  const dparts = s => { const [y, m, d] = s.split("-").map(Number); return { y, m: MONTHS[m - 1], mn: String(m).padStart(2, "0"), d: String(d).padStart(2, "0"), wd: DAYS[new Date(y, m - 1, d).getDay()] }; };
  const main = I.events.find(e => e.main) || I.events[I.events.length - 1];
  const md = dparts(I.mainDate);
  const G = I.groom, B = I.bride, H = I.host, V = I.venue;
  // each word becomes a span so it can light up while scrolling
  // "श्रीमती X – श्री Y": each half stays on one line, wrap only at the dash
  const pair = x => esc(x).split(/\s*[–-]\s+/).map(h => `<i class="nw">${h}</i>`).join(' <i class="dash">–</i> ');
  const words = (s, cls) => esc(s).split(/\s+/).filter(Boolean).map(w => `<span class="w${cls ? " " + cls : ""}">${w}</span>`).join(" ");

  /* ---------------- sections ---------------- */
  function intro() {
    return `<div class="intro" id="intro" role="dialog" aria-label="${esc(C.gateBtn)}"><div class="intro-in">
      <p class="i-mantra">${esc(C.mantra)}</p>
      <div class="orb" aria-hidden="true"><span>ॐ</span></div>
      <p class="i-names">${esc(G.name)}<em>${esc(C.sang)}</em>${esc(B.name)}</p>
      ${(C.gateLines || []).length ? `<div class="i-card">${C.gateLines.map(l => `<p class="i-row${l.main ? " main" : ""}"><b>${esc(l.d)}</b><span>${esc(l.t)}</span></p>`).join("")}</div>` : `<p class="i-date">${md.d} ${md.m} ${md.y} · ${md.wd}</p>`}
      <button type="button" class="i-btn" id="openBtn">${esc(C.gateBtn)}</button>
    </div></div>`;
  }

  function hero() {
    const ring = `PRITIBHOJ • ${md.d} • ${md.mn} • ${md.y} • `;
    return `<section class="hero" id="top" data-bg="#FFCB2F"><div class="stick">
      <div class="glow" aria-hidden="true"></div>
      <svg class="halo" id="halo" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="98"/><circle class="dash" cx="100" cy="100" r="86"/><circle cx="100" cy="100" r="70"/></svg>
      <div class="hero-top"><p class="mantra">${esc(C.mantra)}</p><p class="kick">${esc(C.kicker)}<i></i>${md.d} ${md.m} ${md.y}</p></div>
      <h1 class="sr">${esc(G.name)} ${esc(C.sang)} ${esc(B.name)}</h1>
      <div class="names" aria-hidden="true">
        <p class="big n1" id="n1"><span class="in">${esc(G.name)}</span></p>
        <p class="mid-sang"><span class="in">${esc(C.sang)}</span></p>
        <p class="big n2" id="n2"><span class="in">${esc(B.name)}</span></p>
      </div>
      <div class="hero-couple" id="hcouple"><img src="${img(I.images.couple)}" alt="${esc(G.name)} ${esc(C.sang)} ${esc(B.name)}" width="766" height="900" fetchpriority="high"></div>
      <div class="badge" id="badge" aria-hidden="true">
        <svg viewBox="0 0 100 100"><defs><path id="ringp" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
        <text><textPath href="#ringp">${ring}</textPath></text></svg><b>ॐ</b></div>
      <a class="hint" href="#patra" aria-label="आगे"><i></i></a>
    </div></section>`;
  }

  const lineage = (tag, list) => list && list.length
    ? `<div class="lin rv"><span class="tag">${esc(tag)}</span><p>${list.map(x => `<span>${pair(x)}</span>`).join("")}</p></div>` : "";

  function letter() {
    return `<section class="letter" id="patra" data-bg="#FFF4CC"><div class="wrap">
      <p class="mantra-c rv">${esc(C.mantra)}</p>
      <p class="shloka rv">${br(C.shloka)}</p>
      <span class="sep" aria-hidden="true"></span>
      <p class="salute rv">${esc(C.salute)}</p>
      <p class="p-intro rv">${esc(C.intro.replace(/[.…]+$/, ""))}</p>
      ${lineage("सुपौत्र", H.grandparents)}
      ${lineage("सुपुत्र", H.parents)}
      <h2 class="p-names rv">
        <span class="nm"><small>${esc(G.prefix)}</small><b>${esc(G.name)}</b></span>
        <em>${esc(C.sang)}</em>
        <span class="nm"><small>${esc(B.prefix)}</small><b>${esc(B.name)}</b></span>
      </h2>
      ${lineage("सुपुत्री", B.parents)}
      <p class="p-close rv">${esc(C.ke)}</p>
      ${I.reception ? `<p class="p-close rv"><b>${esc(main.badge || I.reception.label)}</b><br>${esc(I.reception.time)} · ${esc(I.reception.name)}</p>` : ""}
      <p class="p-final rv">${esc(C.final)}</p>
      <span class="sep" aria-hidden="true"></span>
      <p class="doha rv">${br(C.doha)}</p>
    </div></section>`;
  }

  function duo() {
    const rel = lineage("सुपौत्र", H.grandparents) + lineage("सुपुत्र", H.parents);
    return `<section class="duo" id="var-vadhu" data-bg="#FFCB2F">
      <div class="wrap"><p class="eyebrow">${esc(C.coupleTitle)}</p></div>
      <article class="person groom" data-scene="person">
        <span class="p-word" aria-hidden="true">${esc(C.groomLabel)}</span>
        <img class="p-img" src="${img(I.images.groom)}" alt="${esc(G.name)}" loading="lazy" width="645" height="900">
        <div class="p-txt"><p class="p-lab">${esc(C.groomLabel)}</p>
          <h2><small>${esc(G.prefix)}</small>${esc(G.name)}</h2>
          <div class="p-rel">${rel}</div>${H.place ? `<p class="p-place">${esc(H.place)}</p>` : ""}</div>
      </article>
      <div class="and-row" aria-hidden="true"><span>${esc(C.sang)}</span></div>
      <article class="person bride" data-scene="person">
        <span class="p-word" aria-hidden="true">${esc(C.brideLabel)}</span>
        <img class="p-img" src="${img(I.images.bride)}" alt="${esc(B.name)}" loading="lazy" width="383" height="504">
        <div class="p-txt"><p class="p-lab">${esc(C.brideLabel)}</p>
          <h2><small>${esc(B.prefix)}</small>${esc(B.name)}</h2>
          <div class="p-rel">${lineage("सुपुत्री", B.parents)}</div></div>
      </article>
    </section>`;
  }

  function events() {
    const n = I.events.length;
    const panels = I.events.map(e => {
      const p = dparts(e.date), meta = [e.time, e.place].filter(Boolean).map(esc).join(" · ");
      return `<article class="ev t-${esc(e.tone)}${e.main ? " main" : ""}" id="ev-${esc(e.key)}">
        <span class="ev-num" aria-hidden="true">${p.d}</span>
        <div class="ev-artwrap"><img class="ev-art" src="${img(e.image)}" alt="${esc(e.name)}" loading="lazy"></div>
        <div class="ev-txt">${e.badge ? `<p class="ev-badge">${esc(e.badge)}</p>` : ""}<p class="ev-date">${p.d} ${p.m} ${p.y} · ${p.wd}</p><h3>${esc(e.name)}</h3>
          ${meta ? `<p class="ev-meta">${meta}</p>` : ""}${e.note ? `<p class="ev-note">${esc(e.note)}</p>` : ""}
          ${e.map ? `<div class="btns ev-btns"><a class="btn" href="${mapUrl(e.map === "reception" ? I.reception : V)}" target="_blank" rel="noopener">${esc(C.mapBtn)}</a></div>` : ""}</div>
      </article>`;
    }).join("");
    return `<section class="events" id="karyakram" style="--n:${n}" data-bg="#F7B300"><div class="ev-stick">
      <div class="ev-head"><p class="eyebrow">${esc(C.eventsTitle)}</p><p class="ev-count"><b id="evI">01</b> / ${String(n).padStart(2, "0")}</p></div>
      <div class="ev-bar"><i id="evBar"></i></div>
      <div class="ev-track" id="evTrack">${panels}</div>
    </div></section>`;
  }

  function countdown() {
    return `<section class="count" id="ghadi" data-bg="#FFE27A"><div class="wrap">
      <p class="eyebrow" id="cdTitle">${esc(C.countdownTitle)}</p>
      <div class="cd" id="cd">
        <div><b id="cdD">00</b><span>दिन</span></div><div><b id="cdH">00</b><span>घंटे</span></div>
        <div><b id="cdM">00</b><span>मिनट</span></div><div><b id="cdS">00</b><span>सेकंड</span></div>
      </div>
      ${I.reception ? `<p class="cd-when">${esc(I.reception.name)}, ${md.d} ${md.m} ${md.y} · ${esc(I.reception.time)}</p>` : ""}
      <button type="button" class="btn ghost" id="petalBtn">${esc(C.petalBtn)}</button>
    </div></section>`;
  }

  function marquee() {
    const one = `<span>${esc(G.name)}</span><span><em>${esc(C.mqWeds || "weds")}</em></span><span>${esc(B.name)}</span>${C.mqTail ? `<span>${esc(C.mqTail)}</span><span class="dot">•</span>` : ""}`;
    return `<div class="marquee" aria-hidden="true"><div class="mq-row" id="mq"><div class="mq-in">${one.repeat(4)}</div></div></div>`;
  }

  // Google Maps link: exact pin if lat/lng given, otherwise a search
  const mapUrl = v => v.lat != null && v.lng != null
    ? "https://www.google.com/maps/dir/?api=1&destination=" + v.lat + "," + v.lng
    : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.mapQuery || (v.name + ", " + v.address));
  const ics = s => new Date(s).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const calUrl = (title, cal, place, details) => "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(title) +
    "&dates=" + ics(cal.start) + "/" + ics(cal.end) + "&location=" + encodeURIComponent(place) + "&details=" + encodeURIComponent(details || "");

  function stop(v, cls, cal) {
    const p = dparts(v.date);
    return `<div class="vstop ${cls}">
      <p class="vs-chip">${esc(v.label)} · ${p.d} ${p.m}</p>
      <h3 class="vs-name">${esc(v.name)}</h3>
      <p class="vs-addr">${esc(v.address)}${v.time ? ` · ${esc(v.time)}` : ""}</p>
      <div class="btns"><a class="btn" href="${mapUrl(v)}" target="_blank" rel="noopener">${esc(C.mapBtn)}</a>
      ${cal ? `<a class="btn ghost" href="${cal}" target="_blank" rel="noopener">${esc(C.calBtn)}</a>` : ""}</div>
    </div>`;
  }

  function venue() {
    const R = I.reception, title = G.name + " " + C.sang + " " + B.name;
    const W = I.events.find(e => e.key === "vivah") || main;   // the wedding (9 Dec) keeps its own calendar entry
    const calW = calUrl(I.pageTitle, I.calendar, V.name + ", " + V.address, (W.name || "") + (W.time ? ", " + W.time : "") + (V.shortLink ? "\nनक्शा: " + V.shortLink : ""));
    const calR = R && R.calendar ? calUrl(R.label + " · " + title, R.calendar, R.name + ", " + R.address, "तिलकोत्सव एवं प्रीतिभोज") : "";
    return `<section class="venue" id="sthal" data-bg="#FFCB2F"><div class="v-stick">
      <div class="v-head"><p class="eyebrow">${esc(C.venueTitle)}</p></div>
      <div class="vroute" id="vroute">
        <div class="vr-rail" aria-hidden="true"><i class="vr-fill" id="vrFill"></i><b class="vr-dot top"></b><b class="vr-dot bot"></b>
          <span class="marigold" id="marigold">${marigoldSVG()}</span></div>
        <div class="vr-stops">
          ${R ? stop(R, "on", calR) : ""}
          ${V.route && V.route.label ? `<p class="vr-mid" id="vrMid">${esc(V.route.label)}</p>` : ""}
          ${stop(V, "wed", calW)}
        </div>
      </div>
    </div></section>`;
  }

  function marigoldSVG() {
    let petals = "";
    for (let i = 0; i < 12; i++) petals += `<ellipse cx="20" cy="9" rx="4.2" ry="8" transform="rotate(${i * 30} 20 20)" fill="#E8700C"/>`;
    for (let i = 0; i < 12; i++) petals += `<ellipse cx="20" cy="12" rx="3.2" ry="6" transform="rotate(${i * 30 + 15} 20 20)" fill="#F7A21B"/>`;
    return `<svg viewBox="0 0 40 40">${petals}<circle cx="20" cy="20" r="5" fill="#B3121F"/></svg>`;
  }

  function family() {
    const F = I.family || {}, grp = (label, list) => list && list.length
      ? `<div class="grp"><h3>${esc(label)}</h3><p>${list.map(x => `<span>${pair(x)}</span>`).join("")}</p></div>` : "";
    const g = grp(C.vineetLabel, F.vineet) + grp(C.darshanLabel, F.darshan) + grp(C.swagatLabel, F.swagat);
    const bm = I.balManuhar && I.balManuhar.names && I.balManuhar.names.length ? `<div class="bal">
      <p class="eyebrow">${esc(C.balTitle)}</p><p class="bal-line">${esc(I.balManuhar.line)}</p>
      <p class="bal-names">${I.balManuhar.names.map((x, i) => `<span style="animation-delay:${-i * .7}s">${esc(x)}</span>`).join("")}</p></div>` : "";
    const ct = (I.contacts || []).length ? `<div class="grp" style="margin-top:8svh"><h3>${esc(C.contactTitle)}</h3><p>${I.contacts.map(c =>
      `<span>${esc(c.label)} · <a href="tel:${esc(c.phone)}">${esc(c.phone)}</a></span>`).join("")}</p></div>` : "";
    if (!g && !bm && !ct) return "";
    return `<section class="family" id="parijan" data-bg="#FFF4CC"><div class="wrap">
      <p class="eyebrow">${esc(H.familyName)}</p><h2 class="h-big">${esc(C.familyTitle)}</h2>
      <div class="groups">${g}</div>${bm}${ct}</div></section>`;
  }

  function rsvp() {
    return `<section class="rsvp" id="rsvp" data-bg="#FFCB2F"><div class="wrap">
      <p class="eyebrow">${esc(C.navRsvp)}</p><h2 class="h-big" style="margin-bottom:0">${esc(C.rsvpTitle)}</h2>
      <form class="form" id="rsvpForm" autocomplete="on">
        <div class="field"><label for="gname">${esc(C.rsvpName)}</label><input type="text" id="gname" name="name" placeholder="—"></div>
        <div class="field" id="gbox"><span class="lab">${esc(C.rsvpGuests)}</span><div class="stepper">
          <button type="button" id="gminus" aria-label="कम">−</button><output id="gcount">1</output><button type="button" id="gplus" aria-label="अधिक">+</button></div></div>
        <div class="btns"><a class="btn" id="shareBtn" href="#" target="_blank" rel="noopener">${esc(C.shareBtn)}</a>
          <a class="btn ghost" id="waBtn" href="#" target="_blank" rel="noopener">${esc(C.rsvpBtn)}</a></div>
      </form></div></section>`;
  }

  /* ---------------- build ---------------- */
  document.documentElement.classList.add("js");
  document.title = I.pageTitle || document.title;
  document.body.insertAdjacentHTML("afterbegin", reduce ? "" : intro());
  $("#app").innerHTML = hero() + letter() + duo() + events() + countdown() + marquee() + venue() + family() + rsvp();
  $("#fabRsvp").textContent = C.ctaRsvp;

  /* ---------------- links ---------------- */
  const evOf = k => I.events.find(e => e.key === k), dl = d => { const p = dparts(d); return p.d + " " + p.m + " " + p.y + ", " + p.wd; };
  const R = I.reception, bar = evOf("baraat"), viv = evOf("vivah");
  const shareMsg = [
    "🙏 *" + H.familyName + " का स्नेहिल निमंत्रण* 🙏", "",
    "💛 *शुभ विवाह* — *" + G.prefix + " " + G.name + " " + C.sang + " " + B.prefix + " " + B.name + "*", "",
    ...(R ? ["✨ *" + (C.shareMain || R.label) + "*", "📅 " + dl(R.date) + " · " + R.time, "📍 " + R.name + ", " + R.address, ""] : []),
    ...(bar ? ["🐎 बारात: " + dl(bar.date) + (bar.time ? " · " + bar.time : ""), ""] : []),
    C.shareLine || "", "",
    C.shareOpen || "", location.href.split("#")[0]
  ].join("\n");
  $("#shareBtn").href = "https://wa.me/?text=" + encodeURIComponent(shareMsg);

  /* ---------------- RSVP ---------------- */
  let guests = 1;
  function rsvpLink() {
    const name = $("#gname").value.trim() || "एक अतिथि";
    const msg = "नमस्ते 🙏 " + name + " सपरिवार (" + guests + " लोग) " + G.name + " " + C.sang + " " + B.name + " के शुभ विवाह में सहर्ष पधारेंगे।\n\n" + (C.shareOpen || "") + "\n" + location.href.split("#")[0];
    $("#waBtn").href = "https://wa.me/" + (I.rsvpPhone || "") + "?text=" + encodeURIComponent(msg);
  }
  $("#gminus").onclick = () => { guests = Math.max(1, guests - 1); $("#gcount").textContent = guests; rsvpLink(); };
  $("#gplus").onclick = () => { guests = Math.min(15, guests + 1); $("#gcount").textContent = guests; rsvpLink(); };
  $("#rsvpForm").addEventListener("input", rsvpLink);
  $("#rsvpForm").addEventListener("change", rsvpLink);
  $("#rsvpForm").addEventListener("submit", e => e.preventDefault());
  rsvpLink();

  /* ---------------- countdown ---------------- */
  const T = new Date(I.countdownTo).getTime(), pad = n => String(n).padStart(2, "0");
  function tick() {
    const ms = T - Date.now();
    if (ms <= 0) { $("#cdTitle").textContent = C.countdownDone; $("#cd").style.display = "none"; return false; }
    const s = Math.floor(ms / 1000);
    $("#cdD").textContent = pad(Math.floor(s / 86400)); $("#cdH").textContent = pad(Math.floor(s % 86400 / 3600));
    $("#cdM").textContent = pad(Math.floor(s % 3600 / 60)); $("#cdS").textContent = pad(s % 60);
    return true;
  }
  if (tick()) setInterval(tick, 1000);

  /* ---------------- petals: a few always drifting, plus bursts ---------------- */
  const cv = $("#petals"), cx = cv.getContext("2d"); let parts = [], dpr = 1, W = innerWidth, Hh = innerHeight;
  const size = () => { dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; Hh = innerHeight; cv.width = W * dpr; cv.height = Hh * dpr; };
  size();
  const COLS = ["#E8700C", "#F28C0F", "#B3121F", "#FFF4CC", "#D98200"];
  const petal = top => ({ x: Math.random() * W, y: top ? -20 - Math.random() * Hh * .7 : Math.random() * Hh, vy: .5 + Math.random() * 1.3,
    sw: Math.random() * 6.28, sp: .015 + Math.random() * .03, r: Math.random() * 6.28, vr: (Math.random() - .5) * .06, s: 5 + Math.random() * 6,
    c: COLS[(Math.random() * COLS.length) | 0] });
  function burst(n) { if (!reduce) for (let i = 0; i < n; i++) parts.push(Object.assign(petal(true), { vy: 2.2 + Math.random() * 2.6, y: -20 - Math.random() * Hh * .45, s: 7 + Math.random() * 8 })); }
  let ambient = 0;
  function drawPetals() {
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, W, Hh);
    while (parts.length < ambient) parts.push(petal(true));
    for (let i = parts.length - 1; i >= 0; i--) if (parts[i].y > Hh + 30) { if (i < ambient) parts[i] = petal(true); else parts.splice(i, 1); }
    for (const p of parts) {
      p.sw += p.sp; p.y += p.vy; p.x += Math.sin(p.sw) * .9 - vel * .02; p.r += p.vr;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.scale(1, Math.abs(Math.cos(p.sw * 1.3)) * .6 + .4);
      cx.fillStyle = p.c; cx.beginPath(); cx.moveTo(0, -p.s); cx.quadraticCurveTo(p.s * .9, 0, 0, p.s); cx.quadraticCurveTo(-p.s * .9, 0, 0, -p.s); cx.fill(); cx.restore();
    }
  }
  $("#petalBtn").addEventListener("click", () => burst(140));

  /* ---------------- sound: starts with the first tap, pauses when the page is hidden ---------------- */
  let audio = null, playing = false, opened = reduce;
  function play() {
    if (!I.song || playing) return;
    if (!audio) { audio = new Audio(I.song); audio.loop = true; audio.volume = .55; }
    audio.play().then(() => { playing = true; }).catch(() => {});
  }
  addEventListener("pointerdown", () => { if (opened && !playing) play(); }, { passive: true });
  document.addEventListener("visibilitychange", () => { if (!audio) return; if (document.hidden) { audio.pause(); playing = false; } });

  /* ---------------- intro ---------------- */
  const introEl = $("#intro");
  function openIntro(byTap) {
    if (opened) return; opened = true;
    if (byTap) play();
    introEl.classList.add("open");
    document.body.classList.remove("locked");
    burst(190);   // flowers start pouring the moment the gate is tapped
    setTimeout(() => { document.documentElement.classList.add("ready"); burst(90); ambient = innerWidth < 700 ? 12 : 20; }, 350 * (RENDER ? 6.7 : 1));
    setTimeout(() => { introEl.classList.add("gone"); measure(); }, 1300 * (RENDER ? 6.7 : 1));
  }
  if (reduce) document.documentElement.classList.add("ready");
  else { document.body.classList.add("locked"); introEl.addEventListener("click", () => openIntro(true)); if (RENDER) window.__open = () => openIntro(false); else setTimeout(() => openIntro(false), 3400); }

  /* ---------------- scroll scenes ----------------
     y  = real scroll position, ys = smoothed (eased toward y every frame).
     Every effect below reads ys, which gives the soft "glide" feel without
     taking over native scrolling. */
  const heroEl = $("#top"), n1 = $("#n1"), n2 = $("#n2"), hc = $("#hcouple"), halo = $("#halo"), badge = $("#badge");
  const evSec = $("#karyakram"), track = $("#evTrack"), evPanels = $$(".ev", track), evBar = $("#evBar"), evI = $("#evI");
  const venueSec = $("#sthal"), vrFill = $("#vrFill"), mari = $("#marigold"), vrMid = $("#vrMid"), wedStop = $(".vstop.wed"), evStick = $(".ev-stick");
  const persons = $$("[data-scene=person]"), mq = $("#mq"), prog = $(".progress i"), fab = $("#fabRsvp");
  const bgSecs = $$("[data-bg]"), sangEl = $(".mid-sang");
  let M = {}, y = scrollY, ys = scrollY, vel = 0, last = -1, bgNow = "";

  const box = el => ({ top: el.getBoundingClientRect().top + scrollY, h: el.offsetHeight });
  function measure() {
    size();
    // route rail runs from the first stop's label to the wedding stop's label
    const rail = $(".vr-rail"); if (rail && wedStop) rail.style.height = wedStop.offsetTop + "px";
    M = { vh: innerHeight, doc: document.documentElement.scrollHeight - innerHeight,
      hero: box(heroEl), ev: box(evSec), venue: box(venueSec), persons: persons.map(box), bg: bgSecs.map(box),
      rsvp: box($("#rsvp")) };
    last = -1;
  }
  // 0..1 progress through a pinned section (sticky child is 100vh tall)
  const pin = b => clamp((ys - b.top) / Math.max(1, b.h - M.vh), 0, 1);
  // 0..1 while an element travels from below the screen to above it
  const view = b => clamp((ys + M.vh - b.top) / (b.h + M.vh), 0, 1);

  function frame() {
    y = scrollY;
    const d = y - ys; ys = Math.abs(d) < .1 ? y : ys + d * (RENDER ? .28 : .13);
    vel += ((y - (frame.py || y)) - vel) * .15; frame.py = y;

    if (Math.abs(ys - last) > .05) {
      last = ys;
      prog.style.transform = `scaleX(${M.doc > 0 ? clamp(ys / M.doc, 0, 1) : 0})`;

      // hero: names drift apart, couple steps forward, halo turns
      const hp = pin(M.hero);
      n1.style.transform = `translateX(${-hp * 40}vw)`; n2.style.transform = `translateX(${hp * 40}vw)`;
      n1.style.opacity = n2.style.opacity = 1 - hp * .8; sangEl.style.opacity = 1 - hp * 2;
      hc.style.transform = `translateX(-50%) translateY(${-hp * 4}svh) scale(${1 + hp * .16})`;
      halo.style.transform = `translate(-50%,-50%) rotate(${hp * 120}deg) scale(${1 + hp * .25})`;
      badge.style.transform = `rotate(${ys * .25}deg)`;

      // var / vadhu: picture and big word move against each other
      persons.forEach((el, i) => {
        const p = view(M.persons[i]) - .5, s = i ? -1 : 1;
        el.querySelector(".p-img").style.transform = `translateY(${p * 14}%) rotate(${p * 4 * s}deg)`;
        el.querySelector(".p-word").style.transform = `translateX(${-p * 40 * s}vw)`;
      });

      // events: vertical scroll moves the track sideways
      const n = evPanels.length, ep = pin(M.ev), pos = ep * (n - 1);
      track.style.transform = `translateX(${-pos * 100}vw)`;
      evBar.style.transform = `scaleX(${ep})`;
      const cur = Math.min(n - 1, Math.round(pos));
      evI.textContent = String(cur + 1).padStart(2, "0");
      evStick.classList.toggle("dark", evPanels[cur].classList.contains("t-reception"));
      evPanels.forEach((pn, i) => {
        const o = i - pos, a = Math.abs(o);
        pn.querySelector(".ev-art").style.transform = `translateX(${o * 38}vw) rotate(${o * -8}deg) scale(${1 - Math.min(a, 1) * .18})`;
        pn.querySelector(".ev-num").style.transform = `translateX(${o * 60}vw)`;
        pn.querySelector(".ev-txt").style.transform = `translateX(${o * 18}vw)`;
      });

      // venue: a marigold travels from the reception to the wedding
      const vp = clamp(pin(M.venue) * 1.2, 0, 1);
      vrFill.style.transform = `scaleY(${vp})`;
      mari.style.top = (vp * 100) + "%";
      mari.style.transform = `translate(-50%,-50%) rotate(${vp * 540}deg)`;
      if (vrMid) vrMid.classList.toggle("on", vp > .35);
      wedStop.classList.toggle("on", vp > .92);

      // page colour follows the section in the middle of the screen
      const mid = ys + M.vh / 2;
      for (let i = 0; i < bgSecs.length; i++) {
        const b = M.bg[i];
        if (mid >= b.top && mid < b.top + b.h) { const c = bgSecs[i].dataset.bg; if (c !== bgNow) { document.body.style.backgroundColor = c; bgNow = c; } break; }
      }
      fab.classList.toggle("show", opened && ys > M.vh * .8 && ys + M.vh < M.rsvp.top + 40);
    }
    // marquee leans with scroll speed
    mq.style.transform = `skewX(${clamp(-vel * .35, -14, 14)}deg)`;
    if (!reduce && (ambient || parts.length)) drawPetals();
    if (!RENDER) requestAnimationFrame(frame);
  }

  measure();
  addEventListener("resize", measure);
  addEventListener("load", measure);
  if (document.fonts) document.fonts.ready.then(measure);
  $$("img").forEach(im => im.complete || im.addEventListener("load", measure, { once: true }));
  if (RENDER) window.__tick = frame;
  else if (!reduce) requestAnimationFrame(frame);

  /* fade-up reveal for text blocks (always readable if this never runs) */
  if ("IntersectionObserver" in window && !reduce) {
    document.documentElement.classList.add("rv-on");
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
    $$(".rv").forEach(el => io.observe(el));
  }
  else { $$(".vstop,.vr-mid").forEach(e => e.classList.add("on")); vrFill.style.transform = "none"; }
})();
