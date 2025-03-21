type PressedBgColorProps = {
  pressed: boolean;
  backgroundColor?: string;
};

const DEFAULT_BG_COLOR = "lightgray";

export default function pressedBgColor({
  pressed,
  backgroundColor = DEFAULT_BG_COLOR,
}: PressedBgColorProps) {
  return { backgroundColor: pressed ? backgroundColor : undefined };
}
