type PressedOpacityProps = {
  pressed: boolean;
  opacity?: number;
};

const DEFAULT_OPACITY = 0.5;

export default function pressedOpacity({
  pressed,
  opacity = DEFAULT_OPACITY,
}: PressedOpacityProps) {
  return { opacity: pressed ? opacity : undefined };
}
