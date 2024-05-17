module default {
    global currentSessionId: uuid;

    type Person {
        required name: str {
            constraint min_len_value(100);
            constraint regexp(r'^[A-Za-z0-9 ]+$');
        }
    }

    scalar type Choice extending enum<Yes, Maybe, No>;

    type FancyTimes {
        utcTime: cal::local_time;
        time: cal::local_time;
        timezone: str;
    }

    type FancyDates {
        utcDate: cal::local_date;
        date: cal::local_date;
        timezone: str;
        multi FancyTimes;
    }

    type Event {
        # required EventId: str {
        #     default := std::uuid_generate_v4()
        # }
        required title: str {
            constraint max_len_value(100);
            constraint regexp(r'^[A-Za-z0-9 ]+$');
        }
        required createdAt: datetime {
            default := datetime_of_statement();
            readonly := true;
        };
        required modifiedAt: datetime {
            default := datetime_of_statement();
            rewrite update using (datetime_of_statement());
        };
        eventDate: cal::local_date;
        eventTime: cal::local_time;
        People: multi Person;
        # pollDates: array<local_date>
        # multi users: Person;
    }
}
