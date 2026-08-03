"use client";

import { useState } from "react";

type Quiz = { question: string; options: string[]; answer: number; hint: string };
type Stage = "starter" | "explorer" | "independent";
type Book = { title: string; chinese: string; emoji: string; stage: Stage; focus: string };

const words = [
  { word: "sunny", chinese: "晴朗的", emoji: "☀️", sentence: "It is sunny today." },
  { word: "cloudy", chinese: "多云的", emoji: "☁️", sentence: "The sky is cloudy." },
  { word: "rainy", chinese: "下雨的", emoji: "🌧️", sentence: "Take an umbrella on a rainy day." },
  { word: "windy", chinese: "有风的", emoji: "💨", sentence: "It is windy outside." },
  { word: "snowy", chinese: "下雪的", emoji: "❄️", sentence: "We can play in the snow." },
  { word: "stormy", chinese: "暴风雨的", emoji: "⛈️", sentence: "A stormy sky can be very dark." },
];

const books: Book[] = [
  ["Planes", "飞机", "✈️", "starter", "交通与动作词"], ["Snakes", "蛇", "🐍", "explorer", "动物与形容词"], ["Octopuses", "章鱼", "🐙", "starter", "海洋与身体"], ["Volcanoes", "火山", "🌋", "independent", "地球与因果"], ["Trucks", "卡车", "🚚", "starter", "车辆与职业"], ["How Flowers Grow", "花是怎样长大的", "🌷", "explorer", "植物与过程"], ["Whales", "鲸鱼", "🐋", "explorer", "海洋动物"], ["Ants", "蚂蚁", "🐜", "starter", "动物与合作"], ["Trees", "树", "🌳", "explorer", "自然与观察"], ["Bees and Wasps", "蜜蜂和黄蜂", "🐝", "independent", "昆虫与安全"], ["Reptiles", "爬行动物", "🦎", "explorer", "动物分类"], ["Caterpillars and Butterflies", "毛毛虫和蝴蝶", "🦋", "starter", "变化与时间"], ["Reptiles", "爬行动物（新版）", "🐢", "explorer", "比较与描述"], ["Coral Reefs", "珊瑚礁", "🪸", "independent", "生态与保护"], ["Dangerous Animals", "危险动物", "🐊", "independent", "安全与事实"], ["Spiders", "蜘蛛", "🕷️", "explorer", "身体与数量"], ["Bugs", "小虫子", "🐞", "starter", "自然词汇"], ["Baby Animals", "动物宝宝", "🦒", "starter", "家庭与成长"], ["Underground Animals", "地下动物", "🦡", "explorer", "栖息地"], ["Penguins", "企鹅", "🐧", "starter", "极地与生活"], ["Antarctica", "南极洲", "🧊", "independent", "地理与气候"], ["Planet Earth", "地球", "🌍", "independent", "地球科学"], ["Living in Space", "太空生活", "🚀", "independent", "科学与想象"], ["Horses and Ponies", "马和小马", "🐴", "starter", "动物与照料"], ["Trains", "火车", "🚆", "starter", "交通与地点"], ["Earthquakes & Tsunamis", "地震和海啸", "🌊", "independent", "自然灾害"], ["Weather", "天气", "⛈️", "starter", "天气表达"], ["Rainforests", "热带雨林", "🌴", "explorer", "环境与动物"], ["The Solar System", "太阳系", "🪐", "independent", "太空与顺序"], ["Storms and Hurricanes", "风暴和飓风", "🌪️", "independent", "天气与安全"], ["Under the Sea", "海底世界", "🐠", "explorer", "海洋词汇"], ["On the Beach", "在海滩上", "🏖️", "starter", "场景与感官"], ["Firefighters", "消防员", "🚒", "starter", "职业与安全"], ["Dinosaurs", "恐龙", "🦕", "explorer", "过去与比较"], ["Sharks", "鲨鱼", "🦈", "explorer", "海洋与事实"],
].map(([title, chinese, emoji, stage, focus]) => ({ title, chinese, emoji, stage: stage as Stage, focus }));

const stageInfo: Record<Stage, { label: string; intro: string; detail: string }> = {
  starter: { label: "起步阅读 · Starter", intro: "先建立信心，从熟悉、好玩的主题开始。", detail: "适合亲子共读：看图说词，每次读 2–4 页。" },
  explorer: { label: "探索阅读 · Explorer", intro: "开始用英语理解事实，并练习说完整句子。", detail: "适合独立读一段，再和家人分享一个新发现。" },
  independent: { label: "独立阅读 · Independent", intro: "挑战更丰富的科学词汇和因果关系。", detail: "适合先通读，再做词汇卡和小测验。" },
};

