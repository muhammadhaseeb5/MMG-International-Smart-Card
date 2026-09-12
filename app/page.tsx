'use client';

/* oxlint-disable next/no-img-element -- This page also runs as a static Vite app on Netlify without the Next image runtime. */

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowUpRight, Mail, MapPin, Pause, Phone, Play, Radio, Star, Users } from 'lucide-react';
import { WhatsAppIcon, FacebookIcon, InstagramIcon, ShopCartIcon } from '@/components/brand-icons';

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
      <header className="page-header">
        <a href={website} target="_blank" rel="noopener noreferrer" className="wordmark" aria-label="MMG International website">MMG<span>INTERNATIONAL</span></a>
        <span className="edition">THE DIGITAL CARD</span>
      </header>
      <section className="card-stage" aria-label="MMG International business card">
        <div className="card-entrance" onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
          <article className="business-card" ref={cardRef}>
            <div className="card-main">
              <div className="identity">
                <span className="identity-eyebrow">A CONNECTION THAT MATTERS</span>
                <div className="logo-frame"><img src="/mmg-logo.jpeg" alt="MMG International official logo" width="1254" height="1254" fetchPriority="high" /></div>
                <div className="identity-copy">
                  <h1>A R Pasha</h1>
                  <p className="personal-number">+923009658666</p>
                  <div className="personal-actions">
                    <a href="https://wa.me/923009658666" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp A R Pasha at +923009658666"><WhatsAppIcon />WhatsApp</a>
                    <a href="tel:+923009658666" aria-label="Call A R Pasha at +923009658666"><Phone />Call</a>
                  </div>
                </div>
                <div className="identity-rule" aria-hidden="true"><span />✦<span /></div>
                <p className="identity-note">One card.<br /><em>Every connection.</em></p>
                <a className="identity-website" href="https://mmginternational.store/catalogue/" target="_blank" rel="noopener noreferrer" aria-label="View WareHouse Catalogue">
                  <ShopCartIcon />
                  <span><strong>WareHouse Catalogue</strong></span>
                  <ArrowUpRight className="website-arrow" aria-hidden="true" />
                </a>
              </div>
              <div className="connections">
                <div className="section-heading"><span>LET’S CONNECT</span><span className="heading-line" /></div>
                <div className="quick-actions">
                  <a className="action-tile call-tile" href="tel:+923219658666"><span className="tile-icon"><Phone /></span><span><strong>Call us</strong><small>+92 321 9658666</small></span><ArrowUpRight className="tile-arrow" /></a>
                  <a className="action-tile whatsapp-tile" href="https://wa.me/923219658666" target="_blank" rel="noopener noreferrer"><span className="tile-icon"><WhatsAppIcon /></span><span><strong>WhatsApp</strong><small>Start a conversation</small></span><ArrowUpRight className="tile-arrow" /></a>
                  <a className="action-tile secondary-tile" href="mailto:mmginternationalofficial@gmail.com"><span className="tile-icon"><Mail /></span><span><strong>Email</strong><small>Get in touch</small></span><ArrowUpRight className="tile-arrow" /></a>
                  <a className="action-tile secondary-tile" href={maps} target="_blank" rel="noopener noreferrer"><span className="tile-icon"><MapPin /></span><span><strong>Location</strong><small>Find our office</small></span><ArrowUpRight className="tile-arrow" /></a>
                </div>
                <div className="social-section">
                  <div className="section-heading"><span>OUR SOCIAL CIRCLE</span><span className="heading-line" /></div>
                  <div className="social-grid">
                    <a className="social-link facebook-link" href="https://www.facebook.com/share/19ZAD6AiEE/" target="_blank" rel="noopener noreferrer"><span className="brand-icon"><FacebookIcon /></span><span><strong>Facebook</strong><small>Stay connected</small></span><ArrowUpRight /></a>
                    <a className="social-link instagram-link" href="https://www.instagram.com/mmginternational.official?stkn=bTBobTV0Zm5oamt4" target="_blank" rel="noopener noreferrer"><span className="brand-icon"><InstagramIcon /></span><span><strong>Instagram</strong><small>Explore our world</small></span><ArrowUpRight /></a>
                    <a className="social-link community-link" href="https://chat.whatsapp.com/JTaBinqhMDaAXigFhxgX3n" target="_blank" rel="noopener noreferrer"><span className="brand-icon"><WhatsAppIcon /><Users className="icon-badge" /></span><span><strong>Community</strong><small>Join on WhatsApp</small></span><ArrowUpRight /></a>
                    <a className="social-link channel-link" href="https://whatsapp.com/channel/0029VakKpDZ4inoiSbt2M01q" target="_blank" rel="noopener noreferrer"><span className="brand-icon"><WhatsAppIcon /><Radio className="icon-badge" /></span><span><strong>Channel</strong><small>Follow our updates</small></span><ArrowUpRight /></a>
                  </div>
                </div>
                <a className="review-link" href={review} target="_blank" rel="noopener noreferrer"><span className="review-star"><Star /></span><span><strong>Your experience matters.</strong><small>Leave us a review on Google</small></span><ArrowUpRight /></a>
              </div>
            </div>
            <footer className="card-footer">
              <a href={maps} target="_blank" rel="noopener noreferrer"><MapPin /><span>Masha Allah Plaza, Habib Center Street<br /><strong>Factory Area, Faisalabad, Pakistan</strong></span></a>
              <a href="mailto:mmginternationalofficial@gmail.com"><Mail /><span>mmginternationalofficial@gmail.com</span></a>
            </footer>
          </article>
        </div>
        <div className="below-card"><span>MMG INTERNATIONAL</span><span className="below-line" /><span>ALWAYS WITHIN REACH</span></div>
        {!reducedMotion && <button type="button" className="motion-button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? 'Resume motion' : 'Pause motion'}</button>}
      </section>
      <footer className="page-footer"><span>© MMG International</span><span>Faisalabad, Pakistan</span></footer>
    </main>
  );
}
