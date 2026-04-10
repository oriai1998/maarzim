import type { ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Bezel({ children, className, style }: Props) {
  return (
    <div className={`bezel ${className ?? ""}`} style={style}>
      <div className="bezel-inner">{children}</div>
    </div>
  );
}
