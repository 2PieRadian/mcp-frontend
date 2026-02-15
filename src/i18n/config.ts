import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enCommon from "../locales/en/common.json";
import enNavigation from "../locales/en/navigation.json";
import enExperts from "../locales/en/experts.json";
import enQuiz from "../locales/en/quiz.json";
import enSectors from "../locales/en/sectors.json";
import enProfile from "../locales/en/profile.json";
import enArticles from "../locales/en/articles.json";
import enContact from "../locales/en/contact.json";
import enFaq from "../locales/en/faq.json";
import enHelp from "../locales/en/help.json";
import enPrivacy from "../locales/en/privacy.json";

import hiCommon from "../locales/hi/common.json";
import hiNavigation from "../locales/hi/navigation.json";
import hiExperts from "../locales/hi/experts.json";
import hiQuiz from "../locales/hi/quiz.json";
import hiSectors from "../locales/hi/sectors.json";
import hiProfile from "../locales/hi/profile.json";
import hiArticles from "../locales/hi/articles.json";
import hiContact from "../locales/hi/contact.json";
import hiFaq from "../locales/hi/faq.json";
import hiHelp from "../locales/hi/help.json";
import hiPrivacy from "../locales/hi/privacy.json";

import guCommon from "../locales/gu/common.json";
import guNavigation from "../locales/gu/navigation.json";
import guExperts from "../locales/gu/experts.json";
import guQuiz from "../locales/gu/quiz.json";
import guSectors from "../locales/gu/sectors.json";
import guProfile from "../locales/gu/profile.json";
import guArticles from "../locales/gu/articles.json";
import guContact from "../locales/gu/contact.json";
import guFaq from "../locales/gu/faq.json";
import guHelp from "../locales/gu/help.json";
import guPrivacy from "../locales/gu/privacy.json";

import mrCommon from "../locales/mr/common.json";
import mrNavigation from "../locales/mr/navigation.json";
import mrExperts from "../locales/mr/experts.json";
import mrQuiz from "../locales/mr/quiz.json";
import mrSectors from "../locales/mr/sectors.json";
import mrProfile from "../locales/mr/profile.json";
import mrArticles from "../locales/mr/articles.json";
import mrContact from "../locales/mr/contact.json";
import mrFaq from "../locales/mr/faq.json";
import mrHelp from "../locales/mr/help.json";
import mrPrivacy from "../locales/mr/privacy.json";

import bnCommon from "../locales/bn/common.json";
import bnNavigation from "../locales/bn/navigation.json";
import bnExperts from "../locales/bn/experts.json";
import bnQuiz from "../locales/bn/quiz.json";
import bnSectors from "../locales/bn/sectors.json";
import bnProfile from "../locales/bn/profile.json";
import bnArticles from "../locales/bn/articles.json";
import bnContact from "../locales/bn/contact.json";
import bnFaq from "../locales/bn/faq.json";
import bnHelp from "../locales/bn/help.json";
import bnPrivacy from "../locales/bn/privacy.json";

import asCommon from "../locales/as/common.json";
import asNavigation from "../locales/as/navigation.json";
import asExperts from "../locales/as/experts.json";
import asQuiz from "../locales/as/quiz.json";
import asSectors from "../locales/as/sectors.json";
import asProfile from "../locales/as/profile.json";
import asArticles from "../locales/as/articles.json";
import asContact from "../locales/as/contact.json";
import asFaq from "../locales/as/faq.json";
import asHelp from "../locales/as/help.json";
import asPrivacy from "../locales/as/privacy.json";

import knCommon from "../locales/kn/common.json";
import knNavigation from "../locales/kn/navigation.json";
import knExperts from "../locales/kn/experts.json";
import knQuiz from "../locales/kn/quiz.json";
import knSectors from "../locales/kn/sectors.json";
import knProfile from "../locales/kn/profile.json";
import knArticles from "../locales/kn/articles.json";
import knContact from "../locales/kn/contact.json";
import knFaq from "../locales/kn/faq.json";
import knHelp from "../locales/kn/help.json";
import knPrivacy from "../locales/kn/privacy.json";

import mlCommon from "../locales/ml/common.json";
import mlNavigation from "../locales/ml/navigation.json";
import mlExperts from "../locales/ml/experts.json";
import mlQuiz from "../locales/ml/quiz.json";
import mlSectors from "../locales/ml/sectors.json";
import mlProfile from "../locales/ml/profile.json";
import mlArticles from "../locales/ml/articles.json";
import mlContact from "../locales/ml/contact.json";
import mlFaq from "../locales/ml/faq.json";
import mlHelp from "../locales/ml/help.json";
import mlPrivacy from "../locales/ml/privacy.json";

