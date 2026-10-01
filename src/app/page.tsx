"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    // This script replaces the old inline script we had for the overlay logic.
    // We attach it after component mounts.
    const overlay = document.getElementById('ps-title-overlay');
    if (!overlay) return;

    function positionOverlay() {
      const homeTop = document.querySelector('.home-top');
      const homeContainer = document.querySelector('.home-container');
      const target = homeTop || homeContainer;

      if (target) {
        const rect = target.getBoundingClientRect();
        const homeBottom = document.querySelector('.home-bottom');
        if (homeBottom) {
          const lineRect = homeBottom.getBoundingClientRect();
          const overlayHeight = overlay.offsetHeight;
          overlay.style.top = (lineRect.top - overlayHeight - 25) + 'px';
        } else {
          overlay.style.top = rect.top + 'px';
        }
        overlay.style.left = rect.left + 'px';
        overlay.style.opacity = '1';
      } else {
        overlay.style.opacity = '0';
      }
    }

    let tries = 0;
    function tryPosition() {
      positionOverlay();
      tries++;
      if ((!document.querySelector('.home-top') || overlay.style.opacity === '0') && tries < 100) {
        requestAnimationFrame(tryPosition);
      }
    }

    tryPosition();
    window.addEventListener('resize', positionOverlay);

    const observer = new MutationObserver(() => {
      positionOverlay();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let hasNavigated = false;
    function checkRoute() {
      if (!hasNavigated) return;
      const path = window.location.pathname + window.location.hash;
      const isHomepage = path.indexOf('homepage') !== -1;
      overlay.style.display = isHomepage ? 'block' : 'none';
      if (isHomepage) positionOverlay();
    }

    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    history.pushState = function() { origPush.apply(this, arguments as any); hasNavigated = true; checkRoute(); };
    history.replaceState = function() { origReplace.apply(this, arguments as any); hasNavigated = true; checkRoute(); };
    window.addEventListener('popstate', () => { hasNavigated = true; checkRoute(); });

    return () => {
      window.removeEventListener('resize', positionOverlay);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="ps-title-overlay" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 10, lineHeight: 1, display: 'block', opacity: 0 }}>
        <div id="ps-line1" style={{ fontSize: 'clamp(36px,6vw,95px)', fontWeight: 600, letterSpacing: '-2px', color: '#F0E8D0', fontFamily: "'Georgia','Times New Roman',serif", fontStyle: 'italic', lineHeight: 1 }}>PROMPTEDSITE</div>
        <div id="ps-line2" style={{ fontSize: 'clamp(48px,8vw,120px)', fontWeight: 900, letterSpacing: '3px', color: '#F5C518', fontFamily: "'Mona Sans','Arial Black',sans-serif", fontStyle: 'normal', lineHeight: 1, marginTop: '4px' }}>GAME TIME</div>
      </div>

      <aside id="preloader">
        <div className="preloader-header">
          <div className="logo">
            <h1 style={{ fontSize: '24px', margin: 0, color: 'white', fontWeight: 'bold', position: 'absolute', zIndex: 1000, left: '30px', top: '30px' }}>PROMPTEDSITE</h1>
          </div>
        </div>
        <div className="tennis-racket">
          <div className="ball-wrapper">
            <svg width="31" height="31" fill="none" stroke="none" viewBox="0 0 30 30" className="ball">
              <path d="M4.399 4.398a14.974 14.974 0 0 0-4.395 10.98l6.118-6.12c4.05-4.02 10.593-4.013 14.633.025 4.038 4.04 4.048 10.583.023 14.632h.003l-6.121 6.119a14.983 14.983 0 0 0 10.98-4.395c5.864-5.864 5.864-15.377 0-21.24-5.867-5.865-15.377-5.865-21.241 0Z"/>
              <path d="M18.99 22.11a7.943 7.943 0 0 0 2.324-5.646 7.943 7.943 0 0 0-2.342-5.641 7.942 7.942 0 0 0-5.641-2.343 7.936 7.936 0 0 0-5.647 2.323l-.085.085-7.247 7.245a14.802 14.802 0 0 0 4.01 7.298 14.82 14.82 0 0 0 7.297 4.01l7.252-7.25.078-.08Z"/>
            </svg>
          </div>
          <div className="paddle"></div>
        </div>
        <p className="preloader-counter"></p>
        <figure className="preloader-background"></figure>
      </aside>
      
      <div id="app"></div>

      <Script src="/init-data.js" strategy="beforeInteractive" />
      <Script src="/vendor.6be70aa8526f9beb.js" type="module" strategy="lazyOnload" />
      <Script src="/main.47e034a4526f9beb.js" type="module" strategy="lazyOnload" />
      <Script src="/webgl.a9816380526f9beb.js" type="module" strategy="lazyOnload" />
    </>
  );
}
