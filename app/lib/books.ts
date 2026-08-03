export type Stage = "starter" | "explorer" | "independent";

export type Book = {
  slug: string;
  title: string;
  chinese: string;
  emoji: string;
  stage: Stage;
  age: string;
  focus: string;
  description: string;
  keywords: string[];
};

export type VocabularyWord = { word: string; chinese: string; sound: string; definition: string; example: string };

export const stageInfo: Record<Stage, { label: string; short: string; intro: string }> = {
  starter: { label: "起步阅读 · Starter", short: "简单", intro: "适合刚开始独立阅读的孩子：看图、认词、读短句，先把“我能读”变成信心。" },
  explorer: { label: "探索阅读 · Explorer", short: "进阶", intro: "适合能读懂短段落的孩子：学习事实词汇，用完整句子说出一个新发现。" },
  independent: { label: "独立阅读 · Independent", short: "挑战", intro: "适合希望挑战科学主题的孩子：理解因果、比较和顺序，读完后自己复述。" },
};

const rawBooks: [string, string, string, Stage, string][] = [
  ["Planes", "飞机", "✈️", "starter", "交通与动作词"], ["Trucks", "卡车", "🚚", "starter", "车辆与职业"], ["Ants", "蚂蚁", "🐜", "starter", "动物与合作"], ["Bugs", "小虫子", "🐞", "starter", "自然词汇"], ["Baby Animals", "动物宝宝", "🦒", "starter", "家庭与成长"], ["Penguins", "企鹅", "🐧", "starter", "极地与生活"], ["Horses and Ponies", "马和小马", "🐴", "starter", "动物与照料"], ["Trains", "火车", "🚆", "starter", "交通与地点"], ["Weather", "天气", "⛈️", "starter", "天气表达"], ["On the Beach", "在海滩上", "🏖️", "starter", "场景与感官"], ["Firefighters", "消防员", "🚒", "starter", "职业与安全"],
  ["Snakes", "蛇", "🐍", "explorer", "动物与形容词"], ["Octopuses", "章鱼", "🐙", "starter", "海洋与身体"], ["How Flowers Grow", "花是怎样长大的", "🌷", "explorer", "植物与过程"], ["Whales", "鲸鱼", "🐋", "explorer", "海洋动物"], ["Trees", "树", "🌳", "explorer", "自然与观察"], ["Reptiles", "爬行动物", "🦎", "explorer", "动物分类"], ["Caterpillars and Butterflies", "毛毛虫和蝴蝶", "🦋", "starter", "变化与时间"], ["Reptiles", "爬行动物（新版）", "🐢", "explorer", "比较与描述"], ["Spiders", "蜘蛛", "🕷️", "explorer", "身体与数量"], ["Underground Animals", "地下动物", "🦡", "explorer", "栖息地"], ["Rainforests", "热带雨林", "🌴", "explorer", "环境与动物"], ["Under the Sea", "海底世界", "🐠", "explorer", "海洋词汇"], ["Dinosaurs", "恐龙", "🦕", "explorer", "过去与比较"], ["Sharks", "鲨鱼", "🦈", "explorer", "海洋与事实"],
  ["Volcanoes", "火山", "🌋", "independent", "地球与因果"], ["Bees and Wasps", "蜜蜂和黄蜂", "🐝", "independent", "昆虫与安全"], ["Coral Reefs", "珊瑚礁", "🪸", "independent", "生态与保护"], ["Dangerous Animals", "危险动物", "🐊", "independent", "安全与事实"], ["Antarctica", "南极洲", "🧊", "independent", "地理与气候"], ["Planet Earth", "地球", "🌍", "independent", "地球科学"], ["Living in Space", "太空生活", "🚀", "independent", "科学与想象"], ["Earthquakes & Tsunamis", "地震和海啸", "🌊", "independent", "自然灾害"], ["The Solar System", "太阳系", "🪐", "independent", "太空与顺序"], ["Storms and Hurricanes", "风暴和飓风", "🌪️", "independent", "天气与安全"],
];

