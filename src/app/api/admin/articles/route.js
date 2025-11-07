import { db } from "@/lib/db"; // your Neon/Drizzle setup
import { articles } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const formData = await request.formData();
  const data = JSON.parse(formData.get("data"));

  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const mdxContent = `
# ${data.title}

${data.intro}

${data.body}

## FAQs
${data.faqs
  .filter((f) => f.question && f.answer)
  .map((f) => `### ${f.question}\n${f.answer}`)
  .join("\n\n")}

**${data.cta}**
  `.trim();

  await db.insert(articles).values({
    title: data.title,
    slug,
    category: data.category,
    metaDescription: data.metaDescription,
    content: mdxContent,
    status: "published",
  });

  revalidatePath(`/blog/${data.category}/${slug}`);
  return Response.json({ success: true });
}
