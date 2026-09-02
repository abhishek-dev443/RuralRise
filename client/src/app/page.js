'use client';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, color: 'var(--primary)' }}>RuralRise</h2>
          <nav style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontWeight: 500 }}>Discover</a>
            <a href="#" style={{ fontWeight: 500 }}>Storefronts</a>
            <a href="#" style={{ fontWeight: 500 }}>About</a>
          </nav>
          <div>
            <button className="btn btn-secondary" style={{ marginRight: '10px' }}>Login</button>
            <button className="btn btn-primary">Join Now</button>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <div className={`animate-fade-in-up ${styles.heroContent}`}>
            <h1 className="h1-display">
              Empowering <span className="text-gradient">Rural Entrepreneurs</span><br />
              to Reach the World.
            </h1>
            <p className="text-body" style={{ marginTop: '20px', marginBottom: '30px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Discover authentic, high-quality products directly from verified entrepreneurs in Maharashtra.
              Support local communities and explore unique crafts, foods, and textiles.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button className="btn btn-primary">Explore Products</button>
              <button className="btn btn-secondary">Open Your Store</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
