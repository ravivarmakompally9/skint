import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      return null
    }

    if (isDashboardPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
      
      // Role-based routing
      const userRole = token?.role
      const pathRole = req.nextUrl.pathname.split('/')[2]
      
      if (pathRole && userRole && pathRole !== userRole) {
        return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url))
      }
    }

    return null
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
        const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')
        
        if (isAuthPage) {
          return true // Allow access to auth pages
        }
        
        if (isDashboardPage) {
          return !!token // Require authentication for dashboard
        }
        
        return true // Allow access to other pages
      }
    }
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*'
  ]
}
