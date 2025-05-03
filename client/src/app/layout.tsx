// app/layout.tsx (or relevant layout file)
import { AuthProvider } from '@/context/AuthContext'; // Adjust path if needed
import './globals.css'; // Your global styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider> {/* Wrap the relevant parts or the entire app */}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}