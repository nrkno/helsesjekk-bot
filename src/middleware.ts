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

    if (browserEnv.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
        const emailHeader = 'fakeuser@nrk.no, fakeuser@nrk.no' // comma separeted list of emails (with space between)
        const groupsHeader = ['fake-group', 'some-other-uuid'].join(',') // comma separated list of azure ad group uuids (no space)

        const response = NextResponse.next()
        response.headers.set('X-Forwarded-Email', emailHeader)
        response.headers.set('X-Forwarded-Groups', groupsHeader)
        return response
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
