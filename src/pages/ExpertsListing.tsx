import { lazy } from "react";
import useScrollToTop from "../hooks/useScrollToTop";

const ExpertsContent = lazy(() => import("./ExpertsContent"));

export default function ExpertsListing() {
  useScrollToTop();
  return <ExpertsContent />;
}
