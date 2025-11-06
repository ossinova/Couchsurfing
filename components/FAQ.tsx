"use client";

import { useMemo, useRef, useState } from "react";
import type { JSX } from "react";
import Link from "next/link";
import config from "@/config";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  const items = useMemo<FAQItemProps[]>(() => {
    if (config.faq?.length) {
      return config.faq.map(({ question, answer }) => {
        // Check if answer contains a link placeholder or is already JSX
        let answerElement: JSX.Element;
        
        if (typeof answer === 'string') {
          // Replace markdown-style links [text](url) with actual links
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          const parts: (string | JSX.Element)[] = [];
          let lastIndex = 0;
          let match;
          
          while ((match = linkRegex.exec(answer)) !== null) {
            // Add text before the link
            if (match.index > lastIndex) {
              parts.push(answer.substring(lastIndex, match.index));
            }
            // Add the link
            parts.push(
              <Link key={match.index} href={match[2]} className="link link-primary font-semibold">
                {match[1]}
              </Link>
            );
            lastIndex = match.index + match[0].length;
          }
          
          // Add remaining text
          if (lastIndex < answer.length) {
            parts.push(answer.substring(lastIndex));
          }
          
          answerElement = <p>{parts.length > 0 ? parts : answer}</p>;
        } else {
          answerElement = <p>{answer}</p>;
        }
        
        return {
          question,
          answer: answerElement,
        };
      });
    }
    return [
      {
        question: "What do I get exactly?",
        answer: <div className="space-y-2 leading-relaxed">Loreum Ipseum</div>,
      },
    ];
  }, []);
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content mb-4">
            Frequently Asked Questions
          </p>
          <Link 
            href="/get-started" 
            className="link link-primary font-semibold inline-flex items-center gap-2"
          >
            View Get Started Guide
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <ul className="basis-1/2">
          {items.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
