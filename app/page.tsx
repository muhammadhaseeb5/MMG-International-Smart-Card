'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowDownLeft, ArrowUpRight, Globe2, Mail, MapPin, MessageCircle, Pause, Phone, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const website = 'https://mmginternational.store/';
const maps = 'https://maps.app.goo.gl/1RrrCTT1iW289HPz9?g_st=awb';
const review = 'https://search.google.com/local/writereview?placeid=ChIJj_yZPABDIjkRLLZEkb9xgkA';

export default function Home() {
  const cardRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const motionEnabled = !paused && !reducedMotion;

  function resetTilt() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
    card.style.setProperty('--light-x', '50%');
    card.style.setProperty('--light-y', '20%');
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  }, []);

  useEffect(() => { if (!motionEnabled) resetTilt(); }, [motionEnabled]);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (!motionEnabled || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      card.style.setProperty('--rotate-x', ((0.5 - y) * 5).toFixed(2) + 'deg');
      card.style.setProperty('--rotate-y', ((x - 0.5) * 7).toFixed(2) + 'deg');
      card.style.setProperty('--light-x', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--light-y', (y * 100).toFixed(1) + '%');
      frameRef.current = null;
    });
  }

  return (
    <main className="card-page" data-motion={motionEnabled ? 'on' : 'off'}>
      <div className="ambient ambient-red" aria-hidden="true" />
      <div className="ambient ambient-silver" aria-hidden="true" />
      <header className="page-header">
        <a href={website} target="_blank" rel="noopener noreferrer" className="wordmark" aria-label="MMG International website">MMG<span>INTERNATIONAL</span></a>
        <span className="edition"><span /> DIGITAL BUSINESS CARD</span>
      </header>
      <section className="card-stage" aria-label="MMG International business card">
        <div className="card-intro"><span className="line" /><span>LET’S CONNECT</span><span className="line" /></div>
        <div className="card-entrance" onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
          <article className="business-card" ref={cardRef}>
            <div className="card-grain" aria-hidden="true" />
            <div className="card-spotlight" aria-hidden="true" />
            <div className="card-sheen" aria-hidden="true" />
            <div className="card-main">
              <div className="identity">
                <div className="logo-frame"><img src="/mmg-logo.jpeg" alt="MMG International official logo" width="1254" height="1254" fetchPriority="high" /></div>
                <div className="identity-copy"><p className="company-initials">MMG</p><h1>International<span>.</span></h1><p className="home-location"><span /> Faisalabad, Pakistan</p></div>
                <div className="identity-rule" aria-hidden="true"><span /><ArrowDownLeft size={18} /></div>
                <a className="direct-number" href="tel:+923219658666"><span>CALL US</span><strong>+92 321 9658666</strong><Phone size={19} strokeWidth={1.5} /></a>
              </div>
              <div className="connections">
                <div className="contact-heading"><span>CONTACT & CONNECT</span><span className="contact-index">01 — 04</span></div>
                <a className="contact-row" href={website} target="_blank" rel="noopener noreferrer"><span className="contact-icon"><Globe2 /></span><span className="contact-copy"><span>WEBSITE</span><strong>mmginternational.store</strong></span><ArrowUpRight className="row-arrow" /></a>
                <a className="contact-row" href="mailto:mmgsinternational@gmail.com"><span className="contact-icon"><Mail /></span><span className="contact-copy"><span>EMAIL</span><strong>mmgsinternational@gmail.com</strong></span><ArrowUpRight className="row-arrow" /></a>
                <a className="contact-row location-row" href={maps} target="_blank" rel="noopener noreferrer"><span className="contact-icon"><MapPin /></span><span className="contact-copy"><span>LOCATION</span><strong>Masha Allah Plaza, Habib Center Street</strong><small>Factory Area, Faisalabad, Pakistan</small></span><ArrowUpRight className="row-arrow" /></a>
                <a className="whatsapp-action" href="https://wa.me/923219658666" target="_blank" rel="noopener noreferrer"><span className="whatsapp-icon"><MessageCircle size={24} /></span><span><strong>Connect on WhatsApp</strong><small>+92 321 9658666</small></span><ArrowUpRight size={22} /></a>
              </div>
            </div>
            <footer className="card-footer">
              <div className="review-copy"><span className="google-mark" aria-label="Google">G</span><span><strong>Let’s hear from you.</strong><small>Share your experience on Google.</small></span></div>
              <a className="review-link" href={review} target="_blank" rel="noopener noreferrer"><Star size={17} /> Review <ArrowUpRight size={17} /></a>
            </footer>
          </article>
        </div>
        <div className="below-card"><span className="below-line" /><span>MMG INTERNATIONAL</span><span className="below-line" /></div>
        {!reducedMotion && <Button variant="ghost" className="motion-button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Resume card animation' : 'Pause card animation'}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? 'Resume motion' : 'Pause motion'}</Button>}
      </section>
      <footer className="page-footer"><span>© MMG International</span><span>FAISALABAD <span className="footer-dot">·</span> PAKISTAN</span></footer>
    </main>
  );
}

