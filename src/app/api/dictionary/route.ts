import { NextRequest, NextResponse } from "next/server";
import { getDictionary } from "@/lib/dictionary";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const locale = url.searchParams.get("locale");

  if (locale && (locale === "en" || locale === "de")) {
    try {
      const dictionaryData = await getDictionary(locale);

      return new NextResponse(JSON.stringify(dictionaryData), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "Fehler beim Laden des Wörterbuchs" }),
        { status: 500 },
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Ungültiger Locale-Parameter" }),
      { status: 400 },
    );
  }
}
