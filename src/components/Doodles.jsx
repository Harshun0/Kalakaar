// Hand-drawn accent marks — sketchy, imperfect strokes that break up the flat
// black/burgundy/white palette so it doesn't read as a stock template.

export function SketchUnderline({ className = '' }) {
  return (
    <svg
      viewBox="0 0 220 20"
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 13.5C40 7 90 4 130 9C160 12.5 190 6 217 11.5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SketchCircle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 140 70"
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M70 4C32 2 5 16 6 36C7 56 38 66 71 65C104 64 134 53 133 33C132 14 100 3 68 5"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SketchArrow({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 70"
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M6 8C30 20 58 38 88 56"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M62 50C72 52 80 54 90 57C87 48 85 40 83 30"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SketchStar({ className = '' }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M30 4L35 25L56 30L35 35L30 56L25 35L4 30L25 25L30 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
