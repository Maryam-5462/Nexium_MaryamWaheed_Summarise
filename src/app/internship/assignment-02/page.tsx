'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { translateToUrdu } from './utils/translateToUrdu';
import { supabase } from "@/lib/supabase";

export default function BlogSummariserPage() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [translated, setTranslated] = useState('');

 const handleSummarise = async () => {
  if (!url) return;

  const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
  const data = await res.json();

  const text = data.content || '';
  const fakeSummary = text.split('.').slice(0, 2).join('.') + '.';
  const urduTranslated = translateToUrdu(fakeSummary);

  setSummary(fakeSummary);
  setTranslated(urduTranslated);

  //  Save summary to Supabase
  const { error } = await supabase.from('summaries').insert([
  { url, summary: fakeSummary },
]);

if (error) {
  console.error(" Supabase Insert Error:", error.message);
} else {
  console.log("Summary saved to Supabase");
}


  //  Save full text to MongoDB
  await fetch("/api/save-text", {
    method: "POST",
    body: JSON.stringify({
      url,
      fullText: text, 
    }),
  });
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Blog Summariser
        </h1>

        <Card className="bg-gray-900 border border-gray-700 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <Input
              type="text"
              placeholder="Enter blog URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
            />
            <Button onClick={handleSummarise} className="w-full bg-purple-600 hover:bg-purple-700">
              Summarise Blog
            </Button>
          </CardContent>
        </Card>

        {summary && (
          <Card className="bg-gray-800 border border-gray-700 shadow-md">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-semibold text-pink-400">Summary</h2>
              <p className="text-gray-100">{summary}</p>
            </CardContent>
          </Card>
        )}

        {translated && (
          <Card className="bg-gray-800 border border-gray-700 shadow-md">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-semibold text-green-400">Urdu Translation</h2>
              <p className="text-gray-100 font-notoUrdu text-right leading-relaxed">
                {translated}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
