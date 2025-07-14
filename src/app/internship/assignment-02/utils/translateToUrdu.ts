const dictionary: Record<string, string> = {
  "technology": "ٹیکنالوجی",
  "innovation": "جدت",
  "privacy": "پرائیویسی",
  "firefox": "فائر فاکس",
  "data": "ڈیٹا",
  "browser": "براؤزر",
  "user": "صارف",
  "internet": "انٹرنیٹ",
  "ai": "مصنوعی ذہانت",
  "monitor": "نگرانی",
  "features": "خصوصیات",
  "expanding": "پھیل رہا ہے",
  "secure": "محفوظ",
  "intelligence": "ذہانت",
  "powered": "چلنے والا",
  "your": "آپ کا",
  "and": "اور",
  "the": "یہ",
  "new": "نیا"
};


export function translateToUrdu(text: string): string {
  let translated = text;

  for (const [eng, urdu] of Object.entries(dictionary)) {
    const regex = new RegExp(`\\b${eng}\\b`, 'gi');
    translated = translated.replace(regex, urdu);
  }

  return translated;
}
