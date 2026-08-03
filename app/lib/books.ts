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
