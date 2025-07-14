import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Get all <p> tags
    const paragraphs = $('p')
      .map((_, el) => $(el).text())
      .get()
      .join(' ');

    return NextResponse.json({ content: paragraphs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
