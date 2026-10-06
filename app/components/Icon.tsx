import type { ReactNode } from "react";

export type IconName =
  | "home" | "history" | "target" | "calc" | "eye" | "eyeOff" | "plane" | "plus" | "minus"
  | "close" | "bank" | "cash" | "wallet" | "coffee" | "fuel" | "food" | "car" | "spark"
  | "check" | "copy" | "lock" | "reset" | "shield" | "userOff" | "fingerprint" | "backup"
  | "server" | "users" | "phone" | "flame" | "calendar" | "pie" | "trend" | "receipt" | "swap"
  | "clock" | "bell" | "chevronLeft" | "chevronRight" | "trophy" | "heart" | "backspace" | "file"
  | "palette" | "bulb" | "card" | "arrowRight" | "bag" | "piggy" | "trash";

// Satu keluarga ikon garis (grid 24, stroke 1.8) supaya konsisten di seluruh situs.
const PATHS: Record<IconName, ReactNode> = {
  home: (<><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h13V10" /><path d="M10 19.5v-5h4v5" /></>),
  history: (<><path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" /><path d="M3.5 4.5v4h4" /><path d="M12 7.5V12l3 2" /></>),
  target: (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></>),
  calc: (<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8.5 7.5h7" /><path d="M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" /></>),
  eye: (<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></>),
  eyeOff: (<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /><path d="M4 4l16 16" /></>),
  plane: (<path d="M12 3c.8 0 1.3.7 1.3 1.5V9l7.2 4.3v2l-7.2-2.2v3.6l2 1.5V20L12 19l-3.3 1V17.2l2-1.5v-3.6l-7.2 2.2v-2L10.7 9V4.5C10.7 3.7 11.2 3 12 3Z" />),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  bank: (<><path d="M3 9.5 12 4l9 5.5" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" /><path d="M3 20h18" /></>),
  cash: (<><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9.5v.01M18 14.5v.01" /></>),
  wallet: (<><rect x="7" y="2.5" width="10" height="19" rx="2.2" /><path d="M11 18.5h2" /></>),
  coffee: (<><path d="M4.5 9h11v5.5a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4V9Z" /><path d="M15.5 10.5h1.5a2.2 2.2 0 0 1 0 4.4h-1.5" /><path d="M8 3.5v2M12 3.5v2" /></>),
  fuel: (<><path d="M5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 14 5v15.5" /><path d="M3.5 20.5h12" /><path d="M14 9h2a2 2 0 0 1 2 2v5.5a1.5 1.5 0 0 0 3 0V9l-2.5-2.5" /><path d="M7.5 7.5h4" /></>),
  food: (<><path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3" /><path d="M7 11v10" /><path d="M17 21V3c-2.2 1.2-3.5 3.6-3.5 6.5V13H17" /></>),
  car: (<><path d="M4.5 16.5V12l2-5.5h11l2 5.5v4.5" /><path d="M3.5 12h17" /><path d="M4.5 16.5v2.5h3v-2.5M16.5 16.5v2.5h3v-2.5" /></>),
  spark: <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  copy: (<><rect x="8.5" y="8.5" width="12" height="12" rx="2" /><path d="M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" /></>),
  lock: (<><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>),
  reset: (<><path d="M4 12a8 8 0 1 0 2.4-5.7" /><path d="M4 4.5v4.5h4.5" /></>),
  shield: <path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6L12 3Z" />,
  userOff: (<><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.5-3.5 3.3-5.5 7-5.5s6.5 2 7 5.5" /><path d="M4 4l16 16" /></>),
  fingerprint: (<><path d="M6 11a6 6 0 0 1 12 0v1.5" /><path d="M9 20c-.6-1.5-1-3.2-1-5V11a4 4 0 0 1 8 0v4c0 1.5.4 2.8 1 4" /><path d="M12 11v4c0 1.8.5 3.5 1.3 5" /></>),
  backup: (<><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" /><path d="M4.5 19.5h15" /></>),
  server: (<><rect x="3.5" y="4" width="17" height="6.5" rx="1.5" /><rect x="3.5" y="13.5" width="17" height="6.5" rx="1.5" /><path d="M7 7.25h.01M7 16.75h.01" /></>),
  users: (<><circle cx="9" cy="8.5" r="3.2" /><path d="M2.8 20c.4-3.3 3-5.2 6.2-5.2s5.8 1.9 6.2 5.2" /><path d="M16 5.6a3 3 0 0 1 0 5.8M18.5 14.8c1.7.6 2.6 2.2 2.8 4.2" /></>),
  phone: (<><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></>),
  flame: <path d="M12 3c.5 3-1.5 4.5-3 6.5-1.3 1.8-2 3.3-2 5.2a5 5 0 0 0 10 0c0-1.7-.7-3-1.8-4.2.1 1.2-.4 2.2-1.4 2.7.6-3.2-.4-6.5-1.8-10.2Z" />,
  calendar: (<><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  pie: (<><path d="M12 3.5v8.5h8.5A8.5 8.5 0 0 0 12 3.5Z" /><path d="M10.5 5A8.5 8.5 0 1 0 19 13.5" /></>),
  trend: (<><path d="M3.5 17 9.5 11l4 4 7-8" /><path d="M15 7h5.5v5.5" /></>),
  receipt: (<><path d="M6 3.5h12v17l-2.2-1.6L13.6 20.5 12 19l-1.6 1.5-2.2-1.6L6 20.5v-17Z" /><path d="M9 8h6M9 12h6" /></>),
  swap: (<><path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5" /></>),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  bell: (<><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2H4.5l1.5-2Z" /><path d="M10 20.5a2.2 2.2 0 0 0 4 0" /></>),
  chevronLeft: <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  chevronRight: <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  trophy: (<><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H4.5v1.5A3 3 0 0 0 8 10.5M16 6h3.5v1.5a3 3 0 0 1-3.5 3" /><path d="M12 13v4M8.5 20.5h7M9.5 17h5" /></>),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />,
  backspace: (<><path d="M9 6h10.5v12H9l-5.5-6L9 6Z" /><path d="m12.5 9.5 4 5M16.5 9.5l-4 5" /></>),
  file: (<><path d="M6.5 3.5h7l4 4v13h-11v-17Z" /><path d="M13.5 3.5v4h4M9.5 13h5M9.5 16.5h5" /></>),
  palette: (<><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.9 2-1.8 0-1.2-1-1.5-1-2.7 0-1 .8-1.5 1.8-1.5H17a3.5 3.5 0 0 0 3.5-3.5C20.5 6.6 16.7 3.5 12 3.5Z" /><path d="M7.5 11v.01M10 7.8v.01M14.2 7.8v.01" /></>),
  bulb: (<><path d="M9 17.5h6M10 20.5h4" /><path d="M12 3.5a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3.5Z" /></>),
  card: (<><rect x="2.5" y="5.5" width="19" height="13" rx="2" /><path d="M2.5 10h19M6 15h4" /></>),
  arrowRight: <path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5" />,
  bag: (<><path d="M5.5 8h13l-1 12.5h-11L5.5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>),
  piggy: (<><path d="M5 12.5c0-3 3-5 7-5s6.5 1.8 7 4.2l1.5.8v3l-1.8.5c-.5 1.3-1.4 2.3-2.7 2.8V21h-2.5v-1.5h-3V21H8.5v-2.2C6.4 18 5 15.8 5 12.5Z" /><path d="M16 11.2v.01M9 7.5c0-1.6.8-2.7 2-3" /></>),
  trash: (<><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" /><path d="M10 11v6M14 11v6" /></>),
};

export default function Icon({
  name,
  className,
  size = 16,
  strokeWidth = 1.8,
}: {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
