import { Link } from "react-router-dom";

export interface BackLink {
  to: string;
  label: string;
}

export function BackLink({ to, label }: BackLink) {
  return (
    <Link className="text-sm text-indigo-600 hover:underline" to={to}>
      ← {label}
    </Link>
  );
}
