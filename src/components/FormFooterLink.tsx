import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type FormFooterLinkProps = {
  questionKey: string;
  linkTextKey: string;
  linkTo: string;
};

export default function FormFooterLink({
  questionKey,
  linkTextKey,
  linkTo,
}: FormFooterLinkProps) {
  const { t } = useTranslation("common");

  return (
    <p className="text-[16px] text-light-text text-center mt-[25px]">
      {t(questionKey)}{" "}
      <Link to={linkTo} className="font-bold cursor-pointer underline">
        {t(linkTextKey)}
      </Link>
    </p>
  );
}
