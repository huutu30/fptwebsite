import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NEWS_DATA } from '@/data/newsData';
import { Clock } from 'lucide-react';
import styles from './ArticlePage.module.css';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = NEWS_DATA.find((news) => news.slug === slug);
  if (!article) {
    return {
      title: "Không tìm thấy bài viết | FPT Telecom",
    };
  }
  return {
    title: `${article.title} | FPT Telecom`,
    description: article.desc,
    alternates: { canonical: `https://fptlapmang.id.vn/tin-tuc/${slug}` },
    openGraph: {
      title: article.title,
      description: article.desc,
      images: [{ url: article.image }],
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = NEWS_DATA.find((news) => news.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.articlePage}>
      <div className="container">
        
        {/* BREADCRUMB */}
        <div className={styles.breadcrumb}>
          <Link href="/">Trang chủ</Link> / <Link href="/tin-tuc">Tin tức</Link> / <span>{article.category || "Bài viết"}</span>
        </div>

        <div className={styles.layoutGrid}>
          
          {/* CỘT TRÁI: NỘI DUNG BÀI BÁO */}
          <main className={styles.mainContent}>
            <header>
              <span className={styles.articleCategory}>{article.category || "Tin tức"}</span>
              <h1 className={styles.articleTitle}>{article.title}</h1>
              <div className={styles.articleMeta}>
                <Clock size={16} /> <span>{article.date}</span>
              </div>
            </header>

            <article>
              {/* Sapo (Mở bài in đậm) */}
              <p className={styles.sapo}>{article.desc}</p>

              {/* Render nội dung chi tiết dựa trên mảng content */}
              {article.content && article.content.length > 0 ? (
                article.content.map((block, index) => {
                  switch (block.type) {
                    case 'paragraph':
                      return <p key={index} className={styles.paragraph}>{block.text}</p>;
                    case 'heading':
                      return <h2 key={index} className={styles.heading}>{block.text}</h2>;
                    case 'image':
                      return (
                        <figure key={index} className={styles.figure}>
                          <img src={block.src} alt={block.caption || 'FPT News'} className={styles.articleImage} />
                          {block.caption && <figcaption className={styles.figcaption}>{block.caption}</figcaption>}
                        </figure>
                      );
                    default:
                      return null;
                  }
                })
              ) : (
                <p className={styles.paragraph}>Nội dung bài viết đang được cập nhật...</p>
              )}
            </article>
          </main>
        </div>

        {/* BÀI VIẾT LIÊN QUAN (NẰM DƯỚI CÙNG) */}
        <section className={styles.relatedBottomSection}>
          <h2 className={styles.relatedBottomTitle}>Bài viết liên quan</h2>
          <div className={styles.relatedBottomGrid}>
            {NEWS_DATA.filter(n => n.id !== article.id).slice(0, 4).map(n => (
              <Link href={`/tin-tuc/${n.slug}`} key={n.id} className={styles.relatedCard}>
                <div className={styles.relatedImageWrapper}>
                  <img src={n.image} alt={n.title} className={styles.relatedImage} loading="lazy" />
                </div>
                <div className={styles.relatedContent}>
                  <span className={styles.relatedDate}>{n.date}</span>
                  <h3 className={styles.relatedTitle}>{n.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return NEWS_DATA.map((article) => ({
    slug: article.slug,
  }));
}
