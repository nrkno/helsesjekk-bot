import { v4 as uuidV4 } from 'uuid'

import { Question, QuestionType } from '../safe-types'

export function defaultQuestions(): Question[] {
    return [
        {
            questionId: uuidV4(),
            question: 'Stress',
            answers: {
                HIGH: 'Jeg har nok tid til å løse oppgavene mine',
                MID: 'Litt sånn midt i mellom',
                LOW: 'Jeg har alt for mye å gjøre',
            },
            type: QuestionType.TEAM_HEALTH,
        },
        {
            questionId: uuidV4(),
            question: 'Tilbakemeldinger',
            answers: {
                HIGH: 'Vi gir hverandre positive og konstruktive tilbakemeldinger',
                MID: 'Litt sånn midt i mellom',
                LOW: 'Vi vet ikke hvordan vi skal gi hverandre tilbakemeldinger på en konstruktiv måte',
            },
            type: QuestionType.TEAM_HEALTH,
        },
        {
            questionId: uuidV4(),
            question: 'Samarbeid',
            answers: {
                HIGH: 'Vi samarbeider godt',
                MID: 'Litt sånn midt i mellom',
                LOW: 'Vi inkluderer ikke hverandre nok',
            },
            type: QuestionType.TEAM_HEALTH,
        },
        {
            questionId: uuidV4(),
            question: 'Støtte',
            answers: {
                HIGH: 'Jeg får den hjelpen jeg trenger',
                MID: 'Litt sånn midt i mellom',
                LOW: ' Jeg får ikke den hjelpen jeg trenger',
            },
            type: QuestionType.SPEED,
        },
        {
            questionId: uuidV4(),
            question: 'Fart',
            answers: {
                HIGH: 'Vi får gjort ting raskt',
                MID: 'Litt sånn midt i mellom',
                LOW: 'Ting stopper opp hele tiden',
            },
            type: QuestionType.SPEED,
        },
        {
            questionId: uuidV4(),
            question: 'Oppdrag',
            answers: {
                HIGH: 'Vi vet akkurat hvorfor vi er her',
                MID: 'Litt sånn midt i mellom',
                LOW: 'Jeg vet ikke hvor vi skal, oppdraget er lite tydelig',
            },
            type: QuestionType.SPEED,
        },
    ]
}
