import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ChooseYourPath() {
  const { t } = useTranslation("common");
  return (
    <div
      className="w-full mt-[15px] pt-[40px] border-t border-gray-200"
      id="choose-your-path"
    >
      {/* Styles moved to src/index.css */}

      <h2 className="text-[clamp(30px,5vw,24px)] font-bold text-primary text-center mb-4">
        {t("exploreOurExpertCategories")}
      </h2>
      <p className="text-[#4F5B64] text-center mb-6">
        {t("connectWithVerified")}
      </p>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
        <Link
          to="/wellness-experts"
          className="mcp-cat-card group bg-white rounded-[16px] p-2.5 sm:p-5 shadow-md border border-gray-100 hover:scale-[1.02] transition-transform text-left max-[500px]:text-center"
        >
          <div className="mcp-cat-thumb mcp-thumb--wellness mcp-thumb--hero-photo w-full aspect-100/70 bg-slate-200 rounded-[10px] flex items-center justify-center mb-3 sm:mb-4">
            <img
              src="/images/hero/hero-wellness.jpg"
              alt=""
              className="mcp-cat-hero-photo"
              loading="lazy"
              decoding="async"
            />
            <span className="mcp-cat-layer mcp-layer-1" />
            <span className="mcp-cat-layer mcp-layer-2" />
            <span className="mcp-cat-layer mcp-ring" />
            <span className="mcp-wellness-scene" aria-hidden="true">
              <span className="mcp-wellness-ecg" />
              <span className="mcp-wellness-ripple" />
              <span className="mcp-wellness-dots" />
              <span className="mcp-wellness-breathe" />
              <span className="mcp-wellness-leaf" />
            </span>
          </div>
          <h3 className="font-bold text-primary text-[clamp(14px,2vw,18px)] mb-1">
            {t("wellness")}
          </h3>
          <p className="text-[#4F5B64] text-[clamp(12px,1.5vw,16px)]">
            {t("mentalHealthAssessment")}
          </p>
        </Link>

        <Link
          to="/education-experts"
          className="mcp-cat-card group bg-white rounded-[16px] p-2.5 sm:p-5 shadow-md border border-gray-100 hover:scale-[1.02] transition-transform text-left max-[500px]:text-center"
        >
          <div className="mcp-cat-thumb mcp-thumb--education mcp-thumb--hero-photo w-full aspect-100/70 bg-slate-200 rounded-[10px] flex items-center justify-center mb-3 sm:mb-4">
            <img
              src="/images/hero/hero-education.jpg"
              alt=""
              className="mcp-cat-hero-photo"
              loading="lazy"
              decoding="async"
            />
            <span className="mcp-cat-layer mcp-layer-1" />
            <span className="mcp-cat-layer mcp-layer-2" />
            <span className="mcp-cat-layer mcp-fold" />
            <span className="mcp-edu-scene" aria-hidden="true">
              <span className="mcp-edu-orbit" />
              <span className="mcp-edu-orbit-items">
                <span className="mcp-edu-badge mcp-edu-badge-pi" />
                <span className="mcp-edu-icon mcp-edu-flask" />
              </span>
              <span className="mcp-edu-chip mcp-edu-chip-a" />
              <span className="mcp-edu-chip mcp-edu-chip-sigma" />
            </span>
          </div>
          <h3 className="font-bold text-primary text-[clamp(14px,2vw,18px)] mb-1">
            {t("education")}
          </h3>
          <p className="text-[#4F5B64] text-[clamp(12px,1.5vw,16px)]">
            {t("careerPlanning")}
          </p>
        </Link>

        <Link
          to="/finance-experts"
          className="mcp-cat-card group bg-white rounded-[16px] p-2.5 sm:p-5 shadow-md border border-gray-100 hover:scale-[1.02] transition-transform text-left max-[500px]:text-center"
        >
          <div className="mcp-cat-thumb mcp-thumb--finance mcp-thumb--hero-photo w-full aspect-100/70 bg-slate-200 rounded-[10px] flex items-center justify-center mb-3 sm:mb-4">
            <img
              src="/images/hero/hero-finance.jpg"
              alt=""
              className="mcp-cat-hero-photo"
              loading="lazy"
              decoding="async"
            />
            <span className="mcp-cat-layer mcp-layer-1" />
            <span className="mcp-cat-layer mcp-layer-2" />
            <span className="mcp-fin-bars" aria-hidden="true">
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "42%",
                    "--delay": "-0.0s",
                    "--breath": "3.2s",
                    "--breathDelay": "0.0s",
                  } as React.CSSProperties
                }
              />
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "70%",
                    "--delay": "-0.7s",
                    "--breath": "3.8s",
                    "--breathDelay": "0.15s",
                  } as React.CSSProperties
                }
              />
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "55%",
                    "--delay": "-1.4s",
                    "--breath": "3.4s",
                    "--breathDelay": "0.35s",
                  } as React.CSSProperties
                }
              />
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "82%",
                    "--delay": "-2.1s",
                    "--breath": "4.1s",
                    "--breathDelay": "0.25s",
                  } as React.CSSProperties
                }
              />
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "50%",
                    "--delay": "-2.8s",
                    "--breath": "3.6s",
                    "--breathDelay": "0.1s",
                  } as React.CSSProperties
                }
              />
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "64%",
                    "--delay": "-3.5s",
                    "--breath": "4.0s",
                    "--breathDelay": "0.4s",
                  } as React.CSSProperties
                }
              />
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "38%",
                    "--delay": "-4.2s",
                    "--breath": "3.1s",
                    "--breathDelay": "0.2s",
                  } as React.CSSProperties
                }
              />
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "76%",
                    "--delay": "-4.9s",
                    "--breath": "4.2s",
                    "--breathDelay": "0.3s",
                  } as React.CSSProperties
                }
              />
              <span
                className="mcp-fin-bar"
                style={
                  {
                    "--h": "46%",
                    "--delay": "-5.6s",
                    "--breath": "3.3s",
                    "--breathDelay": "0.05s",
                  } as React.CSSProperties
                }
              />
            </span>
          </div>
          <h3 className="font-bold text-primary text-[clamp(14px,2vw,18px)] mb-1">
            {t("finance")}
          </h3>
          <p className="text-[#4F5B64] text-[clamp(12px,1.5vw,16px)]">
            {t("financialPlanning")}
          </p>
        </Link>
      </div>
    </div>
  );
}
