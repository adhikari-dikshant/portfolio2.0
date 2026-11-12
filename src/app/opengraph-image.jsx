import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
    "Dikshant Singh Adhikari — Software Engineer – Frontend (UI/UX Design & Development)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFonts() {
    const ogFontsDir = join(process.cwd(), "public", "fonts", "og");

    const [bigShoulders, playfairItalic] = await Promise.all([
        readFile(join(ogFontsDir, "BigShouldersDisplay-Black.ttf")),
        readFile(join(ogFontsDir, "PlayfairDisplay-Italic.ttf")),
    ]);

    return [
        {
            name: "BigShoulders",
            data: bigShoulders,
            style: "normal",
            weight: 900,
        },
        {
            name: "Playfair",
            data: playfairItalic,
            style: "italic",
            weight: 400,
        },
    ];
}

export default async function Image() {
    const fonts = await loadFonts();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "#e3e3db",
                    color: "#1a1614",
                }}
            >
                {/* Soft warm atmosphere */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        backgroundImage:
                            "radial-gradient(ellipse 70% 55% at 12% 18%, rgba(255, 110, 20, 0.18) 0%, transparent 58%), radial-gradient(ellipse 55% 50% at 88% 82%, rgba(232, 232, 0, 0.16) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 72% 12%, rgba(61, 47, 169, 0.07) 0%, transparent 60%)",
                    }}
                />

                {/* Accent ribbon from TeamCards palette */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 14,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ flexGrow: 1, backgroundColor: "#3d2fa9" }} />
                    <div style={{ flexGrow: 1, backgroundColor: "#a92f78" }} />
                    <div style={{ flexGrow: 1, backgroundColor: "#ff3d33" }} />
                    <div style={{ flexGrow: 1, backgroundColor: "#785f47" }} />
                    <div style={{ flexGrow: 1, backgroundColor: "#2f72a9" }} />
                </div>

                {/* Cursor ball — site signature */}
                <div
                    style={{
                        position: "absolute",
                        top: 210,
                        right: 118,
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        border: "3px solid #ff6e14",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            width: 18,
                            height: 18,
                            borderRadius: 9,
                            backgroundColor: "#ff6e14",
                        }}
                    />
                </div>

                {/* Yellow orb */}
                <div
                    style={{
                        position: "absolute",
                        bottom: -80,
                        right: -40,
                        width: 280,
                        height: 280,
                        borderRadius: 140,
                        backgroundColor: "rgba(232, 232, 0, 0.22)",
                        display: "flex",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "100%",
                        padding: "52px 64px 48px 78px",
                    }}
                >
                    {/* Top bar */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 14,
                                    backgroundColor: "#1a1614",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 14,
                                }}
                            >
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: "#ff6e14",
                                    }}
                                />
                            </div>
                            <span
                                style={{
                                    fontFamily: "BigShoulders",
                                    fontSize: 22,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "#8c7e77",
                                }}
                            >
                                Portfolio 2026
                            </span>
                        </div>

                        <span
                            style={{
                                fontFamily: "BigShoulders",
                                fontSize: 24,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "#1a1614",
                            }}
                        >
                            dikshant.xyz
                        </span>
                    </div>

                    {/* Hero type */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 24,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-end",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "BigShoulders",
                                    fontSize: 92,
                                    fontWeight: 900,
                                    lineHeight: 0.85,
                                    letterSpacing: "-0.05em",
                                    textTransform: "uppercase",
                                    marginRight: 20,
                                }}
                            >
                                Software
                            </span>
                            <span
                                style={{
                                    fontFamily: "Playfair",
                                    fontStyle: "italic",
                                    fontSize: 56,
                                    fontWeight: 400,
                                    lineHeight: 1,
                                    marginBottom: 8,
                                    color: "#1a1614",
                                }}
                            >
                                engineer
                            </span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: 24,
                                marginTop: 8,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "Playfair",
                                    fontStyle: "italic",
                                    fontSize: 56,
                                    fontWeight: 400,
                                    lineHeight: 1,
                                    marginBottom: 8,
                                    marginRight: 20,
                                    color: "#ff6e14",
                                }}
                            >
                                frontend
                            </span>
                            <span
                                style={{
                                    fontFamily: "BigShoulders",
                                    fontSize: 92,
                                    fontWeight: 900,
                                    lineHeight: 0.85,
                                    letterSpacing: "-0.05em",
                                    textTransform: "uppercase",
                                }}
                            >
                                UI/UX
                            </span>
                        </div>
                    </div>

                    {/* Bottom identity */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            width: "100%",
                            borderTop: "2px solid rgba(26, 22, 20, 0.12)",
                            paddingTop: 28,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "BigShoulders",
                                    fontSize: 48,
                                    fontWeight: 900,
                                    lineHeight: 0.9,
                                    letterSpacing: "-0.04em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Dikshant Singh Adhikari
                            </span>
                            <span
                                style={{
                                    fontFamily: "Playfair",
                                    fontStyle: "italic",
                                    fontSize: 24,
                                    fontWeight: 400,
                                    color: "#8c7e77",
                                    marginTop: 10,
                                }}
                            >
                                Design & Development
                            </span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "12px 18px",
                                borderRadius: 24,
                                backgroundColor: "rgba(26, 22, 20, 0.06)",
                            }}
                        >
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: "#ff6e14",
                                    marginRight: 10,
                                }}
                            />
                            <span
                                style={{
                                    fontFamily: "BigShoulders",
                                    fontSize: 20,
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    color: "#1a1614",
                                }}
                            >
                                Udaipur, Rajasthan
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts,
        },
    );
}
