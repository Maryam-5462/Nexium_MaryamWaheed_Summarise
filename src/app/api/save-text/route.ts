import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

export async function POST(req: Request) {
  const { url, fullText } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("nexium-db");
    const collection = db.collection("blogs");

    const result = await collection.insertOne({
      url,
      fullText,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
