import React, { ReactElement } from 'react'
import { Skeleton, BodyShort, Detail, Link as AkselLink } from '@navikt/ds-react'
import { Tooltip } from '@navikt/ds-react'

import { getUser, isUserLoggedIn } from '../auth/authentication'
import { getUserInfo } from '../auth/userInfo'

async function LoggedInUser(): Promise<ReactElement> {
    if (!isUserLoggedIn()) {
        return (
            <div className="flex flex-col items-end p-4">
                <BodyShort className="w-32 text-right">Ikke logget inn</BodyShort>
                <AkselLink href="/oauth2/login?redirect=/kom-i-gang">Logg inn</AkselLink>
            </div>
        )
    }

    const userInfo = getUserInfo()
    if ('error' in userInfo) {
        throw new Error(userInfo.error)
    }

    return (
        <div className="flex gap-4 p-4">
            <div className="hidden sm:block text-right">
                <BodyShort>{userInfo.name}</BodyShort>
                <Detail className="whitespace-nowrap">{userInfo.email}</Detail>
            </div>
            <Tooltip content={`Logget in som ${userInfo.name} (${userInfo.email})`}>
                <div className="w-[48px] h-[48px] bg-gray-400 rounded-full flex items-center justify-center text-2xl">
                    {userInfo.name[0]}
                </div>
            </Tooltip>
        </div>
    )
}

export function LoggedInUserSkeleton(): ReactElement {
    return (
        <div className="flex gap-4 p-4">
            <div>
                <Skeleton width={120} />
                <Skeleton width={60} />
            </div>
            <Skeleton width={48} height={48} variant="circle" />
        </div>
    )
}

export default LoggedInUser
