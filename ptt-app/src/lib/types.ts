export type Votes = {
    [key: string]: string[]
}

export type User = {
    [key: string]: string // timezone
}

export type uctDates = string

export type newEvent = {
    id: string
    dates: uctDates[]
    users?: User
    vote_yes?: Votes
    vote_no?: Votes
    vote_maybe?: Votes
    title: string
    info?: string
    created_at?: string
    updated_at?: string
    finale_date?: string
}

export type GetVotesResp = {ok: true, data: VoteResults[]}

export type VoteResults = {
    date: string
    yes: number
    no: number
    maybe: number
}