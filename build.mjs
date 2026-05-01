import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

const CONTENT_DIR = 'content/blog';
const BLOG_OUT    = 'src/blog';
const DEFAULT_IMG = 'blog_headache.jpg';

// ── helpers ────────────────────────────────────────────────────────────────

function formatDate(iso) {
  const [y, m, d] = String(iso).slice(0, 10).split('-');
  return `${y}年${m}月${d}日`;
}

function getRelated(slug, tags, all) {
  return all
    .filter(p => p.slug !== slug)
    .map(p => ({
      p,
      score: (p.data.tags || []).filter(t => (tags || []).includes(t)).length
    }))
    .sort((a, b) => b.score - a.score || new Date(b.p.data.date) - new Date(a.p.data.date))
    .slice(0, 2)
    .map(x => x.p);
}

// ── load all posts ──────────────────────────────────────────────────────────

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

const posts = files.map(f => {
  const raw  = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
  const { data, content } = matter(raw);
  return { slug: f.replace('.md', ''), data, content };
}).sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

// ── generate individual post pages ─────────────────────────────────────────

function makePost(post, all) {
  const { slug, data, content } = post;
  const html     = marked.parse(content);
  const dateStr  = formatDate(data.date);
  const img      = data.image || DEFAULT_IMG;
  const related  = getRelated(slug, data.tags, all);
  const firstTag = (data.tags || [])[0] || '身心科';

  const relatedHtml = related.map(r => `
        <a href="${r.slug}.html" style="text-decoration:none;color:inherit;">
          <p style="font-size:.82rem;color:#1A1710;font-family:'Noto Serif TC',serif;font-weight:700;line-height:1.4;margin-bottom:.25rem;">${r.data.title}</p>
          <p style="font-size:.72rem;color:#C4BFB5;">${formatDate(r.data.date)}</p>
        </a>`).join('');

  const tagsHtml = (data.tags || []).map(t =>
    `<span style="padding:.35rem .8rem;border:1px solid rgba(26,23,16,.12);font-size:.78rem;color:#7A7568;">${t}</span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.title} — 冬勝診所</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Noto+Sans+TC:wght@300;400;500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  *,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth}body{background:#FAF6EE;color:#1A1710;font-family:'Noto Sans TC','Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  .label-caps{font-family:'Inter',sans-serif;font-weight:500;letter-spacing:.25em;text-transform:uppercase;font-size:.7rem}
  .nav-link{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#1A1710;text-decoration:none;position:relative;transition:color .2s}
  .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:#D64000;transition:width .25s cubic-bezier(.4,0,.2,1)}
  .nav-link:hover{color:#D64000}.nav-link:hover::after{width:100%}
  .btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.875rem 2rem;background:#1A1710;color:#FAF6EE;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s,background .2s;box-shadow:0 4px 16px rgba(26,23,16,.18)}
  .btn-primary:hover{background:#D64000;transform:translateY(-2px);box-shadow:0 8px 24px rgba(214,64,0,.28)}
  .article-body{font-size:1rem;line-height:1.9;color:#1A1710}
  .article-body p{margin-bottom:1.4rem}
  .article-body h2{font-family:'Noto Serif TC',serif;font-weight:700;font-size:1.2rem;color:#1A1710;margin:2rem 0 .75rem;letter-spacing:-.01em}
  .article-body blockquote{border-left:3px solid #D64000;padding-left:1.25rem;margin:1.5rem 0;color:#7A7568;font-style:italic}
  #mobile-menu{display:none}#mobile-menu.open{display:flex}
</style>
</head>
<body>
<nav id="navbar" style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(250,246,238,.93);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:all .3s;">
  <div style="max-width:80rem;margin:0 auto;padding:0 2.5rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;height:4rem;">
      <a href="../" style="display:flex;align-items:center;gap:.75rem;text-decoration:none;">
        <div style="width:36px;height:36px;background:#D64000;display:flex;align-items:center;justify-content:center;"><span style="color:#FAF6EE;font-family:'Noto Serif TC',serif;font-weight:900;font-size:1rem;">冬</span></div>
        <div><div style="font-family:'Noto Serif TC',serif;font-weight:700;font-size:.95rem;color:#1A1710;line-height:1.2;">冬勝診所</div><div class="label-caps" style="color:#7A7568;font-size:.58rem;">Dong Sheng Clinic</div></div>
      </a>
      <div style="display:none;gap:2rem;align-items:center;" id="desktop-nav">
        <a href="../#about" class="nav-link">關於我們</a>
        <a href="../#doctor" class="nav-link">醫師介紹</a>
        <a href="../#services" class="nav-link">診療項目</a>
        <a href="../#pricing" class="nav-link">收費標準</a>
        <a href="../#schedule" class="nav-link">看診時間</a>
        <a href="/appointment.html" class="nav-link" style="color:#D64000;font-weight:700;">線上掛號</a>
        <a href="../#contact" class="nav-link">聯絡我們</a>
        <a href="../blog.html" class="nav-link" style="color:#D64000;">部落格</a>
        <a href="tel:07-727-8392" class="btn-primary" style="padding:.6rem 1.25rem;font-size:.72rem;">
          <span>07-727-8392</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.62 2 2 0 0 1 3.6 1.44h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.83-1.83a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
      </div>
      <button id="menu-btn" style="padding:.5rem;background:none;border:none;cursor:pointer;color:#1A1710;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
    </div>
  </div>
  <div id="mobile-menu" style="flex-direction:column;background:rgba(250,246,238,.98);border-top:1px solid rgba(26,23,16,.08);padding:1rem 1.5rem 1.5rem;">
    <a href="../#services" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">診療項目</a>
    <a href="../#about" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">關於我們</a>
    <a href="../#doctor" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">醫師介紹</a>
    <a href="../#pricing" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">收費標準</a>
    <a href="../blog.html" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);color:#D64000;">部落格</a>
    <a href="../#schedule" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">看診時間</a>
    <a href="../#contact" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">聯絡我們</a>
    <a href="/appointment.html" class="nav-link" style="padding:.75rem 0;display:block;color:#D64000;font-weight:700;">線上掛號</a>
    <a href="tel:07-727-8392" class="btn-primary" style="margin-top:1rem;justify-content:center;">07-727-8392</a>
  </div>
</nav>
<style>@media(min-width:768px){#desktop-nav{display:flex!important;}#menu-btn{display:none;}}</style>

<div style="padding-top:4rem;height:420px;position:relative;overflow:hidden;">
  <img src="/common/clinic_assets/blog_photo/${img}" alt="${data.title}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.7);">
  <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(26,23,16,.7) 0%,rgba(26,23,16,.2) 60%,transparent 100%);"></div>
  <div style="position:absolute;bottom:2.5rem;left:0;right:0;max-width:80rem;margin:0 auto;padding:0 2.5rem;">
    <nav style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;">
      <a href="../" style="color:rgba(250,246,238,.5);font-family:'Inter',sans-serif;font-size:.72rem;text-decoration:none;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='rgba(250,246,238,.5)'">首頁</a>
      <span style="color:rgba(250,246,238,.3);font-size:.7rem;">›</span>
      <a href="../blog.html" style="color:rgba(250,246,238,.5);font-family:'Inter',sans-serif;font-size:.72rem;text-decoration:none;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='rgba(250,246,238,.5)'">部落格</a>
      <span style="color:rgba(250,246,238,.3);font-size:.7rem;">›</span>
      <span style="color:rgba(250,246,238,.6);font-family:'Inter',sans-serif;font-size:.72rem;">${firstTag}</span>
    </nav>
    <h1 style="font-family:'Noto Serif TC',serif;font-weight:900;font-size:clamp(1.75rem,4vw,3rem);color:#FAF6EE;line-height:1.15;letter-spacing:-.02em;">${data.title}</h1>
    <p style="font-family:'Inter',sans-serif;font-size:.78rem;color:rgba(250,246,238,.55);margin-top:.75rem;">${dateStr} · 曾冬勝 醫師</p>
  </div>
</div>

<div style="max-width:80rem;margin:0 auto;padding:4rem 2.5rem;display:grid;gap:4rem;justify-content:center;" class="article-layout">
<style>.article-layout{grid-template-columns:min(680px,100%);}@media(min-width:1024px){.article-layout{grid-template-columns:min(680px,100%) 280px;}}</style>
  <article class="article-body">
    ${html}
    <div style="margin-top:3rem;border:1px solid rgba(26,23,16,.1);padding:2rem;background:#F5F0E6;">
      <p class="label-caps" style="color:#D64000;margin-bottom:1rem;">冬勝診所</p>
      <p style="font-size:.85rem;line-height:1.8;margin-bottom:.5rem;">📞 預約電話：<a href="tel:07-727-8392" style="color:#D64000;text-decoration:none;font-weight:600;">07-727-8392</a></p>
      <a href="https://maps.google.com/?q=冬勝診所" target="_blank" rel="noopener" style="font-size:.85rem;line-height:1.8;margin-bottom:1.25rem;text-decoration:none;display:block;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color=''">📍 地址：802 台灣高雄市苓雅區中正一路（大順路口）</a>
      <a href="../#contact" class="btn-primary" style="font-size:.75rem;padding:.7rem 1.5rem;">預約掛號</a>
    </div>
    <div style="margin-top:2rem;padding-top:2rem;border-top:1px solid rgba(26,23,16,.08);">
      <a href="../blog.html" style="display:inline-flex;align-items:center;gap:.5rem;color:#7A7568;font-family:'Inter',sans-serif;font-size:.8rem;text-decoration:none;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='#7A7568'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>返回部落格
      </a>
    </div>
  </article>
  <aside style="display:none;" class="sidebar">
    <div style="position:sticky;top:5.5rem;">
      <p class="label-caps" style="color:#D64000;margin-bottom:1rem;">相關標籤</p>
      <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2rem;">${tagsHtml}</div>
      <p class="label-caps" style="color:#D64000;margin-bottom:1rem;">其他文章</p>
      <div style="display:flex;flex-direction:column;gap:1rem;">${relatedHtml}</div>
    </div>
  </aside>
<style>@media(min-width:1024px){.sidebar{display:block!important;}}</style>
</div>

<footer style="background:#111009;padding:2rem 0;border-top:1px solid rgba(250,246,238,.06);">
  <div style="max-width:80rem;margin:0 auto;padding:0 2.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.75rem;">
    <p style="font-size:.72rem;color:rgba(250,246,238,.25);">© 2020–2026 冬勝診所 Dong Sheng Clinic</p>
    <a href="../blog.html" style="font-size:.72rem;color:rgba(250,246,238,.35);text-decoration:none;display:flex;align-items:center;gap:.4rem;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='rgba(250,246,238,.35)'">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>返回部落格
    </a>
  </div>
</footer>
<script>
  const navbar=document.getElementById('navbar');
  window.addEventListener('scroll',()=>{navbar.style.borderBottomColor=window.scrollY>60?'rgba(26,23,16,.1)':'transparent';navbar.style.boxShadow=window.scrollY>60?'0 4px 24px rgba(26,23,16,.08)':'none';});
  document.getElementById('menu-btn').addEventListener('click',()=>document.getElementById('mobile-menu').classList.toggle('open'));
</script>
</body>
</html>`;
}

// ── generate blog listing page ──────────────────────────────────────────────

function makeBlogListing(all) {
  const allTags = [...new Set(all.flatMap(p => p.data.tags || []))].sort();

  const filterBtns = ['全部', ...allTags].map((t, i) =>
    `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${i === 0 ? 'all' : t}">${t}</button>`
  ).join('');

  const cards = all.map(p => {
    const img     = p.data.image || DEFAULT_IMG;
    const dateStr = formatDate(p.data.date);
    const tag     = (p.data.tags || [])[0] || '身心科';
    const tagsAttr = (p.data.tags || []).join(',');
    return `
      <a href="blog/${p.slug}.html" class="post-card fade-up" data-tags="${tagsAttr}">
        <div style="height:220px;overflow:hidden;position:relative;">
          <img src="/common/clinic_assets/blog_photo/${img}" alt="${p.data.title}" class="card-img">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(26,23,16,.4),transparent);"></div>
          <span class="label-caps" style="position:absolute;top:1rem;left:1rem;color:#FAF6EE;background:rgba(214,64,0,.85);padding:.25rem .6rem;">${tag}</span>
        </div>
        <div style="padding:1.5rem;">
          <p style="font-family:'Noto Serif TC',serif;font-weight:700;font-size:1rem;color:#1A1710;line-height:1.4;margin-bottom:.75rem;">${p.data.title}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-family:'Inter',sans-serif;font-size:.72rem;color:#C4BFB5;">${dateStr}</span>
            <span class="label-caps" style="color:#D64000;font-size:.62rem;">閱讀更多 →</span>
          </div>
        </div>
      </a>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>部落格 — 冬勝診所</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&family=Noto+Sans+TC:wght@300;400;500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  *,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth}body{background:#FAF6EE;color:#1A1710;font-family:'Noto Sans TC','Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  .label-caps{font-family:'Inter',sans-serif;font-weight:500;letter-spacing:.25em;text-transform:uppercase;font-size:.7rem}
  .nav-link{font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#1A1710;text-decoration:none;position:relative;transition:color .2s}
  .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:#D64000;transition:width .25s cubic-bezier(.4,0,.2,1)}
  .nav-link:hover{color:#D64000}.nav-link:hover::after{width:100%}
  .btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.875rem 2rem;background:#1A1710;color:#FAF6EE;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s,background .2s;box-shadow:0 4px 16px rgba(26,23,16,.18)}
  .btn-primary:hover{background:#D64000;transform:translateY(-2px);box-shadow:0 8px 24px rgba(214,64,0,.28)}
  .post-card{background:#FAF6EE;overflow:hidden;cursor:pointer;transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s;box-shadow:0 2px 8px rgba(26,23,16,.06);text-decoration:none;display:block;color:inherit}
  .post-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(26,23,16,.12),0 4px 16px rgba(26,23,16,.08)}
  .post-card:hover .card-img{transform:scale(1.05)}
  .card-img{transition:transform .5s cubic-bezier(.4,0,.2,1);width:100%;height:100%;object-fit:cover}
  .filter-btn{font-family:'Inter',sans-serif;font-size:.72rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;padding:.45rem 1rem;border:1px solid rgba(26,23,16,.15);background:transparent;color:#7A7568;cursor:pointer;transition:all .2s}
  .filter-btn:hover,.filter-btn.active{background:#D64000;border-color:#D64000;color:#FAF6EE}
  .fade-up{opacity:0;transform:translateY(20px);transition:opacity .55s ease,transform .55s cubic-bezier(.4,0,.2,1)}
  .fade-up.visible{opacity:1;transform:translateY(0)}
  #mobile-menu{display:none}#mobile-menu.open{display:flex}
</style>
</head>
<body>
<nav id="navbar" style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(250,246,238,.93);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:all .3s;">
  <div style="max-width:80rem;margin:0 auto;padding:0 2.5rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;height:4rem;">
      <a href="/" style="display:flex;align-items:center;gap:.75rem;text-decoration:none;">
        <div style="width:36px;height:36px;background:#D64000;display:flex;align-items:center;justify-content:center;"><span style="color:#FAF6EE;font-family:'Noto Serif TC',serif;font-weight:900;font-size:1rem;">冬</span></div>
        <div><div style="font-family:'Noto Serif TC',serif;font-weight:700;font-size:.95rem;color:#1A1710;line-height:1.2;">冬勝診所</div><div class="label-caps" style="color:#7A7568;font-size:.58rem;">Dong Sheng Clinic</div></div>
      </a>
      <div style="display:none;gap:2rem;align-items:center;" id="desktop-nav">
        <a href="/#about" class="nav-link">關於我們</a>
        <a href="/#doctor" class="nav-link">醫師介紹</a>
        <a href="/#services" class="nav-link">診療項目</a>
        <a href="/#pricing" class="nav-link">收費標準</a>
        <a href="/#schedule" class="nav-link">看診時間</a>
        <a href="/appointment.html" class="nav-link" style="color:#D64000;font-weight:700;">線上掛號</a>
        <a href="/#contact" class="nav-link">聯絡我們</a>
        <a href="/blog.html" class="nav-link" style="color:#D64000;">部落格</a>
        <a href="tel:07-727-8392" class="btn-primary" style="padding:.6rem 1.25rem;font-size:.72rem;">
          <span>07-727-8392</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.62 2 2 0 0 1 3.6 1.44h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.83-1.83a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
      </div>
      <button id="menu-btn" style="padding:.5rem;background:none;border:none;cursor:pointer;color:#1A1710;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
    </div>
  </div>
  <div id="mobile-menu" style="flex-direction:column;background:rgba(250,246,238,.98);border-top:1px solid rgba(26,23,16,.08);padding:1rem 1.5rem 1.5rem;">
    <a href="/#services" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">診療項目</a>
    <a href="/#about" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">關於我們</a>
    <a href="/#doctor" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">醫師介紹</a>
    <a href="/#pricing" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">收費標準</a>
    <a href="/blog.html" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);color:#D64000;">部落格</a>
    <a href="/#schedule" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">看診時間</a>
    <a href="/#contact" class="nav-link" style="padding:.75rem 0;display:block;border-bottom:1px solid rgba(26,23,16,.06);">聯絡我們</a>
    <a href="/appointment.html" class="nav-link" style="padding:.75rem 0;display:block;color:#D64000;font-weight:700;">線上掛號</a>
    <a href="tel:07-727-8392" class="btn-primary" style="margin-top:1rem;justify-content:center;">07-727-8392</a>
  </div>
</nav>
<style>@media(min-width:768px){#desktop-nav{display:flex!important;}#menu-btn{display:none;}}</style>

<div style="padding-top:4rem;padding-bottom:3rem;border-bottom:1px solid rgba(26,23,16,.08);background:#FAF6EE;">
  <div style="max-width:80rem;margin:0 auto;padding:3rem 2.5rem 0;">
    <p class="label-caps" style="color:#D64000;margin-bottom:1rem;">部落格</p>
    <h1 style="font-family:'Noto Serif TC',serif;font-weight:900;font-size:clamp(2.5rem,6vw,4.5rem);color:#1A1710;line-height:1.05;letter-spacing:-.02em;">醫師的話</h1>
    <p style="font-size:.9rem;color:#7A7568;margin-top:1rem;max-width:40ch;line-height:1.7;">由曾冬勝醫師撰寫的衛教文章，提供身心健康知識與診療經驗分享。</p>
  </div>
</div>

<div style="max-width:80rem;margin:0 auto;padding:2.5rem 2.5rem 1.5rem;">
  <div style="display:flex;flex-wrap:wrap;gap:.5rem;">${filterBtns}</div>
</div>

<div style="max-width:80rem;margin:0 auto;padding:0 2.5rem 6rem;">
  <div id="posts-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2rem;">
    ${cards}
  </div>
</div>

<footer style="background:#111009;padding:2rem 0;border-top:1px solid rgba(250,246,238,.06);">
  <div style="max-width:80rem;margin:0 auto;padding:0 2.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.75rem;">
    <p style="font-size:.72rem;color:rgba(250,246,238,.25);">© 2020–2026 冬勝診所 Dong Sheng Clinic</p>
    <a href="/" style="font-size:.72rem;color:rgba(250,246,238,.35);text-decoration:none;" onmouseover="this.style.color='#D64000'" onmouseout="this.style.color='rgba(250,246,238,.35)'">← 回首頁</a>
  </div>
</footer>
<script>
  const navbar=document.getElementById('navbar');
  window.addEventListener('scroll',()=>{navbar.style.borderBottomColor=window.scrollY>60?'rgba(26,23,16,.1)':'transparent';navbar.style.boxShadow=window.scrollY>60?'0 4px 24px rgba(26,23,16,.08)':'none';});
  document.getElementById('menu-btn').addEventListener('click',()=>document.getElementById('mobile-menu').classList.toggle('open'));

  // Filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.post-card').forEach(card => {
        const tags = card.dataset.tags || '';
        card.style.display = (filter === 'all' || tags.split(',').includes(filter)) ? 'block' : 'none';
      });
    });
  });

  // Fade-up
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
</script>
</body>
</html>`;
}

// ── write output ────────────────────────────────────────────────────────────

for (const post of posts) {
  const html = makePost(post, posts);
  fs.writeFileSync(path.join(BLOG_OUT, `${post.slug}.html`), html, 'utf8');
  console.log(`✓ blog/${post.slug}.html`);
}

fs.writeFileSync('src/blog.html', makeBlogListing(posts), 'utf8');
console.log('✓ blog.html');
console.log(`\nDone — ${posts.length} posts generated.`);
