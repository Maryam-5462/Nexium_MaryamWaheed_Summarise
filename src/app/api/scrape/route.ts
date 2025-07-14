import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  //  LOG the incoming URL
  console.log(" Scraping URL:", url);

  if (!url) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract and join all <p> text content
    const paragraphs = $('p')
      .map((_, el) => $(el).text())
      .get()
      .join(' ');

    //  LOG a preview of the scraped content
    console.log(" Scraped content preview:", paragraphs.slice(0, 200));

    return NextResponse.json({ content: paragraphs });
  } catch (error) {
    //  LOG the error if scraping fails
    console.error(" Scraping failed:", error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
