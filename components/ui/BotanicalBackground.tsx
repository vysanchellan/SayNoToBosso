interface BotanicalBackgroundProps {
  mode?: "dark" | "light"
}

export default function BotanicalBackground({ mode = "dark" }: BotanicalBackgroundProps) {
  const stroke = mode === "dark" ? "rgba(255,255,255,0.08)" : "hsla(142, 30%, 36%, 0.06)"

  return (
    <svg
      viewBox="0 0 1440 900"
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Leaf 1 — top left, 3-lobed */}
      <path
        d="M80 100 C120 40 220 60 260 120 C300 180 280 220 220 240 C160 260 100 240 80 200 C60 160 40 160 80 100Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        transform="rotate(15 170 170)"
      />
      {/* Leaf 2 — top right, monstera */}
      <path
        d="M1100 80 C1180 20 1320 60 1380 140 C1400 160 1400 200 1360 220 C1320 240 1260 200 1240 160 C1220 120 1180 100 1100 80Z M1200 120 Q1220 160 1240 180 M1280 100 Q1320 140 1340 180 M1160 150 Q1200 200 1220 240"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        transform="rotate(-20 1240 160)"
      />
      {/* Leaf 3 — bottom left, tall fern */}
      <path
        d="M100 700 C120 640 100 540 80 480 C60 420 80 380 120 400 C160 420 140 500 120 560 C100 620 140 680 100 700Z M80 500 Q60 520 40 510 M100 560 Q80 580 60 570 M90 620 Q70 640 50 630"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        transform="rotate(5 100 540)"
      />
      {/* Leaf 4 — centre right, wide rounded */}
      <path
        d="M900 400 C960 340 1060 360 1100 440 C1140 520 1080 580 1000 560 C920 540 880 480 900 400Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        transform="rotate(10 1000 480)"
      />
      {/* Leaf 5 — bottom right, curling frond */}
      <path
        d="M1250 800 C1280 740 1340 720 1380 760 C1420 800 1400 860 1360 880 C1320 900 1280 860 1250 800Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        transform="rotate(-10 1320 800)"
      />
      {/* Leaf 6 — mid-left small scatter */}
      <path
        d="M320 500 C340 460 380 440 400 460 C420 480 400 520 360 520 C340 520 300 540 320 500Z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        transform="rotate(25 360 480)"
      />
    </svg>
  )
}
