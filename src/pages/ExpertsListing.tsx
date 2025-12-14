import { lazy } from "react";

const ExpertsContent = lazy(() => import("./ExpertsContent"));

export default function ExpertsListing() {
  return <ExpertsContent />;
}
