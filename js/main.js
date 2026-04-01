const inputElem = document.getElementById('terminalInput');
const outputArea = document.getElementById('outputArea');
const termBody = document.getElementById('terminalBody');

let cmdHistory = [], historyIndex = 0, isTyping = false;

function esc(s) {
    return String(s).replace(/[&<>"']/g, m =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function typewrite(el, html, charDelay = 6) {
    return new Promise(resolve => {
        const tokens = [];
        let i = 0;
        while (i < html.length) {
            if (html[i] === '<') {
                let tag = '';
                while (i < html.length && html[i] !== '>') tag += html[i++];
                tag += '>'; i++;
                tokens.push({ t: 'tag', v: tag });
            } else {
                let txt = '';
                while (i < html.length && html[i] !== '<') txt += html[i++];
                for (const c of txt) tokens.push({ t: 'char', v: c });
            }
        }
        el.innerHTML = '';
        let idx = 0;
        function next() {
            if (idx >= tokens.length) { isTyping = false; resolve(); return; }
            const tok = tokens[idx++];
            if (tok.t === 'tag') {
                el.innerHTML += tok.v;
                requestAnimationFrame(next);
            } else {
                const isVisible = tok.v.trim().length > 0;
                el.innerHTML += tok.v === ' ' ? ' ' : (tok.v === '\n' ? '<br>' : esc(tok.v));
                termBody.scrollTop = termBody.scrollHeight;
                if (isVisible) setTimeout(next, charDelay + Math.random() * 4);
                else requestAnimationFrame(next);
            }
        }
        isTyping = true;
        next();
    });
}

async function appendOutput(html, opts = {}) {
    const { isError = false, instant = false } = opts;
    const div = document.createElement('div');
    div.className = 'output-block' + (isError ? ' error' : '');
    outputArea.appendChild(div);
    termBody.scrollTop = termBody.scrollHeight;

    if (instant) {
        div.innerHTML = html;
    } else {
        await typewrite(div, html, 5);
    }

    div.querySelectorAll('.skill-bar-fill[data-val]').forEach(el => {
        setTimeout(() => el.style.width = el.dataset.val + '%', 80);
    });

    termBody.scrollTop = termBody.scrollHeight;
}

const CMDS = {
    about() {
        return `<div class="sec-header"><span class="sec-label">// profile</span></div>
<div class="about-card">
  <div class="about-bg"></div>
  <div class="about-content">
    <div>
      <div class="about-name">Sudam Shrestha</div>
      <div class="about-role">Senior Full Stack Developer &amp; Tech Educator</div>
      <div class="about-bio-line"><span class="ico">▸</span><span>6+ years building scalable web apps — Laravel, Filament, Vue/Nuxt, React &amp; Node.js.</span></div>
      <div class="about-bio-line"><span class="ico">▸</span><span>Tech Educator at <strong style="color:var(--cyan)">CodeIT Nepal</strong> — mentoring the next generation of developers in Dharan.</span></div>
      <div class="about-bio-line"><span class="ico">▸</span><span>Founder of <strong style="color:var(--cyan)">SudamHub</strong> — independent web &amp; software solutions based in Dharan.</span></div>
      <div class="about-bio-line"><span class="ico">▸</span><span style="color:var(--text-mute)">Dharan-11, Sunsari, Nepal 🇳🇵</span></div>
    </div>
    <div>
      <div class="stat-grid">
        <div class="stat-box"><div class="stat-num">6+</div><div class="stat-label">Years Exp.</div></div>
        <div class="stat-box"><div class="stat-num">50+</div><div class="stat-label">Projects</div></div>
        <div class="stat-box"><div class="stat-num">4+</div><div class="stat-label">Frameworks</div></div>
        <div class="stat-box"><div class="stat-num">∞</div><div class="stat-label">Coffee ☕</div></div>
      </div>
      <div class="motto-box">
        <div class="motto-label">// motto</div>
        <div class="motto-text">"Clean code, real impact, scalable systems."</div>
      </div>
    </div>
  </div>
</div>`;
    },

    whoami() { return CMDS.about(); },

    skills() {
        return `<div class="sec-header"><span class="sec-label">// tech stack</span></div>
<div class="tech-inline">
  <span class="t">Laravel</span><span class="sep">,</span>
  <span class="t">Filament</span><span class="sep">,</span>
  <span class="t">Vue.js</span><span class="sep">,</span>
  <span class="t">Nuxt.js</span><span class="sep">,</span>
  <span class="t">React</span><span class="sep">,</span>
  <span class="t">Next.js</span><span class="sep">,</span>
  <span class="t">Node.js</span><span class="sep">,</span>
  <span class="t">TailwindCSS</span><span class="sep">,</span>
  <span class="t">MySQL</span><span class="sep">,</span>
  <span class="t">PostgreSQL</span><span class="sep">,</span>
  <span class="t">REST API</span><span class="sep">,</span>
  <span class="t">GraphQL</span><span class="sep">,</span>
  <span class="t">Docker</span><span class="sep">,</span>
  <span class="t">CI/CD</span><span class="sep">,</span>
  <span class="t">Figma</span><span class="sep">,</span>
  <span class="t">PHP</span><span class="sep">,</span>
  <span class="t">JavaScript</span>
</div>
<div class="skill-group">
  <div class="skill-group-label">// proficiency</div>
  <div class="skill-row"><span class="skill-label">Laravel / Filament</span><div class="skill-bar-bg"><div class="skill-bar-fill" data-val="95"></div></div><span class="skill-pct">95%</span></div>
  <div class="skill-row"><span class="skill-label">TailwindCSS</span><div class="skill-bar-bg"><div class="skill-bar-fill" data-val="92"></div></div><span class="skill-pct">92%</span></div>
  <div class="skill-row"><span class="skill-label">Vue.js / Nuxt.js</span><div class="skill-bar-bg"><div class="skill-bar-fill" data-val="90"></div></div><span class="skill-pct">90%</span></div>
  <div class="skill-row"><span class="skill-label">REST / GraphQL APIs</span><div class="skill-bar-bg"><div class="skill-bar-fill" data-val="90"></div></div><span class="skill-pct">90%</span></div>
  <div class="skill-row"><span class="skill-label">React / Next.js</span><div class="skill-bar-bg"><div class="skill-bar-fill" data-val="88"></div></div><span class="skill-pct">88%</span></div>
  <div class="skill-row"><span class="skill-label">MySQL / PostgreSQL</span><div class="skill-bar-bg"><div class="skill-bar-fill" data-val="88"></div></div><span class="skill-pct">88%</span></div>
  <div class="skill-row"><span class="skill-label">Node.js</span><div class="skill-bar-bg"><div class="skill-bar-fill" data-val="85"></div></div><span class="skill-pct">85%</span></div>
  <div class="skill-row"><span class="skill-label">Docker / CI-CD</span><div class="skill-bar-bg"><div class="skill-bar-fill" data-val="80"></div></div><span class="skill-pct">80%</span></div>
</div>`;
    },

    projects() {
        return `<div class="sec-header"><span class="sec-label">// featured projects</span></div>
<div class="card-grid">
  <div class="proj-card"><div class="proj-title">📚 Student Portal API</div><div class="proj-desc">Backend API for student management at CodeIT. Handles data, auth, and real-time interactions.</div><span class="badge green">CodeIT</span></div>
  <div class="proj-card"><div class="proj-title">🎁 Koseli Express</div><div class="proj-desc">Full-stack gifting &amp; delivery e-commerce. Cart, payments, live order tracking.</div><span class="badge blue">SudamHub</span></div>
  <div class="proj-card"><div class="proj-title">❓ Jawaaf</div><div class="proj-desc">Community Q&amp;A and knowledge sharing platform with voting and moderation.</div><span class="badge blue">SudamHub</span></div>
  <div class="proj-card"><div class="proj-title">🍛 Dharan Kitchen</div><div class="proj-desc">Food ordering platform for local restaurants with menus and online ordering flow.</div><span class="badge blue">SudamHub</span></div>
  <div class="proj-card"><div class="proj-title">🔪 NB Khukuri</div><div class="proj-desc">Smart e-commerce for authentic Nepali khukuri products with global shipping.</div><span class="badge blue">SudamHub</span></div>
  <div class="proj-card"><div class="proj-title">🏫 CodeIT Platform</div><div class="proj-desc">IT training platform powering courses, student management, and certification flows.</div><span class="badge green">CodeIT</span></div>
</div>
<div style="font-size:11.5px;color:var(--text-mute);margin-top:4px">50+ projects delivered across CodeIT &amp; SudamHub.</div>`;
    },

    experience() {
        return `<div class="sec-header"><span class="sec-label">// work timeline</span></div>
<div class="timeline">
  <div class="timeline-item">
    <div class="tl-left"><div class="tl-dot"></div><div class="tl-line"></div></div>
    <div class="tl-right"><div class="tl-period">JAN 2022 — PRESENT</div><div class="tl-title">Senior Full Stack Developer &amp; Tech Educator — CodeIT Nepal</div><div class="tl-desc">Leading web development with Laravel, Filament, Vue &amp; React. Mentoring students on real-world projects.</div></div>
  </div>
  <div class="timeline-item">
    <div class="tl-left"><div class="tl-dot" style="background:var(--blue);box-shadow:0 0 8px rgba(77,159,255,0.5)"></div><div class="tl-line"></div></div>
    <div class="tl-right"><div class="tl-period">JUL 2020 — JAN 2022</div><div class="tl-title">Full Stack Developer — CodeIT Nepal</div><div class="tl-desc">Delivered 50+ projects using Laravel, Nuxt.js, and Node.js. Promoted from junior to full-time role.</div></div>
  </div>
  <div class="timeline-item">
    <div class="tl-left"><div class="tl-dot" style="background:var(--purple);box-shadow:0 0 8px rgba(176,125,255,0.5)"></div><div class="tl-line" style="background:transparent"></div></div>
    <div class="tl-right"><div class="tl-period">2019 — 2020</div><div class="tl-title">Intern — CodeIT Nepal</div><div class="tl-desc">Intensive one-year internship mastering PHP, JavaScript, and full-stack fundamentals.</div></div>
  </div>
</div>
<div style="padding:10px 14px;background:rgba(0,212,170,0.05);border:1px solid rgba(0,212,170,0.14);border-radius:6px;font-size:12px;color:var(--text-dim)">⚡ Also: Founder of <strong style="color:var(--cyan)">SudamHub</strong> — independent software &amp; web development services in Dharan.</div>`;
    },

    contact() {
        return `<div class="sec-header"><span class="sec-label">// get in touch</span></div>
<div class="contact-grid">
  <div class="contact-item"><div class="contact-ico">📧</div><div><div class="contact-label">Email</div><div class="contact-val">sudamshrestha939@gmail.com</div></div></div>
  <div class="contact-item"><div class="contact-ico">📱</div><div><div class="contact-label">Phone</div><div class="contact-val">+977 9704508525</div></div></div>
  <div class="contact-item"><div class="contact-ico">📍</div><div><div class="contact-label">Location</div><div class="contact-val">Dharan-11, Sunsari, Nepal</div></div></div>
  <div class="contact-item"><div class="contact-ico">🌐</div><div><div class="contact-label">Website</div><div class="contact-val">sudamshrestha.com.np</div></div></div>
</div>
<div style="margin-top:10px;font-size:11.5px;color:var(--text-mute)">Open for collaborations, freelance projects, and mentoring opportunities.</div>`;
    },

    help() {
        return `<div class="sec-header"><span class="sec-label">// available commands</span></div>
<div class="help-grid">
  <div class="help-row"><span class="help-cmd">about</span><span class="help-sep">→</span><span class="help-desc">Bio, role &amp; profile</span></div>
  <div class="help-row"><span class="help-cmd">skills</span><span class="help-sep">→</span><span class="help-desc">Tech stack &amp; proficiency</span></div>
  <div class="help-row"><span class="help-cmd">projects</span><span class="help-sep">→</span><span class="help-desc">Project showcase</span></div>
  <div class="help-row"><span class="help-cmd">experience</span><span class="help-sep">→</span><span class="help-desc">Work timeline</span></div>
  <div class="help-row"><span class="help-cmd">contact</span><span class="help-sep">→</span><span class="help-desc">Email &amp; details</span></div>
  <div class="help-row"><span class="help-cmd">tree</span><span class="help-sep">→</span><span class="help-desc">Directory structure</span></div>
  <div class="help-row"><span class="help-cmd">clear</span><span class="help-sep">→</span><span class="help-desc">Reset terminal</span></div>
  <div class="help-row"><span class="help-cmd">sudo</span><span class="help-sep">→</span><span class="help-desc">???</span></div>
</div>`;
    },

    tree() {
        return `<div class="tree-block"><span style="color:var(--cyan)">~/sudam/</span><br>
├── <span style="color:var(--text)">📄 about.me</span><span style="color:var(--text-mute)">      — Senior Full Stack · SudamHub Founder</span><br>
├── <span style="color:var(--text)">📂 skills/</span><span style="color:var(--text-mute)">       — Laravel · Vue · React · Node · Tailwind</span><br>
├── <span style="color:var(--text)">📂 projects/</span><span style="color:var(--text-mute)">     — 50+ delivered · CodeIT + SudamHub</span><br>
├── <span style="color:var(--text)">📂 experience/</span><span style="color:var(--text-mute)">   — 6+ years · CodeIT Nepal</span><br>
└── <span style="color:var(--text)">📞 contact.info</span><span style="color:var(--text-mute)">  — Dharan-11, Nepal</span><br><br>
<span style="color:var(--text-mute)">5 entries · last modified 2026</span></div>`;
    },

    sudo() {
        return `<span style="color:var(--orange)">[sudo] password for sudam: ••••••••••</span><br><span style="color:var(--green)">Access granted.</span> Secret: <em style="color:var(--text)">"Build real projects. Mentor others. Keep shipping."</em> 🚀`;
    },
};

function hardReset() {
    outputArea.innerHTML = `
<div class="boot-header">
  <div class="ascii-logo"> ██████  ██    ██ ██████   █████  ███    ███
██       ██    ██ ██   ██ ██   ██ ████  ████
 █████   ██    ██ ██   ██ ███████ ██ ████ ██
     ██  ██    ██ ██   ██ ██   ██ ██  ██  ██
██████    ██████  ██████  ██   ██ ██      ██</div>
  <div class="boot-meta">
    <div><span>OS&nbsp;&nbsp;</span> SudamOS v2026.1</div>
    <div><span>HOST</span> sudamhub.com</div>
    <div><span>SHELL</span> zsh 5.9</div>
    <div><span>LOC&nbsp;</span> Dharan, Nepal</div>
  </div>
</div>
<hr class="divider">
<div class="welcome-line">Terminal cleared. Type <span class="hl">'help'</span> to list commands.</div>
<hr class="divider">`;
}

async function processInput(raw) {
    const val = raw.trim();
    if (!val || isTyping) return;

    const echo = document.createElement('div');
    echo.className = 'cmd-echo';
    echo.innerHTML = `<span style="color:var(--green)">sudam</span><span style="color:var(--text-mute)">@sudamhub</span><span style="color:var(--cyan);margin:0 6px">›</span><span style="color:var(--text)">${esc(val)}</span>`;
    outputArea.appendChild(echo);

    cmdHistory.push(val);
    historyIndex = cmdHistory.length;
    inputElem.value = '';
    termBody.scrollTop = termBody.scrollHeight;

    const cmd = val.toLowerCase().split(/\s+/)[0];

    if (cmd === 'clear') { hardReset(); return; }

    if (CMDS[cmd]) {
        await appendOutput(CMDS[cmd]());
    } else {
        await appendOutput(
            `<span style="color:var(--red)">bash: ${esc(cmd)}: command not found</span>  —  type <span style="color:var(--cyan)">help</span> for available commands.`,
            { isError: true }
        );
    }
}

inputElem.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        processInput(inputElem.value);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) inputElem.value = cmdHistory[--historyIndex] || '';
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < cmdHistory.length - 1) inputElem.value = cmdHistory[++historyIndex];
        else { historyIndex = cmdHistory.length; inputElem.value = ''; }
    }
});

document.getElementById('terminalRoot').addEventListener('click', () => inputElem.focus());
inputElem.focus();

setTimeout(() => {
    appendOutput(`System booted. &nbsp;<span style="color:var(--text-mute)">Try:</span> <span style="color:var(--cyan)">about</span> · <span style="color:var(--cyan)">skills</span> · <span style="color:var(--cyan)">projects</span> · <span style="color:var(--cyan)">contact</span>`, { instant: true });
}, 200);