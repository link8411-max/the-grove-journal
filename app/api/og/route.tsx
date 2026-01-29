import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "The Grove Journal";
  const category = searchParams.get("category") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#fafaf9",
          padding: "60px 80px",
        }}
      >
        {/* Top decorative line */}
        <div
          style={{
            display: "flex",
            width: 48,
            height: 1,
            backgroundColor: "#d6d3d1",
            marginBottom: 32,
          }}
        />

        {/* Category */}
        {category && (
          <div
            style={{
              display: "flex",
              fontSize: 14,
              color: "#a8a29e",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {category}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontWeight: 600,
            color: "#1c1917",
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: "900px",
            fontFamily: "Georgia, serif",
          }}
        >
          {title}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 32,
              height: 1,
              backgroundColor: "#d6d3d1",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 12,
              color: "#a8a29e",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            The Grove Journal
          </div>
          <div
            style={{
              display: "flex",
              width: 32,
              height: 1,
              backgroundColor: "#d6d3d1",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