const facts = [
  { emoji: "🌈", title: "Rainbows need rain", text: "When sunlight shines through raindrops, we may see a rainbow." },
  { emoji: "🌡️", title: "Hot or cold?", text: "A thermometer tells us the temperature. We measure it in degrees." },
  { emoji: "💧", title: "Water goes around", text: "Water evaporates, makes clouds, then falls as rain or snow. This is the water cycle." },
  { emoji: "🌬️", title: "Wind is moving air", text: "Air moves from one place to another. That moving air is called wind." },
];

const quiz: Quiz[] = [
  { question: "Which word means “晴朗的”?", options: ["rainy", "sunny", "windy"], answer: 1, hint: "Think of the bright yellow sun." },
  { question: "What should you take on a rainy day?", options: ["An umbrella", "Sunglasses", "A kite"], answer: 0, hint: "It keeps you dry!" },
  { question: "Complete: The sky is _____. ☁️", options: ["snowy", "cloudy", "stormy"], answer: 1, hint: "Clouds are in the sky." },
  { question: "Which weather can make a kite fly?", options: ["Windy", "Snowy", "Sunny"], answer: 0, hint: "The air is moving." },
  { question: "What falls from the sky on a snowy day?", options: ["Rainbows", "Leaves", "Snowflakes"], answer: 2, hint: "They are white and cold." },
  { question: "Complete: It is _____ outside. 💨", options: ["windy", "cloudy", "sunny"], answer: 0, hint: "The air is moving fast." },
  { question: "Which word describes a very dark sky with thunder?", options: ["stormy", "snowy", "sunny"], answer: 0, hint: "Listen for thunder and look for lightning." },
  { question: "Choose the best sentence for a cold day.", options: ["Wear a warm coat.", "Take a beach towel.", "Open the umbrella for sun."], answer: 0, hint: "A coat helps keep your body warm." },
  { question: "Which spelling is correct?", options: ["clowdy", "cloudy", "cloudie"], answer: 1, hint: "Cloud + y makes cloudy." },
  { question: "What question can you ask about today’s weather?", options: ["What is the weather like?", "Where is my pencil?", "Who is your teacher?"], answer: 0, hint: "It starts with What and asks about weather." },
];

const bonusTests = [
  { title: "句型小侦探", prompt: "Choose: It is ___ today. ☀️", options: ["sunny", "rainy"], answer: 0 },
  { title: "生活小选择", prompt: "It is rainy. What do you need?", options: ["An umbrella", "A kite"], answer: 0 },
  { title: "拼写小达人", prompt: "Which one is a weather word?", options: ["windy", "windee"], answer: 0 },
];

const reading = [
  { label: "A", text: "Look outside! The sun is shining and the sky is blue. It is a sunny day.", question: "What colour is the sky?", answer: "blue" },
  { label: "B", text: "The clouds are grey. We can hear thunder. Let’s stay inside until the storm passes.", question: "Where should we stay?", answer: "inside" },
];

