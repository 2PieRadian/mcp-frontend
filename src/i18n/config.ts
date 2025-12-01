import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enCommon from "../locales/en/common.json";
import enNavigation from "../locales/en/navigation.json";
import enExperts from "../locales/en/experts.json";
import enQuiz from "../locales/en/quiz.json";
import enSectors from "../locales/en/sectors.json";

import hiCommon from "../locales/hi/common.json";
import hiNavigation from "../locales/hi/navigation.json";
import hiExperts from "../locales/hi/experts.json";
import hiQuiz from "../locales/hi/quiz.json";
import hiSectors from "../locales/hi/sectors.json";

import guCommon from "../locales/gu/common.json";
import guNavigation from "../locales/gu/navigation.json";
import guExperts from "../locales/gu/experts.json";
import guQuiz from "../locales/gu/quiz.json";
import guSectors from "../locales/gu/sectors.json";

import mrCommon from "../locales/mr/common.json";
import mrNavigation from "../locales/mr/navigation.json";
import mrExperts from "../locales/mr/experts.json";
import mrQuiz from "../locales/mr/quiz.json";
import mrSectors from "../locales/mr/sectors.json";

import bnCommon from "../locales/bn/common.json";
import bnNavigation from "../locales/bn/navigation.json";
import bnExperts from "../locales/bn/experts.json";
import bnQuiz from "../locales/bn/quiz.json";
import bnSectors from "../locales/bn/sectors.json";

import asCommon from "../locales/as/common.json";
import asNavigation from "../locales/as/navigation.json";
import asExperts from "../locales/as/experts.json";
import asQuiz from "../locales/as/quiz.json";
import asSectors from "../locales/as/sectors.json";

import knCommon from "../locales/kn/common.json";
import knNavigation from "../locales/kn/navigation.json";
import knExperts from "../locales/kn/experts.json";
import knQuiz from "../locales/kn/quiz.json";
import knSectors from "../locales/kn/sectors.json";

import mlCommon from "../locales/ml/common.json";
import mlNavigation from "../locales/ml/navigation.json";
import mlExperts from "../locales/ml/experts.json";
import mlQuiz from "../locales/ml/quiz.json";
import mlSectors from "../locales/ml/sectors.json";

import taCommon from "../locales/ta/common.json";
import taNavigation from "../locales/ta/navigation.json";
import taExperts from "../locales/ta/experts.json";
import taQuiz from "../locales/ta/quiz.json";
import taSectors from "../locales/ta/sectors.json";

import teCommon from "../locales/te/common.json";
import teNavigation from "../locales/te/navigation.json";
import teExperts from "../locales/te/experts.json";
import teQuiz from "../locales/te/quiz.json";
import teSectors from "../locales/te/sectors.json";

import heCommon from "../locales/he/common.json";
import heNavigation from "../locales/he/navigation.json";
import heExperts from "../locales/he/experts.json";
import heQuiz from "../locales/he/quiz.json";
import heSectors from "../locales/he/sectors.json";

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    experts: enExperts,
    quiz: enQuiz,
    sectors: enSectors,
  },
  hi: {
    common: hiCommon,
    navigation: hiNavigation,
    experts: hiExperts,
    quiz: hiQuiz,
    sectors: hiSectors,
  },
  gu: {
    common: guCommon,
    navigation: guNavigation,
    experts: guExperts,
    quiz: guQuiz,
    sectors: guSectors,
  },
  mr: {
    common: mrCommon,
    navigation: mrNavigation,
    experts: mrExperts,
    quiz: mrQuiz,
    sectors: mrSectors,
  },
  bn: {
    common: bnCommon,
    navigation: bnNavigation,
    experts: bnExperts,
    quiz: bnQuiz,
    sectors: bnSectors,
  },
  as: {
    common: asCommon,
    navigation: asNavigation,
    experts: asExperts,
    quiz: asQuiz,
    sectors: asSectors,
  },
  kn: {
    common: knCommon,
    navigation: knNavigation,
    experts: knExperts,
    quiz: knQuiz,
    sectors: knSectors,
  },
  ml: {
    common: mlCommon,
    navigation: mlNavigation,
    experts: mlExperts,
    quiz: mlQuiz,
    sectors: mlSectors,
  },
  ta: {
    common: taCommon,
    navigation: taNavigation,
    experts: taExperts,
    quiz: taQuiz,
    sectors: taSectors,
  },
  te: {
    common: teCommon,
    navigation: teNavigation,
    experts: teExperts,
    quiz: teQuiz,
    sectors: teSectors,
  },
  he: {
    common: heCommon,
    navigation: heNavigation,
    experts: heExperts,
    quiz: heQuiz,
    sectors: heSectors,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "navigation", "experts", "quiz", "sectors"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
