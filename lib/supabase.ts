'use client'

import { createClient } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (typeof window === 'undefined') {
    throw new Error('Supabase client can only be used on the client side')
  }

  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables')
    }

    supabase = createClient(supabaseUrl, supabaseKey)
  }

  return supabase
}

// Function to submit contact form to Supabase
export async function submitContactForm(data: {
  firstName: string
  lastName: string
  email: string
  countryCode: string
  mobile: string
  message: string
}) {
  try {
    const supabaseClient = getSupabaseClient()
    const { data: result, error } = await supabaseClient
      .from('form_submissions')
      .insert([
        {
          form_type: 'contact',
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: `${data.countryCode}${data.mobile}`,
          country_code: data.countryCode,
          message: data.message,
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      throw new Error(error.message)
    }

    return result
  } catch (err) {
    console.error('Error submitting contact form:', err)
    throw err
  }
}

// Function to submit quote request to Supabase
export async function submitQuoteForm(data: {
  name: string
  email: string
  countryCode: string
  mobile: string
  message: string
  service: string
  serviceDetails: any
}) {
  try {
    const supabaseClient = getSupabaseClient()
    const { data: result, error } = await supabaseClient
      .from('form_submissions')
      .insert([
        {
          form_type: 'quote',
          first_name: data.name.split(' ')[0] || data.name,
          last_name: data.name.split(' ').slice(1).join(' ') || '',
          email: data.email,
          phone: `${data.countryCode}${data.mobile}`,
          country_code: data.countryCode,
          message: data.message,
          service: data.service,
          service_details: data.serviceDetails,
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      throw new Error(error.message)
    }

    return result
  } catch (err) {
    console.error('Error submitting quote form:', err)
    throw err
  }
}
