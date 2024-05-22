CREATE MIGRATION m1bebw47azfxo66xsfjib5srooccj2lwvju7uzfrbc6nrofvcp4ceq
    ONTO m1vqsnprarx6q7ga4jomlnarow3nkbzqjsa3buly6hvlqmmef6geva
{
  ALTER TYPE default::Event {
      CREATE PROPERTY dates: array<tuple<date: cal::local_date, dateId: std::int64, times: array<tuple<time: cal::local_time, timeId: std::int64>>>>;
  };
};
