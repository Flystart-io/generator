const colors = {
  red: '\u001b[31m',
  blue: '\u001b[34m',
  purple: '\u001b[35m',
  italic: '\u001b[3m',
  reset: '\u001b[0m',
};

const color = (text: string, color: keyof typeof colors) => `${colors[color]}${text}${colors.reset}`;

type ColorKeys = keyof typeof colors;

export type ColorType = typeof color & Record<ColorKeys, (text: string) => string>;

(Object.keys(colors) as ColorKeys[]).forEach((colorName) => {
  color[colorName] = (text: string) => color(text, colorName);
});

export default color as ColorType;
