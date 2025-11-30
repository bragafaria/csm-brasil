// app/layout.js
import "./globals.css";
import SupabaseListener from "@/app/lib/supabase/SupabaseListerner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SupabaseListener />
        {children}
      </body>
    </html>
  );
}