import taCommon from "../locales/ta/common.json";
import taNavigation from "../locales/ta/navigation.json";
import taExperts from "../locales/ta/experts.json";
import taQuiz from "../locales/ta/quiz.json";
import taSectors from "../locales/ta/sectors.json";
import taProfile from "../locales/ta/profile.json";
import taArticles from "../locales/ta/articles.json";
import taContact from "../locales/ta/contact.json";
import taFaq from "../locales/ta/faq.json";
import taHelp from "../locales/ta/help.json";
import taPrivacy from "../locales/ta/privacy.json";

import teCommon from "../locales/te/common.json";
import teNavigation from "../locales/te/navigation.json";
import teExperts from "../locales/te/experts.json";
import teQuiz from "../locales/te/quiz.json";
import teSectors from "../locales/te/sectors.json";
import teProfile from "../locales/te/profile.json";
import teArticles from "../locales/te/articles.json";
import teContact from "../locales/te/contact.json";
import teFaq from "../locales/te/faq.json";
import teHelp from "../locales/te/help.json";
import tePrivacy from "../locales/te/privacy.json";

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    experts: enExperts,
    quiz: enQuiz,
    sectors: enSectors,
    profile: enProfile,
    articles: enArticles,
    contact: enContact,
    faq: enFaq,
    help: enHelp,
    privacy: enPrivacy,
  },
  hi: {
    common: hiCommon,
    navigation: hiNavigation,
    experts: hiExperts,
    quiz: hiQuiz,
    sectors: hiSectors,
    profile: hiProfile,
    articles: hiArticles,
    contact: hiContact,
    faq: hiFaq,
    help: hiHelp,
    privacy: hiPrivacy,
  },
  gu: {
    common: guCommon,
    navigation: guNavigation,
    experts: guExperts,
    quiz: guQuiz,
    sectors: guSectors,
    profile: guProfile,
    articles: guArticles,
    contact: guContact,
    faq: guFaq,
    help: guHelp,
    privacy: guPrivacy,
  },
  mr: {
    common: mrCommon,
    navigation: mrNavigation,
    experts: mrExperts,
    quiz: mrQuiz,
    sectors: mrSectors,
    profile: mrProfile,
    articles: mrArticles,
    contact: mrContact,
    faq: mrFaq,
    help: mrHelp,
    privacy: mrPrivacy,
  },
  bn: {
    common: bnCommon,
    navigation: bnNavigation,
    experts: bnExperts,
    quiz: bnQuiz,
    sectors: bnSectors,
    profile: bnProfile,
    articles: bnArticles,
    contact: bnContact,
    faq: bnFaq,
    help: bnHelp,
    privacy: bnPrivacy,
  },
  as: {
    common: asCommon,
    navigation: asNavigation,
    experts: asExperts,
    quiz: asQuiz,
    sectors: asSectors,
    profile: asProfile,
    articles: asArticles,
    contact: asContact,
    faq: asFaq,
    help: asHelp,
    privacy: asPrivacy,
  },
  kn: {
    common: knCommon,
    navigation: knNavigation,
    experts: knExperts,
    quiz: knQuiz,
    sectors: knSectors,
    profile: knProfile,
    articles: knArticles,
    contact: knContact,
    faq: knFaq,
    help: knHelp,
    privacy: knPrivacy,
  },
  ml: {
    common: mlCommon,
    navigation: mlNavigation,
    experts: mlExperts,
    quiz: mlQuiz,
    sectors: mlSectors,
    profile: mlProfile,
    articles: mlArticles,
    contact: mlContact,
    faq: mlFaq,
    help: mlHelp,
    privacy: mlPrivacy,
  },
  ta: {
    common: taCommon,
    navigation: taNavigation,
    experts: taExperts,
    quiz: taQuiz,
    sectors: taSectors,
    profile: taProfile,
    articles: taArticles,
    contact: taContact,
    faq: taFaq,
    help: taHelp,
    privacy: taPrivacy,
  },
  te: {
    common: teCommon,
    navigation: teNavigation,
    experts: teExperts,
    quiz: teQuiz,
    sectors: teSectors,
    profile: teProfile,
    articles: teArticles,
    contact: teContact,
    faq: teFaq,
    help: teHelp,
    privacy: tePrivacy,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    load: "languageOnly",
    defaultNS: "common",
    ns: ["common", "navigation", "experts", "quiz", "sectors", "profile", "articles", "contact", "faq", "help", "privacy"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
