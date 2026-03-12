import './globals.css'

export const metadata = {
  title: 'Design Disaster',
  description: 'A terrible user experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
