module default {
    # global currentSessionId: uuid;

    # type Person {
    #     required name: str {
    #         constraint min_len_value(100);
    #         constraint regexp(r'^[A-Za-z0-9 ]+$');
    #     }
    #     votes: array<FancyDates>;
    # }

    scalar type Choice extending enum<Yes, Maybe, No>;

    # type FancyTimes {
    #     utcTime: cal::local_time;
    #     time: cal::local_time;
    #     vote: Choice;
    # }

    # type FancyDates {
    #     utcDate: cal::local_date;
    #     date: cal::local_date;
    #     timezone: str;
    #     times: array<FancyTimes>;
    # }

    type Event {
        required title: str {
            constraint max_len_value(100);
            constraint regexp(r'^[A-Za-z0-9 ]+$');
        }
        createdAt: datetime {
            default := datetime_of_statement();
            readonly := true;
        };
        modifiedAt: datetime {
            default := datetime_of_statement();
            rewrite update using (datetime_of_statement());
        };
        eventDate: cal::local_date;
        eventTime: cal::local_time;
        data: array<json>;
        people: array<
            tuple<
                name: str,
                timezone: str,
                times: array<
                    tuple<
                        timeId: int64,
                        vote: Choice
                    >
                >
            >
        >;
        dates: array<tuple<date: cal::local_date, dateId: int64, times: array<tuple<time: cal::local_time, timeId: int64>>>>;
    }
}
