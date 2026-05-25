import React from "react";
import { Link } from "react-router-dom";
import { CATEGORY_DATA } from "../../data/productData";
import styles from "./ProductCategorySection.module.css";

export default function ProductCategorySection() {
  return (
    <section className={styles.section} aria-label="Danh mục sản phẩm đa dạng">
      <div className={styles.header}>
        <h2 className={styles.title}>Danh mục sản phẩm đa dạng</h2>
      </div>

      <div className={styles.grid}>
        {CATEGORY_DATA.map((cat) => (
          <Link
            key={cat.id}
            to={cat.link}
            className={styles.card}
            style={{ "--cat-gradient": cat.gradient, "--cat-color": cat.color }}
            aria-label={`${cat.type} ${cat.name} - Khám phá ngay`}
          >
            {/* Background gradient (fallback in case image loads slow) */}
            <div className={styles.cardBg} />

            {/* Image (Full cover) */}
            <div className={styles.cardImgWrap}>
              <img
                src={cat.image}
                alt={`${cat.type} ${cat.name} FPT`}
                className={styles.cardImg}
                loading="lazy"
                width="300"
                height="200"
              />
            </div>

          </Link>
        ))}
      </div>
    </section>
  );
}
