export const PRESET_VIEWS = [
  { label: "ด้านหน้า", icon: "📱", rotation: [0, 0, 0] },
  { label: "ด้านหลัง", icon: "🔙", rotation: [0, Math.PI, 0] },
  { label: "ด้านซ้าย", icon: "◀", rotation: [0, -Math.PI / 2, 0] },
  { label: "ด้านขวา", icon: "▶", rotation: [0, Math.PI / 2, 0] },
  { label: "มุมเฉียง", icon: "↗", rotation: [-0.3, Math.PI / 4, 0] },
] as const;
