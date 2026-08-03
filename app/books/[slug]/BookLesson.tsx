"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getVocabulary, stageInfo, type Book } from "../../lib/books";

const commonQuestions = [
  "Which word belongs to this book’s topic?",
  "What is a good way to learn a new word?",
  "What should you do after reading a page?",
];

export function BookLesson({ book }: { book: Book }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [remembered, setRemembered] = useState<number[]>([]);
  const [wordChoice, setWordChoice] = useState<number | null>(null);
  const vocabulary = useMemo(() => getVocabulary(book), [book]);
  const wordQuestion = vocabulary[0];
  const wordOptions = [wordQuestion.chinese, "一个动作", "一种颜色"];
  const questions = useMemo(() => [
    { question: `Which stage is recommended for ${book.title}?`, options: ["Starter", "Explorer", "Independent"], answer: book.stage === "starter" ? 0 : book.stage === "explorer" ? 1 : 2 },
    { question: `What will you explore in ${book.title}?`, options: [book.focus, "Cooking recipes", "Musical instruments"], answer: 0 },
    { question: commonQuestions[0], options: [book.keywords[0] ?? "topic", "banana", "pencil"], answer: 0 },
    { question: commonQuestions[1], options: ["Say it aloud", "Hide the word", "Skip every page"], answer: 0 },
    { question: commonQuestions[2], options: ["Tell one new fact", "Close the book immediately", "Forget the word"], answer: 0 },
  ], [book]);
  const current = questions[selected === null ? 0 : Math.min(selected, questions.length - 1)];
  const answered = selected !== null;

  function answer(option: number) { if (!answered) setSelected(option); }
  function next() { if (selected === questions.length - 1) setDone(true); else setSelected((value) => (value === null ? 0 : value + 1)); }

  return <main className="lesson-page">
    <header className="topbar lesson-topbar"><Link className="brand" href="/"><span>☁</span> Little Weather Club</Link><Link className="back-link" href="/">← Back to library</Link><span className="lesson-progress">1 book · 1 small goal</span></header>
    <section className="lesson-hero section-wrap"><div className="lesson-cover">{book.title === "Weather" ? <img src="/weather-cover.jpg" alt="Weather book cover" /> : <span>{book.emoji}</span>}</div><div className="lesson-title"><p className="eyebrow">NOW READING · USBORNE BEGINNERS</p><h1>{book.title}</h1><p className="lesson-chinese">{book.chinese}</p><div className={`lesson-stage ${book.stage}`}>{stageInfo[book.stage].label} · {book.age}</div><p className="lesson-description">{book.description}</p><div className="lesson-actions"><a className="button primary" href="#learn">开始这一课 <span>↓</span></a><span className="tiny-note">建议 10–15 分钟</span></div></div></section>
    <section className="lesson-overview section-wrap"><div><p className="eyebrow">READING GUIDE</p><h2>这本书适合怎样读？</h2><p className="overview-copy">{stageInfo[book.stage].intro}</p></div><div className="overview-cards"><div><span>🎯</span><b>今日目标</b><p>认识 5 个关键词，并用一句英语说出一个发现。</p></div><div><span>🧭</span><b>阅读重点</b><p>{book.focus} · 看图找线索 · 读完复述。</p></div></div></section>
    <section id="learn" className="lesson-learn section-wrap"><div className="section-heading"><div><p className="eyebrow">LEARN TOGETHER</p><h2>三步学习法</h2></div><span className="tip">读一页，停一下，说一说</span></div><div className="lesson-steps"><article><span>01</span><h3>Look 看图</h3><p>先不查词，观察图片，猜一猜这一页在讲什么。</p></article><article><span>02</span><h3>Read 读词</h3><p>圈出 5 个关键词。把它们读三遍，再放回句子里。</p></article><article><span>03</span><h3>Tell 复述</h3><p>合上书，用 “I learned…” 说出一个新发现。</p></article></div><div className="keyword-strip"><span>今天的关键词</span>{book.keywords.map((keyword) => <b key={keyword}>{keyword}</b>)}<b>{book.title.toLowerCase()}</b></div></section>
    <section className="word-lab section-wrap"><div className="section-heading"><div><p className="eyebrow">WORD LAB · WORDS TO REMEMBER</p><h2>单词学习实验室</h2></div><span className="tip">点击卡片翻面 · 🔊 听发音</span></div><div className="word-lab-grid">{vocabulary.map((item, index) => <article className={`vocab-card ${flipped === index ? "flipped" : ""}`} key={item.word}><div className="vocab-face"><div className="vocab-top"><span>WORD 0{index + 1}</span><button aria-label={`播放 ${item.word}`} onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(item.word))}>🔊</button></div><h3>{item.word}</h3><p className="pronunciation">{item.sound}</p><button className="flip-button" onClick={() => setFlipped(flipped === index ? null : index)}>点击看解释 ↻</button></div><div className="vocab-back"><span className="vocab-meaning">{item.chinese}</span><p>{item.definition}</p><em>{item.example}</em><button className={`remember-button ${remembered.includes(index) ? "remembered" : ""}`} onClick={() => setRemembered((values) => values.includes(index) ? values.filter((value) => value !== index) : [...values, index])}>{remembered.includes(index) ? "✓ 已记住" : "我记住了"}</button></div></article>)}</div><div className="memory-bar"><span>🧠 记忆进度</span><div><i style={{ width: `${(remembered.length / vocabulary.length) * 100}%` }} /></div><b>{remembered.length} / {vocabulary.length}</b></div><div className="word-check"><div><p className="eyebrow">WORD CHECK</p><h3>小小单词测验</h3><p><b>{wordQuestion.word}</b> 是什么意思？</p></div><div className="word-check-options">{wordOptions.map((option, index) => <button key={option} className={wordChoice !== null ? index === 0 ? "correct" : index === wordChoice ? "wrong" : "" : ""} onClick={() => setWordChoice(index)}>{option}{wordChoice !== null && index === 0 ? " ✓" : ""}</button>)}</div>{wordChoice !== null && <span className="word-feedback">{wordChoice === 0 ? "答对啦！" : "再翻开单词卡看一看～"}</span>}</div></section>
    <section className="lesson-activity section-wrap"><div className="activity-copy"><p className="eyebrow">SPEAK IT</p><h2>说一句你的发现</h2><p>把主题词放进句子里。不会写也没关系，可以先大声说。</p><div className="sentence-prompt">I learned about <b>{book.title.toLowerCase()}</b>.<br />I can see <span>__________</span>.</div><button className="speak-button" onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(`I learned about ${book.title}.`))}>🔊 Listen &amp; repeat</button></div><div className="activity-art">{book.emoji}<small>LOOK · READ · TELL</small></div></section>
    <section id="quiz" className="lesson-quiz section-wrap"><div className="section-heading"><div><p className="eyebrow">CHECK YOUR DISCOVERY</p><h2>这本书的小测验</h2></div><span className="tip">5 questions · no pressure</span></div><div className="lesson-quiz-box"><div className="quiz-top"><span>{done ? "MISSION COMPLETE" : `QUESTION ${(selected ?? 0) + 1} / ${questions.length}`}</span><div className="dots">{questions.map((_, index) => <i key={index} className={done || index < (selected ?? -1) ? "filled" : ""} />)}</div></div>{done ? <div className="quiz-complete"><div className="big-star">🏆</div><h3>完成啦！你读懂了这本书的学习方法。</h3><p>现在回到书里，找一个刚才测验中出现的词。</p><button className="button primary restart" onClick={() => { setDone(false); setSelected(null); }}>再做一次 ↻</button></div> : <><h3>{current.question}</h3><div className="options">{current.options.map((option, index) => <button key={option} className={answered ? index === current.answer ? "correct" : index === selected ? "wrong" : "" : ""} onClick={() => answer(index)}>{option}<span>{answered && index === current.answer ? "✓" : answered && index === selected ? "×" : ""}</span></button>)}</div>{answered && <div className="quiz-result"><p>{selected === current.answer ? "答对啦！" : "看一看提示，再试下一题。"} 下一步继续探索。</p><button className="next-button" onClick={next}>{selected === questions.length - 1 ? "查看结果" : "下一题"} →</button></div>}</>}</div></section>
    <section className="lesson-footer section-wrap"><Link href="/">← 选择另一本书</Link><span>Little Weather Club · Keep being curious.</span></section>
  </main>;
}
