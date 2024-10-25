import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logger } from '@navikt/next-logger'

import { browserEnv } from './utils/env'

export function middleware(request: NextRequest): NextResponse | void {
    const url = new URL(request.url)
    const forwardedHostHeader = request.headers.get('x-forwarded-host')

    // Redirect to new ingress in production env
    if (browserEnv.NEXT_PUBLIC_ENVIRONMENT === 'production' && forwardedHostHeader?.includes('intern')) {
        logger.info('Hit old ingress, redirecting to new ingress')
        return NextResponse.redirect(new URL(url.pathname, 'https://helsesjekk-bot.nav.no/'))
    }
    
    console.log("Received headers:")
    console.log(JSON.stringify(request.headers, null, 2))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
