import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TableContainer({
  children,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {children}
    </div>
  );
}