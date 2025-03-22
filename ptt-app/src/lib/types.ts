export type Votes = {
    [key: string]: string[]
}

export type vote = "yes" | "no" | "maybe"

export type User = {
    [key: string]: string // timezone
}

export type uctDates = string

export type newEvent = {
    id: string
    dates: uctDates[]
    users?: User
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

export type queryEvent = {
    id: string
    // dates: string
    users: string
    title: string
    vote_json: string
    info?: string
    created_at?: string
    updated_at?: string
    finale_date?: string
}

export type parsedEvent = {
    id: string
    dates: string[]
    easyDates: formatEventObj[]
    users: User
    title: string
    // vote_yes: Dates
    // vote_no: Dates
    // vote_maybe: Dates
    vote_json: NewDates
    info?: string
    created_at?: string
    updated_at?: string
    finale_date?: string
}

export type formatEventObj = {
    utcDate: string
    nameOfDay: string
    day: string
    month: string
    year: string
    times: {
        t: string
        utc: string
    }[]
}

export type fancyDateObj = {
    [key: string]: formatEventObj
}

export type Dates = {
    [key: string]: string[]
}

export type myVote = "yes" | "no" | "maybe"

export type NewDates = {
    [key: string]: {
        [key: string]: myVote
    }
}