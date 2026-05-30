import {
  Apple,
  Brain,
  Briefcase,
  Compass,
  Flower2,
  GraduationCap,
  Heart,
  Receipt,
  Wallet,
} from "lucide-react";
import type { AssessmentIconKey } from "./constants/assessmentCatalog";

const iconProps = { style: { width: "100%", height: "100%" } };

export function renderAssessmentIcon(iconKey: AssessmentIconKey) {
  switch (iconKey) {
    case "apple":
      return <Apple {...iconProps} />;
    case "heart":
      return <Heart {...iconProps} />;
    case "flower":
      return <Flower2 {...iconProps} />;
    case "compass":
      return <Compass {...iconProps} />;
    case "briefcase":
      return <Briefcase {...iconProps} />;
    case "graduation":
      return <GraduationCap {...iconProps} />;
    case "receipt":
      return <Receipt {...iconProps} />;
    case "wallet":
      return <Wallet {...iconProps} />;
    case "brain":
    default:
      return <Brain {...iconProps} />;
  }
}
