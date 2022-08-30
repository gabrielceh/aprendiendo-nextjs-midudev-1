export const addOpacityToColor = (color, opacity) => {
  // pasamos la opacidad a hexadecimal
  const opacityHex = Math.round(opacity * 255).toString(16);

  return `${color}${opacityHex}`;
};
