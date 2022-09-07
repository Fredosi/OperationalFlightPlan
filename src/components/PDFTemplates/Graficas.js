export const dataC172 = [
  ["X", "Y", "Z", "TO", { role: "annotation" }, "LDG", { role: "annotation" }],
  [35.45, 1500, null, null, "", null, ""],
  [35.45, 1940, null, null, "", null, ""],
  [38.5, 2300, null, null, "", null, ""],
  [47.65, 2300, null, null, "", null, ""],
  [47.65, 1500, null, null, "", null, ""],

  [40.95, null, 1500, null, "", null, ""],
  [40.95, null, 2000, null, "", null, ""],
  [36, null, 2000, null, "", null, ""],

  [42.5, null, null, 2000, "TO", null, ""],

  [44.5, null, null, null, "", 2000, "LDG"],
];

export const optionsC172 = {
  legend: "none",
  hAxis: {
    title: "AIRPLANE C.G. LOCATION - INCHES AFT. OF DATUM (STA 0.0)",
    viewWindow: { min: 34, max: 48 },
    gridlines: { count: 14, color: "#7d7d7d" },
    minorGridlines: { color: "white" },
    textStyle: {
      fontName: "Arial",
      //fontSize: automatic,
      bold: false,
      italic: false,
      color: "black",
    },
  },
  vAxis: {
    title: "LOADED AIRPLANE WEIGHT (POUNDS)",
    viewWindow: { min: 1500, max: 2400 },
    gridlines: { count: 9, color: "#7d7d7d" },
    minorGridlines: { count: 4, color: "grey" },
    textStyle: {
      fontName: "Arial",
      //fontSize: 11,
      bold: false,
      italic: false,
      color: "black",
    },
  },
  series: {
    0: { color: "black" },
    1: { color: "black", lineDashStyle: [10, 2] },
    2: { pointShape: "circle", pointSize: 10, color: "black" },
    3: { pointShape: "circle", pointSize: 10, color: "black" },
  },
};

export const dataPA28 = [
  ["X", "Y", "TO", { role: "annotation" }],
  [80, 1400, null, ""],
  [80, 1800, null, ""],
  [82, 2300, null, ""],
  [87.5, 2650, null, ""],
  [93, 2650, null, ""],
  [93, 1400, null, ""],

  [84.5, null, 2000, "TO"],
];

export const optionsPA28 = {
  legend: "none",
  hAxis: {
    title: "INCHES AFT. OF DATUM",
    viewWindow: { min: 78, max: 94 },
    gridlines: { count: 14, color: "#7d7d7d" },
    minorGridlines: { color: "grey" },
    textStyle: {
      fontName: "Arial",
      //fontSize: automatic,
      bold: false,
      italic: false,
      color: "black",
    },
  },
  vAxis: {
    title: "WEIGHT IN POUNDS",
    viewWindow: { min: 1400, max: 3000 },
    gridlines: { count: 9, color: "#7d7d7d" },
    minorGridlines: { count: 4, color: "grey" },
    textStyle: {
      fontName: "Arial",
      //fontSize: 11,
      bold: false,
      italic: false,
      color: "black",
    },
  },
  series: {
    0: { color: "black" },

    1: { pointShape: "circle", pointSize: 10, color: "black" },
  },
};

export const dataDA40 = [
  ["X", "Y", "TO", { role: "annotation" }],
  [2.4, 780, null, ""],
  [2.4, 980, null, ""],
  [2.46, 1150, null, ""],
  [2.5908, 1150, null, ""],
  [2.5908, 780, null, ""],
  [2.4, 780, null, ""],
  [2.4, 980, null, ""],
  [2.5908, 980, null, ""],
  [2.5908, 1150, null, ""],
  [2.55, 1150, null, ""],
  [2.55, 780, null, ""],

  [2.48, null, 1100, "TO"],
];

export const optionsDA40 = {
  legend: "none",
  hAxis: {
    title: "C.G. POS [m]",
    viewWindow: { min: 2.4, max: 2.6 },
    gridlines: { count: 4, color: "#7d7d7d" },
    minorGridlines: { color: "white" },
    textStyle: {
      fontName: "Arial",
      //fontSize: automatic,
      bold: false,
      italic: false,
      color: "black",
    },
  },
  vAxis: {
    title: "Flight Mass [kg]",
    viewWindow: { min: 750, max: 1150 },
    gridlines: { count: 9, color: "#7d7d7d" },
    minorGridlines: { count: 4, color: "white" },
    textStyle: {
      fontName: "Arial",
      //fontSize: 11,
      bold: false,
      italic: false,
      color: "black",
    },
  },
  series: {
    0: { color: "black" },
    1: { pointShape: "circle", pointSize: 10, color: "black" },
  },
};
