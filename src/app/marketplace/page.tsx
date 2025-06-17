// src/app/marketplace/page.tsx
import { supabase } from '@/lib/supabaseClient'

export default async function MarketplacePage() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .limit(1)

  if (error) console.error('Supabase error:', error)
  return <pre className="p-4 bg-gray-100 rounded">{JSON.stringify(data, null, 2)}</pre>
}
