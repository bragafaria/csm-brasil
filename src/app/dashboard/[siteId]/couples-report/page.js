// app/dashboard/[siteId]/couples-report/page.js
import { redirect } from "next/navigation";

export default function CouplesReportRoot() {
  // Redirect to default section
  redirect(`/dashboard/${params.siteId}/couples-report/how-you-connect`);
}
