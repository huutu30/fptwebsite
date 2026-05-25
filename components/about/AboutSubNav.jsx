"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    icon: 'https://fpt.vn/storage/upload/images/menus/nav-icons/about/introduction.png',
    label: 'GIỚI THIỆU CHUNG',
    path: '/gioi-thieu',
  },
  {
    icon: 'https://fpt.vn/storage/upload/images/menus/nav-icons/about/members.png',
    label: 'LIÊN KẾT - THÀNH VIÊN',
    path: '/lien-ket-thanh-vien',
  },
  {
    icon: 'https://fpt.vn/storage/upload/images/menus/nav-icons/about/partners.png',
    label: 'KHÁCH HÀNG - ĐỐI TÁC',
    path: '/khach-hang-doi-tac',
  },
  {
    icon: 'https://fpt.vn/storage/upload/images/menus/nav-icons/about/fpt.png',
    label: 'TẬP ĐOÀN FPT',
    path: '/tap-doan-fpt',
  },
];

export default function AboutSubNav() {
  const pathname = usePathname();

  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      borderBottom: '3px solid #f57020',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '18px 24px',
                textDecoration: 'none',
                color: isActive ? '#f57020' : '#555',
                fontWeight: isActive ? '700' : '600',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: isActive ? '3px solid #f57020' : '3px solid transparent',
                marginBottom: '-3px',
                transition: 'all 0.2s ease',
                minWidth: '140px',
                textAlign: 'center',
                backgroundColor: isActive ? '#fff' : 'transparent',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#f57020' : '#888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease',
                padding: '10px',
              }}>
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{
                    width: '26px',
                    height: '26px',
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
