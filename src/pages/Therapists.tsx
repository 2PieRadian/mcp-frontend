import { lazy } from "react";

const TherapistsContent = lazy(() => import("./TherapistsContent"));

export default function Therapists() {
  return <TherapistsContent />;
}
