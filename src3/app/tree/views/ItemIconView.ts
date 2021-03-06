import {
  cls,
  style,
  svg,
  Styles,
  ClassName,
  dom,
  css,
  cssVar,
} from "../../../browser";
import { spacings, timings } from "../../../designSystem";
import { ItemModel, ReadonlyItemModel } from "../../../model/ItemModel";
import { App } from "../../App";

const iconSize = spacings.outerRadius * 2;
const outerRadius = spacings.outerRadius;
const innerRadius = spacings.innerRadius;
export type ItemIconEvents = {
  onFocus: EmptyAction;
};
export default class ItemIconView {
  public svg: SVGElement;

  constructor(
    private model: ReadonlyItemModel,
    private events: ItemIconEvents
  ) {
    this.svg = this.view(model);
    this.update(model);
  }

  update = (item: ReadonlyItemModel) => {
    const isEmpty = item.isEmpty();
    const isOpen = item.get("isOpen");
    const type = item.get("title");
    dom.assignClassMap(this.svg, {
      [cls.rowIconEmpty]: !item.isMedia() && isEmpty,
      [cls.rowIconOpen]: !isEmpty && isOpen,
      [cls.rowIconClosed]: !isEmpty && !isOpen,
      // [cls.focusCircleSvgPlaying]: player.isPlayingItem(this.item),
      [cls.rowIconClosedContainer]:
        !isOpen && item.isMedia() && !item.isEmpty(),
    });
  };

  private view(item: ReadonlyItemModel) {
    const type = item.get("type");
    const image = item.getImageSrc();
    const isMedia = item.isMedia();

    if (item.get("title") === "Product Visual Design") {
      console.log(item.get("type"));
    }
    return svg.svg({
      className: cls.rowIcon,
      classMap: {
        [cls.rowIconMedia]: isMedia,
        [cls.rowIconMediaRound]: type == "YTchannel",
        [cls.rowIconMediaSquare]: type == "YTplaylist" || type == "YTvideo",
      },
      style: { backgroundImage: isMedia ? `url(${image})` : undefined },
      viewBox: `0 0 ${iconSize} ${iconSize}`,
      children: [
        this.createCircleAtCenter(cls.rowCircleEmpty, innerRadius),
        !isMedia
          ? this.createCircleAtCenter(cls.rowCircleOuter, outerRadius)
          : undefined,
        !isMedia
          ? this.createCircleAtCenter(cls.rowCircleInner, innerRadius)
          : undefined,
        ,
      ],
      onClick: (e) => {
        if (e.ctrlKey) this.events.onFocus();
        else App.instance.player.play(item);
      },
      onMouseDown: (e) => {
        App.instance.dnd.onItemMouseDown(this.model as ItemModel, e);
      },
    });
  }

  createCircleAtCenter = (className: ClassName, r: number) =>
    svg.circle({ cx: iconSize / 2, cy: iconSize / 2, className, r });
}

const uniformShadow = (blur: number, spread: number, color: string) =>
  `0 0 ${blur}px ${spread}px ${color}`;

const insetBlack = (spread: number, alpha: number) =>
  `inset 0 0 0 ${spread}px rgba(0,0,0,${alpha.toFixed(2)})`;

style.class(cls.rowIcon, {
  marginRight: spacings.spaceBetweenCircleAndText,
  //   cursor: "pointer",
  width: spacings.outerRadius * 2,
  minWidth: spacings.outerRadius * 2,
  height: spacings.outerRadius * 2,
  //   backgroundSize: "cover",
  //   backgroundPosition: `50% 50%`,
  color: css.useVar(cssVar.ambient),
  backgroundSize: "cover",
  backgroundPosition: `50% 50%`,
});

style.class(cls.rowCircleEmpty, {
  fill: "transparent",
  strokeWidth: 1.4,
  stroke: css.useVar(cssVar.accent),
  transition: css.transition({
    opacity: timings.expandCollapseDuration,
    stroke: timings.themeSwitchDuration,
  }),
});

style.class(cls.rowCircleOuter, {
  fill: css.useVar(cssVar.ambient),
  transition: css.transition({
    opacity: timings.expandCollapseDuration,
    fill: timings.themeSwitchDuration,
  }),
});

style.class(cls.rowCircleInner, {
  fill: css.useVar(cssVar.accent),
  transition: css.transition({
    opacity: timings.expandCollapseDuration,
    fill: timings.themeSwitchDuration,
  }),
});
style.class(cls.rowIconClosedContainer, {
  boxShadow: uniformShadow(4, 2, css.useVar(cssVar.shadowMain)),
});
style.class(cls.rowIconMediaRound, {
  borderRadius: "50%",
});

style.class(cls.rowIconMediaSquare, {
  borderRadius: 4,
});

const opaque: Styles = { opacity: 1 };
const transparent: Styles = { opacity: 0 };

style.class(cls.rowCircleEmpty, transparent);
style.class(cls.rowCircleInner, transparent);
style.class(cls.rowCircleOuter, transparent);

style.parentChild(cls.rowIconEmpty, cls.rowCircleEmpty, opaque);
style.parentChild(cls.rowIconOpen, cls.rowCircleInner, opaque);
style.parentChild(cls.rowIconClosed, cls.rowCircleInner, opaque);
style.parentChild(cls.rowIconClosed, cls.rowCircleOuter, opaque);
