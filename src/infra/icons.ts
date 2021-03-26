import { ElementProps } from "./dom";
import { svg, path } from "./svg";

export const chevron = (props: ElementProps): SVGSVGElement =>
  svg(
    { ...props, viewBox: "0 0 256 512" },
    path({
      d:
        "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z",
      fill: "currentColor",
    })
  );

export const lightChevron = (props: ElementProps): SVGSVGElement =>
  svg(
    { ...props, viewBox: "0 0 5 8", fill: "none" },
    path({
      d: "M0 0 L4 4 L0 8",
      stroke: "currentColor",
      strokeLinecap: "round",
    })
  );

export const home = (props: ElementProps): SVGSVGElement =>
  svg(
    { ...props, viewBox: "0 0 576 512" },
    path({
      d:
        "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z",
      fill: "currentColor",
    })
  );

export const play = (props: ElementProps): SVGSVGElement =>
  svg(
    { ...props, viewBox: "0 0 448 512" },
    path({
      d:
        "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z",
      fill: "currentColor",
    })
  );

export const pause = (props: ElementProps): SVGSVGElement =>
  svg(
    { ...props, viewBox: "0 0 448 512" },
    path({
      d:
        "M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z",
      fill: "currentColor",
    })
  );

export const search = (props: ElementProps): SVGSVGElement =>
  svg(
    { ...props, viewBox: "0 0 512 512" },
    path({
      d:
        "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z",
      fill: "currentColor",
    })
  );