const slugify = (title: string, index: number) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${index + 1}`;

export const books: Book[] = rawBooks.map(([title, chinese, emoji, stage, focus], index) => ({
  slug: slugify(title, index), title, chinese, emoji, stage, focus,
  age: stage === "starter" ? "4–5 岁起" : stage === "explorer" ? "5–6 岁起" : "6–7 岁起",
  description: `用图像和简单英语认识${chinese}，围绕“${focus}”建立一组可以反复使用的词汇和句子。`,
  keywords: focus.split("与"),
}));

export const weatherBook = books.find((book) => book.title === "Weather") ?? books[8];

const topicVocabulary: Record<string, VocabularyWord[]> = {
  "天气表达": [
    { word: "sunny", chinese: "晴朗的", sound: "/ˈsʌni/", definition: "bright with lots of sunshine", example: "It is sunny today." },
    { word: "cloudy", chinese: "多云的", sound: "/ˈklaʊdi/", definition: "full of clouds", example: "The sky is cloudy." },
    { word: "rainy", chinese: "下雨的", sound: "/ˈreɪni/", definition: "with lots of rain", example: "Take an umbrella on a rainy day." },
    { word: "windy", chinese: "有风的", sound: "/ˈwɪndi/", definition: "with moving air", example: "It is windy outside." },
    { word: "stormy", chinese: "暴风雨的", sound: "/ˈstɔːrmi/", definition: "with strong wind, rain or thunder", example: "The stormy sky is dark." },
  ],
  "交通与动作词": ["fly", "fast", "travel", "wing", "engine"].map((word) => ({ word, chinese: { fly: "飞行", fast: "快的", travel: "旅行", wing: "翅膀", engine: "发动机" }[word] ?? word, sound: "点击听发音", definition: `a useful word for learning about planes and movement`, example: `I can see a ${word}.` })),
  "车辆与职业": ["truck", "road", "drive", "heavy", "build"].map((word) => ({ word, chinese: { truck: "卡车", road: "道路", drive: "驾驶", heavy: "重的", build: "建造" }[word] ?? word, sound: "点击听发音", definition: "a useful word for learning about trucks and work", example: `The ${word} is useful.` })),
  "植物与过程": ["flower", "grow", "root", "seed", "petal"].map((word) => ({ word, chinese: { flower: "花", grow: "生长", root: "根", seed: "种子", petal: "花瓣" }[word] ?? word, sound: "点击听发音", definition: "a useful word for learning how plants grow", example: `A ${word} can be small.` })),
  "海洋与身体": ["ocean", "tentacle", "deep", "swim", "touch"].map((word) => ({ word, chinese: { ocean: "海洋", tentacle: "触手", deep: "深的", swim: "游泳", touch: "触摸" }[word] ?? word, sound: "点击听发音", definition: "a useful word for learning about sea animals", example: `The animal can ${word}.` })),
  "海洋动物": ["whale", "ocean", "tail", "huge", "dive"].map((word) => ({ word, chinese: { whale: "鲸鱼", ocean: "海洋", tail: "尾巴", huge: "巨大的", dive: "潜水" }[word] ?? word, sound: "点击听发音", definition: "a useful word for learning about whales", example: `A whale can ${word}.` })),
  "动物与合作": ["ant", "colony", "carry", "tiny", "work"].map((word) => ({ word, chinese: { ant: "蚂蚁", colony: "蚁群", carry: "搬运", tiny: "微小的", work: "工作" }[word] ?? word, sound: "点击听发音", definition: "a useful word for learning how ants live together", example: `The ${word} can be surprising.` })),
  "自然与观察": ["tree", "branch", "leaf", "shade", "breathe"].map((word) => ({ word, chinese: { tree: "树", branch: "树枝", leaf: "叶子", shade: "阴凉处", breathe: "呼吸" }[word] ?? word, sound: "点击听发音", definition: "a useful word for observing trees and nature", example: `Look at the ${word}.` })),
  "动物与形容词": ["snake", "scale", "long", "slither", "bite"].map((word) => ({ word, chinese: { snake: "蛇", scale: "鳞片", long: "长的", slither: "爬行", bite: "咬" }[word] ?? word, sound: "点击听发音", definition: "a useful word for describing reptiles", example: `The ${word} is interesting.` })),
  "动物分类": ["reptile", "skin", "cold", "egg", "crawl"].map((word) => ({ word, chinese: { reptile: "爬行动物", skin: "皮肤", cold: "冷的", egg: "蛋", crawl: "爬" }[word] ?? word, sound: "点击听发音", definition: "a useful word for sorting and describing animals", example: `I can see an ${word}.` })),
  "环境与动物": ["forest", "humid", "plant", "habitat", "protect"].map((word) => ({ word, chinese: { forest: "森林", humid: "潮湿的", plant: "植物", habitat: "栖息地", protect: "保护" }[word] ?? word, sound: "点击听发音", definition: "a useful word for learning about habitats", example: `We should ${word} nature.` })),
};

export function getVocabulary(book: Book): VocabularyWord[] {
  if (topicVocabulary[book.focus]) return topicVocabulary[book.focus];
  const title = book.title.toLowerCase();
  return [
    { word: title, chinese: book.chinese, sound: "点击听发音", definition: `the main topic of this book`, example: `I am learning about ${title}.` },
    { word: "discover", chinese: "发现", sound: "/dɪˈskʌvər/", definition: "to find something new", example: "We discover a new fact." },
    { word: "look", chinese: "看", sound: "/lʊk/", definition: "to use your eyes", example: "Look at the picture." },
    { word: "learn", chinese: "学习", sound: "/lɜːrn/", definition: "to get new knowledge", example: "I learn something new." },
    { word: "world", chinese: "世界", sound: "/wɜːrld/", definition: "the Earth and everything on it", example: "Our world is full of wonders." },
  ];
}
