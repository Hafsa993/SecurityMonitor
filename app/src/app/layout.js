import './globals.css'

export const metadata = {
  title: 'Privacy Tracker - See What Websites Know About You',
  description: 'Interactive tool to visualize what websites can know with different permissions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {children}
      </body>
    </html>
  )
}
