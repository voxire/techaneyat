import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Send email via nodemailer or an email API.
    // For now: log the submission. Wire up SMTP or Resend before launch.
    console.log('Contact form submission:', {
      to: 'Sales@techaneyat.com',
      from: data.email,
      subject: `Techaneyat inquiry from ${data.name} at ${data.company}`,
      body: data.message,
      phone: data.phone,
    })

    // TODO: Integrate email sender (Resend recommended)
    // Example with Resend:
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@techaneyat.com',
    //   to: 'Sales@techaneyat.com',
    //   subject: `Inquiry from ${data.name} at ${data.company}`,
    //   text: `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\n\n${data.message}`,
    // })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
