export const DETAIL_PRODUCT_COLOR_LABELS = {
  black: "สีดำ",
  white: "สีขาว",
  glod: "สีทอง",
  orange: "สีส้ม",
  blue: "สีน้ำเงิน",
  gray: "สีเขาเข้ม",
  silver: "สีเทาอ่อน",
} as const;

export type DetailProductColorKey = keyof typeof DETAIL_PRODUCT_COLOR_LABELS;

export const DETAIL_PRODUCT_COLOR_KEYS_BY_LABEL = {
  ...Object.fromEntries(
    Object.entries(DETAIL_PRODUCT_COLOR_LABELS).map(([colorKey, label]) => [
      label,
      colorKey,
    ])
  ),
  แบล็ก: "black",
  โกลด์: "glod",
  เกรย์: "gray",
  บลู: "blue",
  ซิลเวอร์: "silver",
  โซลาร์ออเรนจ์: "orange",
  มิดไนต์บลู: "blue",
  เพิร์ลไวต์: "white",
  กราไฟต์แบล็ก: "black",
} as Record<string, DetailProductColorKey>;

export function getDetailProductColorLabel(colorKey: string): string {
  return (
    DETAIL_PRODUCT_COLOR_LABELS[colorKey as DetailProductColorKey] || colorKey
  );
}

export function getDetailProductColorKeyByLabel(
  colorLabel: string
): DetailProductColorKey | undefined {
  return DETAIL_PRODUCT_COLOR_KEYS_BY_LABEL[colorLabel];
}
