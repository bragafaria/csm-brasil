// app/layout.tsx (final version)
import "./globals.css";
import SupabaseListener from "@/app/lib/supabase/SupabaseListerner";
import { PostHogProvider } from "@/app/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          <SupabaseListener />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
