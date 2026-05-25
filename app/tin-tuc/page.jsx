import React from 'react';
import Link from 'next/link';
import { NEWS_DATA } from '@/data/newsData';
import styles from './NewsPage.module.css';

export const metadata = {
  title: "Tin tức Công nghệ, Giải trí, Thể thao | FPT Telecom",
  description: "Cập nhật tin tức mới nhất về công nghệ, giải trí, thể thao, game và khuyến mãi từ FPT Telecom.",
  alternates: { canonical: "https://fptlapmang.id.vn/tin-tuc" },
  openGraph: {
    title: "Tin tức Công nghệ, Giải trí, Thể thao | FPT Telecom",
    description: "Cập nhật tin tức mới nhất về công nghệ, giải trí, thể thao, game và khuyến mãi từ FPT Telecom.",
    url: "https://fptlapmang.id.vn/tin-tuc",
    siteName: "FPT Telecom", locale: "vi_VN", type: "website",
    images: [{ url: "https://fptlapmang.id.vn/images/69e041bf8f173_1_1920_953e52bd.webp" }],
  },
};

export default function NewsPage() {
  // Giả định tin đầu tiên là Tin Nổi Bật (Featured)
  const featuredNews = NEWS_DATA[0];
  // Các tin còn lại
  const regularNews = NEWS_DATA.slice(1);

  const categories = [
    "Khuyến mại",
    "Viễn thông công nghệ",
    "Giải trí",
    "Thể thao",
    "Game",
    "Đời sống",
    "Tin FPT"
  ];

  return (
    <div className={styles.newsPage}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/">Trang chủ</Link> / <span>Tin tức</span>
        </div>

        <div className={styles.layoutGrid}>
          {/* CỘT TRÁI: MAIN CONTENT */}
          <main className={styles.mainContent}>
            
            {/* Tin nổi bật (To nhất) */}
            {featuredNews && (
              <Link href={`/tin-tuc/${featuredNews.slug}`} className={styles.featuredNews}>
                <div className={styles.featuredImageWrapper}>
                  <img src={featuredNews.image} alt={featuredNews.title} className={styles.featuredImage} />
                </div>
                <div className={styles.featuredInfo}>
                  <span className={styles.newsCategory}>{featuredNews.category || 'Tin nổi bật'}</span>
                  <h1 className={styles.featuredTitle}>{featuredNews.title}</h1>
                  <span className={styles.newsDate}>{featuredNews.date}</span>
                  <p className={styles.featuredDesc}>{featuredNews.desc}</p>
                </div>
              </Link>
            )}

            {/* Danh sách tin tức */}
            <h2 className={styles.sectionTitle}>Tin mới cập nhật</h2>
            <div className={styles.newsList}>
              {regularNews.map(news => (
                <Link href={`/tin-tuc/${news.slug}`} key={news.id} className={styles.newsItem}>
                  <div className={styles.itemImageWrapper}>
                    <img src={news.image} alt={news.title} className={styles.itemImage} />
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.newsCategory}>{news.category || 'Tin tức'}</span>
                    <h3 className={styles.itemTitle}>{news.title}</h3>
                    <span className={styles.newsDate}>{news.date}</span>
                    <p className={styles.itemDesc}>{news.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

          </main>

          {/* CỘT PHẢI: SIDEBAR */}
          <aside className={styles.sidebar}>
            
            {/* Danh mục */}
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Chuyên mục</h3>
              <ul className={styles.categoryList}>
                {categories.map((cat, idx) => (
                  <li key={idx}><Link href="#">{cat}</Link></li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
