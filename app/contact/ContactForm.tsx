'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please tell us a bit more'),
})

type FormData = z.infer<typeof schema>

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: 'var(--tn-bg)',
  border: '1px solid var(--tn-border)',
  borderRadius: '4px',
  color: 'var(--tn-text)',
  fontFamily: 'var(--tn-font-body)',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--tn-font-mono)',
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--tn-text-3)',
  marginBottom: '8px',
}

const errorStyle: React.CSSProperties = {
  color: 'var(--tn-error)',
  fontSize: '12px',
  marginTop: '4px',
  fontFamily: 'var(--tn-font-mono)',
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError(true)
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <p
          style={{
            fontFamily: 'var(--tn-font-mono)',
            fontSize: '13px',
            color: 'var(--tn-success)',
            marginBottom: '8px',
          }}
        >
          ✓ Message sent.
        </p>
        <p style={{ color: 'var(--tn-text-2)', fontSize: '15px' }}>
          We&apos;ll respond within 4 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label htmlFor="name" style={labelStyle}>Full Name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              style={fieldStyle}
              {...register('name')}
            />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="company" style={labelStyle}>Company</label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              style={fieldStyle}
              {...register('company')}
            />
            {errors.company && <p style={errorStyle}>{errors.company.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>Email Address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            style={fieldStyle}
            {...register('email')}
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" style={labelStyle}>Phone (optional)</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            style={fieldStyle}
            {...register('phone')}
          />
        </div>

        <div>
          <label htmlFor="message" style={labelStyle}>Tell us about your infrastructure</label>
          <textarea
            id="message"
            rows={5}
            style={{ ...fieldStyle, resize: 'vertical', minHeight: '120px' }}
            {...register('message')}
          />
          {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
        </div>

        {error && (
          <p style={{ ...errorStyle, fontSize: '13px' }}>
            Something went wrong. Please email{' '}
            <a href="mailto:Sales@techaneyat.com" style={{ color: 'var(--tn-accent)' }}>
              Sales@techaneyat.com
            </a>{' '}
            directly.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{ alignSelf: 'flex-start', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}
