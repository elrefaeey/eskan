import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://chat.enterprise-egy.com/info/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log("[Chat API] Info response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Chat API] Info error response:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("[Chat API] Info success:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Chat API] Info exception:", error);
    return NextResponse.json(
      {
        error: "Failed to submit chat info",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
