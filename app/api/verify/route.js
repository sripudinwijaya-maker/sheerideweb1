import { NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const form = await req.formData();
    const link = form.get("link");
    const file = form.get("file");

    if (!link || !file) {
      return NextResponse.json({ error: "Masukkan link & upload dokumen" }, { status: 400 });
    }

    const match = link.match(/verificationId=([A-Za-z0-9_-]+)/);
    if (!match) {
      return NextResponse.json({ error: "verificationId tidak ditemukan" }, { status: 400 });
    }

    const vid = match[1];

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const docRes = await axios.post(
      `https://my.sheerid.com/rest/v2/verification/${vid}/document`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );

    const uploadUrl = docRes.data.uploadUrl;

    await axios.put(uploadUrl, fileBuffer, {
      headers: {
        "Content-Type": file.type || "image/png",
      },
    });

    await axios.post(
      `https://my.sheerid.com/rest/v2/verification/${vid}/submit`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );

    const status = await axios.get(
      `https://my.sheerid.com/rest/v2/verification/${vid}`
    );

    return NextResponse.json({
      ok: true,
      verificationId: vid,
      result: status.data,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.toString() },
      { status: 500 }
    );
  }
}
