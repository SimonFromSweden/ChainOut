import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hrpazmoyyurhtzhpcbuf.supabase.co";
const SUPABASE_ANON_KEY =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycGF6bW95eXVyaHR6aHBjYnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NzQyNTEsImV4cCI6MjA3NDQ1MDI1MX0.8SFhYynvcD92cVVoy5ttpzLitxJd6zxyZNm9QJxtXEI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
