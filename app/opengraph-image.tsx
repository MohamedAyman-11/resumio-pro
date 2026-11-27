import { ImageResponse } from "next/og";

export const alt =
  "Resumio, a free resume builder with a live A4 preview and searchable PDF export";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 54,
          padding: "62px 72px",
          background: "#f8fafc",
          color: "#172033",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: 630,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                background: "#2563eb",
                color: "white",
                fontSize: 25,
                fontWeight: 700,
              }}
            >
              R
            </div>
            <div style={{ fontSize: 25, fontWeight: 700 }}>Resumio</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                color: "#2563eb",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              FREE RESUME BUILDER
            </div>
            <div
              style={{
                maxWidth: 610,
                fontSize: 60,
                lineHeight: 1.04,
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              A resume that gets to the point.
            </div>
            <div style={{ color: "#586174", fontSize: 22, lineHeight: 1.4 }}>
              Build a clear resume with a live A4 preview and searchable PDF export.
            </div>
          </div>
          <div style={{ color: "#586174", fontSize: 18, fontWeight: 600 }}>
            Free to use · No account needed
          </div>
        </div>
        <div
          style={{
            width: 360,
            height: 455,
            display: "flex",
            flexDirection: "column",
            padding: "38px 32px",
            border: "1px solid #dbe2ec",
            borderRadius: 18,
            background: "white",
            boxShadow: "0 20px 50px rgba(23,32,51,0.12)",
          }}
        >
          <div style={{ color: "#1d4ed8", fontSize: 23, fontWeight: 700 }}>
            MAYA CHEN
          </div>
          <div style={{ marginTop: 9, fontSize: 13, fontWeight: 600 }}>
            PRODUCT DESIGNER
          </div>
          <div style={{ marginTop: 11, color: "#2563eb", fontSize: 11 }}>
            maya.chen@example.com · Brooklyn, NY
          </div>
          <div style={{ height: 1, marginTop: 21, background: "#2563eb" }} />
          {["PROFILE", "EXPERIENCE", "SKILLS", "PROJECTS", "EDUCATION"].map(
            (section, index) => (
              <div
                key={section}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  marginTop: 20,
                }}
              >
                <div style={{ color: "#1d4ed8", fontSize: 13, fontWeight: 700 }}>
                  {section}
                </div>
                <div
                  style={{
                    height: 1,
                    background: "#dbe2ec",
                  }}
                />
                {index < 3 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <div style={{ height: 5, borderRadius: 3, background: "#d6dbe3" }} />
                    <div style={{ height: 5, width: "82%", borderRadius: 3, background: "#e4e8ee" }} />
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
