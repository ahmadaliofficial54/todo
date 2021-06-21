import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://eyvpjhuppoujgixmcpnz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDIxNTQ5NiwiZXhwIjoxOTM5NzkxNDk2fQ.o9NsOpWNPi5U9HW4muOGPBj6zsDsGeT5_HhxUREgO00"
)

export { supabase }