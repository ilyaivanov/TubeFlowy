import { header } from "./header";
import { cls, colors, css, div, fragment, spacings } from "./infra";
import { playerFooter } from "./player/playerFooter";
import { leftNavigationSidebar } from "./sidebar/leftSidebar";
import { searchResults } from "./searchResults/searchPage";
// import { renderTreeView } from "./treeView";
import { renderTreeView } from "./treeView2";

export const renderApp = () =>
  div(
    { className: cls.page },
    fragment([
      header(),
      renderTreeView(),
      searchResults(),
      leftNavigationSidebar(),
      playerFooter(),
    ])
  );

css.class(cls.page, {
  height: "100vh",
  width: "100vw",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateRows: "auto 1fr auto",
  gridTemplateAreas: `
      "header header header"
      "sidebar gallery rightSidebar"
      "player player player"`,
});

css.class(cls.rowsContainer, {
  gridArea: "gallery",
  overflowY: "overlay" as any,
  //used to position rowHighlight
  position: "relative",
  paddingLeft: spacings.rowsContainerLeftPadding,
  paddingRight: 8,
});

css.class(cls.rowsScrollContainer, {
  paddingBottom: `calc(100vh - ${
    spacings.rowHeight * 2.5 +
    spacings.playerFooterHeight +
    spacings.headerHeight
  }px)`,
  paddingTop: spacings.pageMarginTop,
  maxWidth: 700,
  margin: "0 auto",
});

css.selector("*", {
  boxSizing: "border-box",
});

css.tag("body", {
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  margin: 0,
});

css.selector(`.${cls.rowsContainer}::-webkit-scrollbar`, {
  width: 8,
});

css.selector(`.${cls.rowsContainer}::-webkit-scrollbar-thumb`, {
  backgroundColor: colors.mediumPrimary,
});
