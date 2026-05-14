import { getDetailProductColorKeyByLabel } from "./product-detail-colors.constants";
import { MODEL_FOLDER_MAP } from "./product-showcase.constants";

type DetailProductImageItem = {
  productId: string;
  color: string;
  image: string;
};

export function getRearFrontProductImageSrc(
  item: DetailProductImageItem
): string {
  const modelFolder = MODEL_FOLDER_MAP[item.productId];
  const colorKey = getDetailProductColorKeyByLabel(item.color);

  if (!modelFolder || !colorKey) {
    return item.image;
  }

  return `/detail-products/rear-front/${modelFolder}/${colorKey}.webp`;
}
