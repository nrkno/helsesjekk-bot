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

    // Convert headers to an object for easier logging
    const headersObj: Record<string, string> = {}
    request.headers.forEach((value, key) => {
        headersObj[key] = value
    })

    // Add test headers for local development
    console.log('public env:  ' + browserEnv.NEXT_PUBLIC_ENVIRONMENT)
    if (browserEnv.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
        const emailHeader = 'fakeuser@nrk.no, fakeuser@nrk.no' // comma separeted list of emails (with space between)
        const groupsHeader = ['fake-group', 'some-other-uuid'].join(',') // comma separated list of azure ad group uuids (no space)

        const response = NextResponse.next()
        response.headers.set('X-Forwarded-Email', emailHeader)
        response.headers.set('X-Forwarded-Groups', groupsHeader)

        // Convert headers to an object for easier logging
        const responseHeadersObj: Record<string, string> = {}
        response.headers.forEach((value, key) => {
            responseHeadersObj[key] = value
        })
        console.log(JSON.stringify(responseHeadersObj, null, 2))
        return response
    }

    console.log('Received headers:')
    console.log(JSON.stringify(headersObj, null, 2))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
