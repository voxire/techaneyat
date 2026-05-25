import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono, Noto_Kufi_Arabic } from 'next/font/google'
import { SmoothScrollProvider } from '@/app/providers/SmoothScrollProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
})

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-kufi-arabic',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'Techaneyat | Smart Infrastructure Partner, Lebanon',
    template: '%s | Techaneyat',
  },
  description:
    'Techaneyat designs, builds, and manages the full technology backbone of your organization under one SLA. Network, cybersecurity, cloud, power, and hardware. Based in Beirut, Lebanon.',
  metadataBase: new URL('https://techaneyat.com'),
  alternates: {
    canonical: '/',
    languages: { ar: '/ar' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_LB',
    siteName: 'Techaneyat',
    images: [
      {
        url: '/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Techaneyat: Smart Infrastructure Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@techaneyat',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoKufiArabic.variable}`}
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
