"use client";

import { useMemo, useState } from "react";

type Quiz = { question: string; options: string[]; answer: number; hint: string };

const words = [
  { word: "sunny", chinese: "晴朗的", emoji: "☀️", sentence: "It is sunny today." },
  { word: "cloudy", chinese: "多云的", emoji: "☁️", sentence: "The sky is cloudy." },
  { word: "rainy", chinese: "下雨的", emoji: "🌧️", sentence: "Take an umbrella on a rainy day." },
  { word: "windy", chinese: "有风的", emoji: "💨", sentence: "It is windy outside." },
  { word: "snowy", chinese: "下雪的", emoji: "❄️", sentence: "We can play in the snow on a snowy day." },
  { word: "stormy", chinese: "暴风雨的", emoji: "⛈️", sentence: "A stormy sky can be very dark." },
];

const quiz: Quiz[] = [
  { question: "Which word means “晴朗的”?", options: ["rainy", "sunny", "windy"], answer: 1, hint: "Think of the bright yellow sun." },
  { question: "What should you take on a rainy day?", options: ["An umbrella", "Sunglasses", "A kite"], answer: 0, hint: "It keeps you dry!" },
  { question: "Complete: The sky is _____. ☁️", options: ["snowy", "cloudy", "stormy"], answer: 1, hint: "Clouds are in the sky." },
  { question: "Which weather can make a kite fly?", options: ["Windy", "Snowy", "Sunny"], answer: 0, hint: "The air is moving." },
  { question: "What falls from the sky on a snowy day?", options: ["Rainbows", "Leaves", "Snowflakes"], answer: 2, hint: "They are white and cold." },
];

export default function Home() {
  const [active, setActive] = useState("start");
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const current = Math.min(score + (checked ? 1 : 0), quiz.length - 1);
  const progress = useMemo(() => Math.round((score / quiz.length) * 100), [score]);

  function choose(option: number) {
    if (checked) return;
    setSelected(option);
    setChecked(true);
    if (option === quiz[current].answer) setScore((value) => value + 1);
  }

  function resetQuiz() {
    setSelected(null);
    setChecked(false);
    setScore(0);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#start" onClick={() => setActive("start")}><span>☁</span> Little Weather Club</a>
        <nav aria-label="主导航">
          {[['start', '学习地图'], ['words', '天气词汇'], ['quiz', '小测验']].map(([id, label]) => (
            <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={() => setActive(id)}>{label}</a>
          ))}
        </nav>
        <div className="streak">🔥 <b>3</b> 天学习</div>
      </header>

      <section id="start" className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow">USBORNE BEGINNERS · WEATHER</p>
          <h1>Let&apos;s talk<br /><i>about weather.</i></h1>
          <p className="hero-text">和小云朵一起读懂天气，用英语描述窗外的世界。今天只要 10 分钟，完成一小步也很棒！</p>
          <div className="hero-actions"><a className="button primary" href="#words" onClick={() => setActive("words")}>开始学习 <span>→</span></a><span className="tiny-note">适合亲子共读 · 5 个小任务</span></div>
        </div>
        <div className="book-card"><div className="book-shine" /><img src="/weather-cover.jpg" alt="Usborne Beginners Weather book cover" /><div className="book-tag">READ · SAY · PLAY</div></div>
        <div className="cloud cloud-one">☁</div><div className="cloud cloud-two">☁</div>
      </section>

      <section className="path section-wrap" aria-label="学习地图">
        <div className="section-heading"><div><p className="eyebrow">YOUR MINI ADVENTURE</p><h2>今天的学习地图</h2></div><span className="completion">{progress}% complete</span></div>
        <div className="steps">
          <a href="#words" className="step done" onClick={() => setActive("words")}><span className="step-icon">☀️</span><span><b>1. Meet the weather</b><small>认识 6 个天气词</small></span><em>✓</em></a>
          <a href="#phrases" className="step" onClick={() => setActive("words")}><span className="step-icon">💬</span><span><b>2. Say a sentence</b><small>学会描述天气</small></span><em>→</em></a>
          <a href="#quiz" className="step" onClick={() => setActive("quiz")}><span className="step-icon">⭐</span><span><b>3. Show what you know</b><small>完成 5 道小测验</small></span><em>→</em></a>
        </div>
      </section>

      <section id="words" className="vocab section-wrap">
        <div className="section-heading"><div><p className="eyebrow">WORD CLOUD</p><h2>天气词汇 · Weather words</h2></div><p className="tip">点击卡片，大声读出来！</p></div>
        <div className="word-grid">{words.map((item) => <article className="word-card" key={item.word} tabIndex={0}><span className="word-emoji">{item.emoji}</span><div><h3>{item.word}</h3><p>{item.chinese}</p></div><button aria-label={`播放 ${item.word}`} onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(item.word))}>🔊</button><div className="sentence">{item.sentence}</div></article>)}</div>
      </section>

      <section id="phrases" className="phrase-band"><div className="section-wrap phrase-inner"><div><p className="eyebrow">SAY IT OUT LOUD</p><h2>It&apos;s a ______ day.</h2><p>把今天的天气填进去吧！<br />例如：<b>It&apos;s a sunny day.</b></p></div><div className="phrase-bubbles"><span>sunny</span><span>rainy</span><span>windy</span></div></div></section>

      <section id="quiz" className="quiz section-wrap">
        <div className="quiz-intro"><p className="eyebrow">THE BIG CHECK</p><h2>小小气象员<br /><i>准备好了吗？</i></h2><p>答对问题，收集你的天气徽章。别担心，答错也是学习的一部分！</p><div className="score-pill">⭐ {score} / {quiz.length} stars</div></div>
        <div className="quiz-box"><div className="quiz-top"><span>QUESTION {Math.min(current + 1, quiz.length)} / {quiz.length}</span><div className="dots">{quiz.map((_, i) => <i key={i} className={i < score ? "filled" : ""} />)}</div></div><h3>{score === quiz.length ? "太棒了！你是天气小专家！" : quiz[current].question}</h3>{score < quiz.length && <div className="options">{quiz[current].options.map((option, i) => <button key={option} className={checked ? (i === quiz[current].answer ? "correct" : i === selected ? "wrong" : "") : ""} onClick={() => choose(i)}>{option}<span>{checked && i === quiz[current].answer ? "✓" : checked && i === selected ? "×" : ""}</span></button>)}</div>}{checked && score < quiz.length && <p className="feedback">{selected === quiz[current].answer ? "答对啦！" : "再想一想～"} {quiz[current].hint}</p>}{score === quiz.length && <button className="button primary restart" onClick={resetQuiz}>再来一次 ↻</button>}</div>
      </section>

      <footer><span>☁ Little Weather Club</span><span>Made for curious readers · 读完这本书，去观察今天的天空吧！</span></footer>
    </main>
  );
}
