'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <span aria-label="Spirit Signal pentagram" role="img">⛧</span>
        <span>Spirit Signal</span>
      </Link>
      <nav className={`${styles.links} ${open ? styles.open : ''}`} aria-label="Main navigation">
        <a href="#how-it-works" onClick={() => setOpen(false)}>How It Works</a>
        <a href="#personas" onClick={() => setOpen(false)}>The Spirits</a>
        <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
        <Link href="/login" onClick={() => setOpen(false)}>Sign In</Link>
        <Link href="/register" className="btn-primary" style={{ padding: '.5rem 1.25rem', fontSize: 'var(--text-xs)' }} onClick={() => setOpen(false)}>Enter the Board</Link>
      </nav>
      <button
        className={styles.hamburger}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
