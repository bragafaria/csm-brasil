"use client";

import Script from "next/script";

export default function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Cognitive Spectrum Model (CSM), and why should I care?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Cognitive Spectrum Model (CSM) is a personality framework that explores how individuals think and interact across five key spectrums: Information Processing, Decision-Making, Energy Orientation, Change Approach, and Interpersonal Style. Based on these dimensions, CSM outlines one of 32 archetypes, offering a structured way to understand personal cognitive patterns and relationship dynamics.",
        },
      },
      {
        "@type": "Question",
        name: "How is CSM different from MBTI, Enneagram, or Big Five?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Traditional models focus on fixed categories or broad traits. CSM uses five spectrums to describe thinking and interaction preferences, resulting in 32 archetypes. It emphasizes practical insights for communication, self-awareness, and interpersonal understanding.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I trust CSM over free online quizzes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many online quizzes provide broad or entertainment-focused results. CSM takes a more structured approach, using defined spectrums and archetypes to offer clearer and more practical insights for personal growth and relationships.",
        },
      },
      {
        "@type": "Question",
        name: "Can CSM really “read” my relationship like a mind reader?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. CSM does not guess emotions or predict personal outcomes. It compares thinking and interaction preferences—such as how someone who prefers Harmony might relate to someone who values Autonomy—to highlight potential areas of alignment or friction.",
        },
      },
      {
        "@type": "Question",
        name: "Is CSM scientifically legitimate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CSM is inspired by established psychological ideas and combines elements from cognitive and personality theories. It is designed as a practical self-discovery and communication tool rather than a scientific or clinical assessment.",
        },
      },
      {
        "@type": "Question",
        name: "How does the free assessment work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The free CSM assessment typically takes 10 to 15 minutes and includes a mix of rating-scale and situational questions. After completing it, users receive a report describing their archetype, key spectrum scores, strengths, and communication tendencies.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need my partner to start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. You can take the assessment individually. If you want a joint compatibility overview, your partner can complete the assessment later, enabling a combined analysis.",
        },
      },
      {
        "@type": "Question",
        name: "Can CSM predict if we're soulmates or point out potential issues?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CSM does not predict relationships or label partners. It highlights potential compatibility patterns and areas where communication styles may differ, offering guidance for understanding and growth.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly will I get my personality report results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Results are generated immediately after you finish the assessment.",
        },
      },
      {
        "@type": "Question",
        name: "Is CSM therapy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. CSM is not a therapeutic or diagnostic tool. It is a framework for self-awareness and relationship understanding. Some people use it alongside coaching or counseling, but it is designed for personal insight only.",
        },
      },
    ],
  };

  return (
    <Script id="faq-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
