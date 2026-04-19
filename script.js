const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const drops = Array(Math.floor(canvas.width / 20)).fill(1);
function drawMatrix() {
  ctx.fillStyle = "rgba(2, 4, 10, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0366d6";
  ctx.font = "14px monospace";
  drops.forEach((y, i) => {
    const text = String.fromCharCode(Math.random() * 128);
    ctx.fillText(text, i * 20, y * 20);
    if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 50);

const cmd = document.getElementById("cmd");
const termBody = document.getElementById("termBody");
let stage = 0;

function log(msg, type = "info") {
  const p = document.createElement("p");
  if (type === "success") p.className = "text-emerald-400 font-bold";
  if (type === "error") p.className = "text-rose-500 font-bold";
  if (type === "warn") p.className = "text-amber-400 italic";
  p.innerHTML = `<span class="text-[#27c93f] mr-2">iPhone:~ root$</span> ${msg}`;
  termBody.appendChild(p);
  termBody.scrollTop = termBody.scrollHeight;
}

cmd.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = cmd.value.trim().toLowerCase();
    const m = document.getElementById("mailField").value || "target@vault.net";
    const p = document.getElementById("passField").value || "password123";
    log(`<span class="text-white">${cmd.value}</span>`);
    cmd.value = "";
    switch (val) {
      case "scan_ports":
        log("Scanning local ports (0-1024)...");
        setTimeout(
          () => log("Port 80 (HTTP), 443 (HTTPS), 22 (SSH) open.", "warn"),
          1000,
        );
        break;
      case "get_ip":
        log(
          `Detecting Target IP: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.1.142`,
        );
        break;
      case "recon":
        log(`Searching digital trail for ${m}...`);
        setTimeout(() => {
          log("Data found: Social Media, GitHub, Linked Database.", "success");
          document.getElementById("t1").classList.add("tag-active");
          stage = 1;
        }, 1200);
        break;
      case "bypass_firewall":
        if (stage < 1) return log("Error: Need target recon first.", "error");
        log("Injecting SQL payload to bypass Cloudflare...", "warn");
        setTimeout(() => {
          log("Firewall bypassed. Entry point secured.", "success");
          document.getElementById("t2").classList.add("tag-active");
          stage = 2;
        }, 1500);
        break;
      case "crack":
        if (stage < 2)
          return log(
            "Error: Firewall still active. Use 'bypass_firewall'.",
            "error",
          );
        log("Starting GPU Brute-Force...", "warn");
        let i = 0;
        const itv = setInterval(() => {
          log(
            `[HASH] ${Math.random().toString(36).substr(2, 6)} ... NO`,
            "info",
          );
          if (i++ > 15) {
            clearInterval(itv);
            log(`CAPTURED PASS: ${p}`, "success");
            document.getElementById("t3").classList.add("tag-active");
            stage = 3;
          }
        }, 50);
        break;
      case "clear_logs":
        if (stage < 3) return log("Error: Exploit not complete.", "error");
        log(
          "Erasing session evidence... Transferring to Dark Web Hub.",
          "success",
        );
        document.getElementById("t4").classList.add("tag-active");
        setTimeout(() => launchDarkWeb(m, p), 1200);
        break;
      default:
        log(`bash: command not found: ${val}`, "error");
    }
  }
});

function analyzeStrength(p) {
  let s = 0;
  const crits = {
    "l-8": p.length >= 8,
    "l-up": /[A-Z]/.test(p),
    "l-num": /[0-9]/.test(p),
    "l-spec": /[^A-Za-z0-9]/.test(p),
  };
  Object.entries(crits).forEach(([id, met]) => {
    const el = document.getElementById(id);
    if (met) {
      s += 25;
      el.style.color = "#00f260";
      el.style.borderColor = "#00f26033";
    } else {
      el.style.color = "#484f58";
      el.style.borderColor = "#ffffff08";
    }
  });
  document.getElementById("pFill").style.width = s + "%";
  document.getElementById("pScore").innerText = s + "%";
  const d = document.getElementById("pDesc");
  if (s <= 25) d.innerText = "CRITICAL: Exploit time < 1 second.";
  else if (s <= 75) d.innerText = "WARNING: Moderate resistance detected.";
  else d.innerText = "SECURE: High resistance. Brute-force unlikely.";
}

function launchDarkWeb(m, p) {
  document.getElementById("dwUser").innerText = m;
  document.getElementById("dwPass").innerText = p;
  document.getElementById("iosOverlay").style.display = "flex";
  setTimeout(() => {
    document.getElementById("torBrowserUI").style.display = "flex";
    let s = 0;
    const status = [
      "Hashing Identity...",
      "Uploading to Tor-Bay...",
      "Waiting for Bids...",
      "DEAL CLOSED",
    ];
    const itv = setInterval(() => {
      document.getElementById("dwStatus").innerText = status[s++];
      if (s === 4) {
        clearInterval(itv);
        document.getElementById("soldBox").classList.remove("hidden");
        setTimeout(
          () =>
            (document.getElementById("finalOverlay").style.display = "flex"),
          4000,
        );
      }
    }, 1500);
  }, 1200);
}

setInterval(() => {
  const now = new Date();
  document.getElementById("iosClock").innerText =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");
}, 1000);