export default function Home() {
  const [active, setActive] = useState("start");
  const [libraryFilter, setLibraryFilter] = useState<Stage | "all">("all");
  const [selectedBook, setSelectedBook] = useState(26);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [weather, setWeather] = useState("sunny");
  const [diaryText, setDiaryText] = useState("");
  const [bonusAnswers, setBonusAnswers] = useState<(number | null)[]>([null, null, null]);
  const currentQuiz = quiz[quizIndex];
  const visibleBooks = libraryFilter === "all" ? books : books.filter((book) => book.stage === libraryFilter);
  const selectedBookData = books[selectedBook];

  function choose(option: number) {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === currentQuiz.answer) setScore((value) => value + 1);
  }

  function nextQuestion() {
    setQuizIndex((value) => value + 1);
    setSelected(null);
    setAnswered(false);
  }

  function resetQuiz() {
    setQuizIndex(0); setSelected(null); setAnswered(false); setScore(0);
  }

  function go(id: string) { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

  function answerBonus(testIndex: number, answer: number) {
    setBonusAnswers((values) => values.map((value, index) => index === testIndex ? answer : value));
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#start" onClick={() => setActive("start")}><span>☁</span> Little Weather Club</a>
        <nav aria-label="主导航">
          {[['start', '学习地图'], ['library', '选一本书'], ['words', '词汇'], ['discover', '发现天气'], ['quiz', '小测验']].map(([id, label]) => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={() => setActive(id)}>{label}</a>)}
        </nav>
        <div className="streak">🔥 <b>3</b> 天学习</div>
      </header>

      <section id="start" className="hero section-wrap">
        <div className="hero-copy"><p className="eyebrow">USBORNE BEGINNERS · WEATHER</p><h1>Let&apos;s talk<br /><i>about weather.</i></h1><p className="hero-text">和小云朵一起读懂天气，用英语描述窗外的世界。今天只要 10 分钟，完成一小步也很棒！</p><div className="hero-actions"><a className="button primary" href="#words" onClick={() => setActive("words")}>开始学习 <span>→</span></a><span className="tiny-note">亲子共读 · 6 个学习站</span></div></div>
        <div className="book-card"><div className="book-shine" /><img src="/weather-cover.jpg" alt="Usborne Beginners Weather book cover" /><div className="book-tag">READ · SAY · PLAY</div></div><div className="cloud cloud-one">☁</div><div className="cloud cloud-two">☁</div>
      </section>

      <section id="library" className="library section-wrap"><div className="section-heading"><div><p className="eyebrow">THE BEGINNERS LIBRARY</p><h2>今天想读哪一本？</h2></div><span className="completion">35 books · 3 reading stages</span></div><div className="library-intro"><div><p>这套书官方目录目前有 35 本。先选一本，再按孩子的状态决定今天是“亲子共读”“自己读一段”，还是“读完做挑战”。</p><div className="stage-tabs"><button className={libraryFilter === "all" ? "selected" : ""} onClick={() => setLibraryFilter("all")}>全部 35 本</button>{(Object.keys(stageInfo) as Stage[]).map((stage) => <button key={stage} className={libraryFilter === stage ? "selected" : ""} onClick={() => setLibraryFilter(stage)}>{stageInfo[stage].label.split(" · ")[0]}</button>)}</div></div><div className="selected-book"><span className="selected-book-emoji">{selectedBookData.emoji}</span><div><small>NOW READING</small><h3>{selectedBookData.title}</h3><p>{stageInfo[selectedBookData.stage].label} · {selectedBookData.focus}</p></div></div></div><div className="library-grid">{visibleBooks.map((book) => { const index = books.indexOf(book); return <button className={`library-card ${index === selectedBook ? "selected" : ""}`} key={`${book.title}-${index}`} onClick={() => setSelectedBook(index)}><span className="library-emoji">{book.emoji}</span><span className="library-title"><b>{book.title}</b><small>{book.chinese}</small></span><span className={`stage-dot ${book.stage}`}>{book.stage === "starter" ? "起步" : book.stage === "explorer" ? "探索" : "独立"}</span></button>; })}</div><div className="stage-guide"><span className="guide-icon">💡</span><div><b>{stageInfo[selectedBookData.stage].label}</b><p>{stageInfo[selectedBookData.stage].intro} {stageInfo[selectedBookData.stage].detail}</p></div><span className="guide-arrow">→</span></div></section>

      <section className="path section-wrap" aria-label="学习地图"><div className="section-heading"><div><p className="eyebrow">YOUR MINI ADVENTURE</p><h2>今天的学习地图</h2></div><span className="completion">{Math.round((Math.min(quizIndex, quiz.length) / quiz.length) * 100)}% complete</span></div><div className="steps">
        <a href="#words" className="step done" onClick={() => setActive("words")}><span className="step-icon">☀️</span><span><b>1. Meet the weather</b><small>认识 6 个天气词</small></span><em>✓</em></a>
        <a href="#discover" className="step" onClick={() => setActive("discover")}><span className="step-icon">🔎</span><span><b>2. Become a weather detective</b><small>发现天气小秘密</small></span><em>→</em></a>
        <a href="#quiz" className="step" onClick={() => setActive("quiz")}><span className="step-icon">⭐</span><span><b>3. Show what you know</b><small>完成 5 道小测验</small></span><em>→</em></a>
      </div></section>

      <section id="words" className="vocab section-wrap"><div className="section-heading"><div><p className="eyebrow">WORD CLOUD</p><h2>天气词汇 · Weather words</h2></div><p className="tip">点击 🔊，大声读出来！</p></div><div className="word-grid">{words.map((item) => <article className="word-card" key={item.word} tabIndex={0}><span className="word-emoji">{item.emoji}</span><div><h3>{item.word}</h3><p>{item.chinese}</p></div><button aria-label={`播放 ${item.word}`} onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(item.word))}>🔊</button><div className="sentence">{item.sentence}</div></article>)}</div></section>

      <section id="discover" className="discover section-wrap"><div className="section-heading"><div><p className="eyebrow">WEATHER DETECTIVE</p><h2>天气小课堂 · Discover</h2></div><span className="tip">读一读，告诉家人一个新发现</span></div><div className="fact-grid">{facts.map((fact) => <article className="fact-card" key={fact.title}><span>{fact.emoji}</span><h3>{fact.title}</h3><p>{fact.text}</p></article>)}</div></section>

      <section id="phrases" className="phrase-band"><div className="section-wrap phrase-inner"><div><p className="eyebrow">SAY IT OUT LOUD</p><h2>It&apos;s a ______ day.</h2><p>把今天的天气填进去吧！例如：<b>It&apos;s a sunny day.</b></p></div><div className="phrase-bubbles"><span>sunny</span><span>rainy</span><span>windy</span></div></div></section>

      <section className="reading section-wrap"><div className="section-heading"><div><p className="eyebrow">READ &amp; TALK</p><h2>读一读 · 说一说</h2></div><span className="tip">适合和爸爸妈妈轮流读</span></div><div className="reading-grid">{reading.map((item) => <article className="reading-card" key={item.label}><span className="reading-label">CARD {item.label}</span><p className="reading-text">{item.text}</p><div className="talk-row"><span>❓ {item.question}</span><b>{item.answer}</b><button onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(item.answer))}>🔊 Say it</button></div></article>)}</div></section>

      <section className="diary-band"><div className="section-wrap diary-inner"><div><p className="eyebrow">MY WEATHER DIARY</p><h2>今天的天空是什么样？</h2><p>选一个天气，再写一句话或画一画。记录你的小发现。</p><div className="weather-picker">{words.slice(0, 5).map((item) => <button key={item.word} className={weather === item.word ? "chosen" : ""} onClick={() => setWeather(item.word)}>{item.emoji}<small>{item.word}</small></button>)}</div></div><div className="diary-note"><div className="date-line">AUGUST 03, 2026 <span>MY NOTE</span></div><p>Today is a <b>{weather}</b> day.</p><textarea aria-label="天气日记" value={diaryText} onChange={(event) => setDiaryText(event.target.value)} placeholder="I can see... / 我能看到……" /><div className="diary-footer">{diaryText.length > 0 ? "Great observation! 🌟" : "写一句你的观察吧"}</div></div></div></section>

      <section id="quiz" className="quiz section-wrap"><div className="quiz-intro"><p className="eyebrow">THE BIG CHECK</p><h2>小小气象员<br /><i>准备好了吗？</i></h2><p>答对问题，收集你的天气徽章。别担心，答错也是学习的一部分！</p><div className="score-pill">⭐ {score} / {quiz.length} stars</div></div><div className="quiz-box"><div className="quiz-top"><span>{quizIndex >= quiz.length ? "MISSION COMPLETE" : `QUESTION ${quizIndex + 1} / ${quiz.length}`}</span><div className="dots">{quiz.map((_, i) => <i key={i} className={i < quizIndex ? "filled" : ""} />)}</div></div>{quizIndex >= quiz.length ? <div className="quiz-complete"><div className="big-star">🏆</div><h3>太棒了！你是天气小专家！</h3><p>你收集了 {score} 颗星星，记得把今天学到的词告诉家人。</p><button className="button primary restart" onClick={resetQuiz}>再来一次 ↻</button></div> : <><h3>{currentQuiz.question}</h3><div className="options">{currentQuiz.options.map((option, i) => <button key={option} className={answered ? (i === currentQuiz.answer ? "correct" : i === selected ? "wrong" : "") : ""} onClick={() => choose(i)}>{option}<span>{answered && i === currentQuiz.answer ? "✓" : answered && i === selected ? "×" : ""}</span></button>)}</div>{answered && <div className="quiz-result"><p>{selected === currentQuiz.answer ? "答对啦！" : "再想一想～"} {currentQuiz.hint}</p><button className="next-button" onClick={nextQuestion}>{quizIndex === quiz.length - 1 ? "查看结果" : "下一题"} →</button></div>}</>}</div></section>

      <section className="bonus section-wrap"><div className="section-heading"><div><p className="eyebrow">EXTRA PRACTICE</p><h2>加餐挑战 · 3 quick tests</h2></div><span className="tip">每题都可以重选</span></div><div className="bonus-grid">{bonusTests.map((test, testIndex) => { const answer = bonusAnswers[testIndex]; return <article className="bonus-card" key={test.title}><span className="bonus-number">0{testIndex + 1}</span><h3>{test.title}</h3><p>{test.prompt}</p><div className="bonus-options">{test.options.map((option, optionIndex) => <button key={option} className={answer !== null ? (optionIndex === test.answer ? "correct" : optionIndex === answer ? "wrong" : "") : ""} onClick={() => answerBonus(testIndex, optionIndex)}>{option}{answer !== null && optionIndex === test.answer ? " ✓" : ""}</button>)}</div>{answer !== null && <small>{answer === test.answer ? "Great job! 🌟" : "Look again and try the next one."}</small>}</article>; })}</div></section>

      <section className="parent-prompt section-wrap"><span className="prompt-icon">💛</span><div><p className="eyebrow">A LITTLE HELP FOR GROWN-UPS</p><h3>亲子提问小卡</h3><p>和孩子一起看窗外，问问：<b>“What is the weather like today?”</b><br />让孩子用一句英语回答，再一起找出对应的天气词。</p></div><span className="prompt-mark">☁︎</span></section>
      <footer><span>☁ Little Weather Club</span><span>Made for curious readers · 读完这本书，去观察今天的天空吧！</span></footer>
    </main>
  );
}
