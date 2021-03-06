const outerRadius = 16;
const innerRadius = 6;
const chevronSize = 16;
const borderSize = 2;
const rowVecticalPadding = 4;

export const spacings = {
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

const globalCoef = 1;

export const timings = {
  selectionMove: 100 * globalCoef,
  itemExpandCollapseDuration: 200 * globalCoef,
};

export const colors = {
  superLight: "rgba(0,0,0,0.03)",
  lightPrimary: "#DCE0E2",
  mediumPrimary: "#B8BCBF",
  darkPrimary: "#4C5155",
  buttonHover: "#ECEEF0",
  border: "#ECEEF0",
  scrollBar: "rgb(42, 49, 53)",
};
