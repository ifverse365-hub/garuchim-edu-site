/* ================================================================
   가르침에듀 코딩학원 — 공통 스크립트
   - 각 페이지의 [data-header] 와 [data-footer] 엘리먼트에
     상단바와 푸터를 클라이언트 렌더링으로 주입한다.
   - 한 번 로드되면 모든 페이지에서 동일하게 동작한다.
   ================================================================ */

(function () {
  const NAV_ITEMS = [
    { href: 'about.html', label: '철학' },
    { href: 'roadmap.html', label: '로드맵' },
    { href: 'levels.html', label: '레벨별 과정' },
    { href: 'instructor.html', label: '대표 강사' },
    { href: 'schedule.html', label: '수업 안내' },
    // { href: 'faq.html',         label: 'FAQ' },  // 임시 숨김
    // { href: 'contact.html',     label: '레벨 테스트 신청', cta: true },  // 임시 숨김
  ];

  // 현재 파일명 (Vercel의 /levels → levels.html 도 고려)
  function currentFile() {
    const path = window.location.pathname;
    let last = path.split('/').pop() || 'index.html';
    if (last === '' || last === '/') last = 'index.html';
    if (!last.includes('.')) last += '.html';
    return last;
  }

  function renderHeader(el) {
    const cur = currentFile();
    const navHTML = NAV_ITEMS.map(item => {
      const isActive = item.href === cur;
      const cls = [
        item.cta ? 'nav-cta' : '',
        isActive ? 'active' : '',
      ].filter(Boolean).join(' ');
      return `<a href="${item.href}"${cls ? ` class="${cls}"` : ''}>${item.label}</a>`;
    }).join('');

    el.outerHTML = `
      <header class="topbar">
        <div class="topbar-inner">
          <a href="index.html" class="brand">
            <span class="brand-mark">가르침에듀</span>
            <span class="brand-sub">Coding Academy</span>
          </a>
          <button class="mobile-toggle" aria-label="메뉴 열기">☰</button>
          <nav class="nav">${navHTML}</nav>
        </div>
      </header>
    `;
  }

  function renderFooter(el) {
    el.outerHTML = `
      <footer class="footer">
        <div class="footer-inner">
          <div>
            <div class="brand">
              <span class="brand-mark">가르침에듀</span>
              <span class="brand-sub">Coding Academy</span>
            </div>
            <p style="margin-top: 16px; max-width: 420px;">
              초1부터 고2까지, 자격증과 대회로 증명하는 코딩 교육.<br>
              2022 개정교육과정과 2028 대입 개편에 정면으로 대응합니다.
            </p>
          </div>
          <div>
            <h4>둘러보기</h4>
            <ul>
              <li><a href="about.html">교육 철학</a></li>
              <li><a href="roadmap.html">로드맵</a></li>
              <li><a href="levels.html">레벨별 과정</a></li>
              <li><a href="instructor.html">대표 강사</a></li>
            </ul>
          </div>
          <div>
            <h4>자료</h4>
            <ul>
              <li><a href="schedule.html">수업 안내</a></li>
              <li><a href="faq.html">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>상담 신청</h4>
            <ul>
              <li><a href="contact.html">레벨 테스트</a></li>
              <li><a href="contact.html">학부모 상담</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>© 가르침에듀 코딩학원</div>
          <div>원장 박수연 · 문의 064-900-9982</div>
        </div>
      </footer>
    `;
  }

  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  function initRevealOnScroll() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  function boot() {
    const header = document.querySelector('[data-header]');
    const footer = document.querySelector('[data-footer]');
    if (header) renderHeader(header);
    if (footer) renderFooter(footer);
    initMobileMenu();
    initRevealOnScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
