"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { books, stageInfo, type Stage } from "./lib/books";

export default function Home() {
  const [filter, setFilter] = useState<Stage | "all">("all");
  const visibleBooks = useMemo(() => filter === "all" ? books : books.filter((book) => book.stage === filter), [filter]);

  return <main className="library-home">
    <header className="topbar"><Link className="brand" href="/"><span>☁</span> Little Weather Club</Link><div className="library-count">USBORNE BEGINNERS · 35 BOOKS</div><div className="streak">📚 <b>Pick a book</b></div></header>
    <section className="library-hero section-wrap"><div><p className="eyebrow">THE BEGINNERS LIBRARY</p><h1>Choose a book.<br /><i>Grow a little.</i></h1><p>从简单到复杂，找到今天最适合孩子的一本。每本书都有清晰的阅读阶段、学习重点和独立学习页面。</p><div className="hero-stats"><span><b>35</b> 本书</span><span><b>3</b> 个阅读阶段</span><span><b>1</b> 个小目标</span></div></div><div className="library-orbit"><span>☀️</span><span>🐋</span><span>🚀</span><strong>READ<br />&amp; PLAY</strong></div></section>
    <section className="section-wrap library-section"><div className="library-heading"><div><p className="eyebrow">YOUR READING PATH</p><h2>按难度选择</h2></div><p>建议从“起步阅读”开始，读熟后再向上挑战。</p></div><div className="stage-guide-grid">{(Object.keys(stageInfo) as Stage[]).map((stage, index) => <button key={stage} className={`stage-guide-card ${filter === stage ? "active" : ""}`} onClick={() => setFilter(filter === stage ? "all" : stage)}><span className="stage-index">0{index + 1}</span><div><b>{stageInfo[stage].label}</b><p>{stageInfo[stage].intro}</p></div><span className="stage-arrow">→</span></button>)}</div><div className="library-toolbar"><div className="filter-tabs"><button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>全部 35 本</button>{(Object.keys(stageInfo) as Stage[]).map((stage) => <button key={stage} className={filter === stage ? "active" : ""} onClick={() => setFilter(stage)}>{stageInfo[stage].short}</button>)}</div><span>{visibleBooks.length} 本可选择</span></div><div className="book-shelf">{visibleBooks.map((book) => <Link className="shelf-card" href={`/books/${book.slug}`} key={book.slug}><div className="shelf-emoji">{book.emoji}</div><div className="shelf-card-body"><span className={`stage-label ${book.stage}`}>{stageInfo[book.stage].short} · {book.age}</span><h3>{book.title}</h3><p>{book.chinese}</p><small>{book.focus}</small></div><span className="shelf-arrow">↗</span></Link>)}</div></section>
    <section className="how-it-works section-wrap"><div><p className="eyebrow">HOW IT WORKS</p><h2>选书之后，会发生什么？</h2></div><div className="how-steps"><span><b>01</b><strong>认识这本书</strong><small>主题介绍 · 阅读阶段 · 学习目标</small></span><span><b>02</b><strong>读词汇和句型</strong><small>听发音 · 读例句 · 说一说</small></span><span><b>03</b><strong>完成小测验</strong><small>理解检查 · 得星星 · 再挑战</small></span></div></section>
    <footer><span>☁ Little Weather Club</span><span>Choose a book, then make one small discovery.</span></footer>
  </main>;
}
