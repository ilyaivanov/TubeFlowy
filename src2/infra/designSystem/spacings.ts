const borderWidth = 2;
const TREE_MAX_WIDTH = 700;

const outerRadius = 16;
const innerRadius = 6;
const chevronSize = 16;
const borderSize = 2;
const rowVecticalPadding = 4;

export const spacings = {
  borderWidth,
  TREE_MAX_WIDTH,

  outerRadius,
  imageSize: outerRadius * 2,
  rowHeight: outerRadius * 2 + rowVecticalPadding * 2,
  chevronSize,
  innerRadius,
  borderSize,
  rowLeftPadding: chevronSize / 2,
  spacePerLevel: chevronSize + outerRadius - borderSize / 2 + 5,
  negativeMarginForRowAtZeroLevel: 1000,
  rowVecticalPadding,
  spaceBetweenCircleAndText: 8,
  headerHeight: 48,
  bodyScrollWidth: 6,
  pageFontSize: 16,
  pageTitleFontSize: 23,
  pageMarginTop: 20,
  documentWidth: 700,
  rowsContainerLeftPadding: 20,
  playerFooterHeight: 49,

  //CARDS
  cardHeight: 48,
  cardPadding: 14,
  cardWidth: 280,
  cardTextPadding: 4,
  cardTextBottomPadding: 2,
};
