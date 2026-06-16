"use client";

import ChatWidget from "./_components/ChatWidget";
import Hero from "./_components/Hero";
import { HomeBook } from "./_components/HomeBook";
import QuoteLogo from "./_components/QuoteLogo";
import QuoteRandom from "./_components/QuoteRandom";

const Home = () => {
  return (
    <>
      <Hero />
      <HomeBook />
      <QuoteRandom />
      <QuoteLogo />
      <ChatWidget />
    </>
  );
};
export default Home;
