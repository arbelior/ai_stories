const heroCategories = {
  superheroes: {
    boy: {
      '3-6': [
        { id: 1, name: "ספיידרמן", power: "כוחות של עכביש", image: "🕷️" },
        { id: 2, name: "סופרמן", power: "כוחות על", image: "👊" },
        { id: 3, name: "באטמן", power: "גאון טכנולוגי", image: "🦇" },
      ],
      '7-9': [
        { id: 4, name: "איירון מן", power: "שריון חכם", image: "🤖" },
        { id: 5, name: "קפטן אמריקה", power: "כוח וזריזות על", image: "🛡️" },
      ],
      '10-12': [
        { id: 6, name: "דוקטור סטריינג'", power: "קסם ומיסטיקה", image: "🔮" },
        { id: 7, name: "בלאק פנתר", power: "טכנולוגיה מתקדמת", image: "🐆" },
      ],
      '13-15': [
        { id: 8, name: "דדפול", power: "ריפוי עצמי", image: "⚔️" },
        { id: 9, name: "וולברין", power: "ציפורניים מאדמנטיום", image: "🐺" },
      ]
    },
    girl: {
      '3-6': [
        { id: 10, name: "וונדר וומן", power: "כוח אמזוני", image: "👸" },
        { id: 11, name: "סופרגירל", power: "כוחות על", image: "💫" },
      ],
      '7-15': [
        { id: 12, name: "שחורה אלמנה", power: "לוחמת על", image: "🕷️" },
        { id: 13, name: "קפטן מארוול", power: "אנרגיה קוסמית", image: "⭐" },
      ]
    }
  },
  bible: {
    boy: {
      '7-9': [
        { id: 14, name: "דוד המלך", power: "אומץ וחוכמה", image: "👑" },
        { id: 15, name: "משה רבנו", power: "מנהיג העם", image: "📜" },
      ],
      '10-15': [
        { id: 16, name: "שמשון הגיבור", power: "כוח על-טבעי", image: "💪" },
        { id: 17, name: "שלמה המלך", power: "חוכמה אלוהית", image: "👑" },
      ]
    },
    girl: {
      '7-15': [
        { id: 18, name: "מרים הנביאה", power: "נבואה ומנהיגות", image: "🎭" },
        { id: 19, name: "דבורה הנביאה", power: "שופטת ונביאה", image: "⚖️" },
        { id: 20, name: "אסתר המלכה", power: "תבונה ואומץ", image: "👑" },
      ]
    }
  },
  historical: {
    boy: {
      '10-15': [
        { id: 21, name: "הרצל", power: "חזון המדינה", image: "🏛️" },
        { id: 22, name: "בן גוריון", power: "מנהיגות ועוצמה", image: "🇮🇱" },
        { id: 23, name: "רבי עקיבא", power: "חוכמת התורה", image: "📚" },
      ]
    },
    girl: {
      '10-15': [
        { id: 24, name: "חנה סנש", power: "גבורה והקרבה", image: "✈️" },
        { id: 25, name: "הנרייטה סאלד", power: "חסד והצלה", image: "❤️" },
      ]
    }
  },
  modern: {
    boy: {
      '3-6': [
        { id: 26, name: "עומר אדם", power: "קול זהב", image: "🎤" },
        { id: 27, name: "סטטיק", power: "קסם הבידור", image: "🎵" },
      ],
      '7-15': [
        { id: 28, name: "נועה קירל", power: "כוכבת על", image: "⭐" },
        { id: 29, name: "עידן רייכל", power: "מוזיקה קסומה", image: "🎹" },
      ]
    },
    girl: {
      '3-15': [
        { id: 30, name: "נסרין קדרי", power: "קול מלאכי", image: "🎤" },
        { id: 31, name: "שרית חדד", power: "מלכת המוזיקה", image: "👑" },
      ]
    }
  }
};

export const getRelevantHeroes = (gender, ageRange) => {
  let relevantHeroes = [];
  
  Object.keys(heroCategories).forEach(category => {
    const genderHeroes = heroCategories[category][gender];
    if (genderHeroes) {
      // Check specific age range first
      if (genderHeroes[ageRange]) {
        relevantHeroes = [...relevantHeroes, ...genderHeroes[ageRange]];
      }
      // Check ranges that cover multiple ages
      Object.keys(genderHeroes).forEach(range => {
        if (range.includes('-')) {
          const [min, max] = range.split('-').map(Number);
          const [userMin, userMax] = ageRange.split('-').map(Number);
          if (userMin >= min && userMax <= max) {
            relevantHeroes = [...relevantHeroes, ...genderHeroes[range]];
          }
        }
      });
    }
  });

  return relevantHeroes;
};

export default heroCategories; 