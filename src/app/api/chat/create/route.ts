import { NextResponse } from "next/server";

export async function POST() {
  try {

    const response = await fetch(
      "https://chat.enterprise-egy.com/chats/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("[Chat API] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Chat API] Error response:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("[Chat API] Success:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Chat API] Exception:", error);
    return NextResponse.json(
      {
        error: "Failed to create chat",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
