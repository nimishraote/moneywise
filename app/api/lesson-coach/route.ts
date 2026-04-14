import { NextResponse } from "next/server";
import OpenAI from "openai";

type LessonCoachRequest = {
  module: string;
  lessonTitle: string;
  personaLead: string;
  conceptTitles: string[];
  conceptSummaries: string[];
  question: string;
};

function buildFallbackAnswer(payload: LessonCoachRequest) {
  const question = payload.question.toLowerCase();

  if (question.includes("simpler") || question.includes("simple")) {
    return `In simple words, this lesson is about ${payload.lessonTitle.toLowerCase()}. The main point is to understand what the idea means in real life, not just as a finance term. Look at the examples on the page, then focus on the "Do this now" steps. That is where the lesson becomes useful.`;
  }

  if (question.includes("example")) {
    return `A real-life example would be this: money comes in, then it goes toward one or two things right away, and you suddenly have less room than you expected. That is why the lesson is trying to make the pattern visible. Once you can name what is happening, the next step gets easier.`;
  }

  if (question.includes("what should i do") || question.includes("next step")) {
    return `Your best next move is to do one of the action steps on this page right now, even if it feels small. Do not try to master everything at once. Use the lesson to understand one idea clearly, then take one practical step before moving on.`;
  }

  if (question.includes("saving") && question.includes("invest")) {
    return `A simple way to think about it is this: saving is money you may need sooner and want to keep safe, while investing is money you can leave alone longer so it has a chance to grow. They do different jobs. A good first move is to ask which bucket your money belongs in right now.`;
  }

  return `This lesson is trying to make ${payload.lessonTitle.toLowerCase()} feel simpler and more usable. Focus on the main concept first, then the takeaway, then one action step. You do not need to learn everything at once. One clear idea plus one small action is enough for now.`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LessonCoachRequest;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ answer: buildFallbackAnswer(payload) });
    }

    const client = new OpenAI({ apiKey });

    const prompt = `
You are an in-lesson financial literacy coach inside an app for ages 15 to 29.

Your job:
- explain the CURRENT lesson in simpler language
- answer the user's question in context
- be supportive, direct, and practical
- sound like a smart older sibling, not a finance textbook
- do NOT give personalized financial advice
- do NOT recommend specific financial products unless the lesson already mentions comparisons
- keep the answer concise and useful

Rules:
- use simple English
- 4 to 7 lines max
- no bullet points
- no markdown
- when helpful, end with one practical next step

Current lesson:
- module: ${payload.module}
- lesson title: ${payload.lessonTitle}
- learner context: ${payload.personaLead}
- concept titles: ${payload.conceptTitles.join(" | ")}
- concept summaries: ${payload.conceptSummaries.join(" | ")}

User question:
${payload.question}
`;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    const answer = response.output_text?.trim();

    return NextResponse.json({
      answer: answer || buildFallbackAnswer(payload),
    });
  } catch {
    return NextResponse.json(
      {
        answer:
          "I could not answer that clearly right now. Try asking for a simpler explanation, a real-life example, or the best next step for this lesson.",
      },
      { status: 200 }
    );
  }
}