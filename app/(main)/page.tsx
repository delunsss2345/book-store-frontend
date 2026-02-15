'use client'

import ChatWidget from "@/app/(main)/_components/ChatWidget";
import Hero from "@/app/(main)/_components/Hero";
import QuoteRandom from "@/app/(main)/_components/QuoteRandom";
import QuoteLogo from "./_components/QuoteLogo";



const Home = () => {

  return (
    <>
      <Hero />
      <QuoteRandom />
      <QuoteLogo />
      <ChatWidget />
    </>
  );
};
export default Home;
