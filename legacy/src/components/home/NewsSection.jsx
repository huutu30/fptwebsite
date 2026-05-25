import React from 'react';
import { Link } from 'react-router-dom';
import { NEWS_DATA } from '../../data/newsData';
import styles from './NewsSection.module.css';

export default function NewsSection() {
  return (
    <section className={styles.newsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tin Tức & Khuyến Mãi</h2>
          <Link to="/tin-tuc" className={styles.viewAllBtn}>Xem tất cả</Link>
        </div>
        
        <div className={styles.newsGrid}>
          {NEWS_DATA.map((news) => (
            <Link to={`/tin-tuc/${news.slug}`} key={news.id} className={styles.newsCard}>
              <div className={styles.newsImageWrapper}>
                <img src={news.image} alt={news.title} className={styles.newsImage} loading="lazy" width="400" height="225" />
              </div>
              <div className={styles.newsContent}>
                <span className={styles.newsDate}>{news.date}</span>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsDesc}>{news.desc}</p>
                <span className={styles.readMore}>Xem chi tiết &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
