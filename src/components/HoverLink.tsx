import type { ReactNode } from "react";

/** Text that rolls up to an accented copy on hover. */
const HoverLink = ({ children }: { children: ReactNode }) => (
  <span className="hover-link">
    <span className="hover-link-in">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  </span>
);

export default HoverLink;
