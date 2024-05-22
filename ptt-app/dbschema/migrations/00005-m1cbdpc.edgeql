CREATE MIGRATION m1cbdpcujk2uly6q2b5a6mj5qtg4exdagtlnlju7dst2jy5pjsujua
    ONTO m1bebw47azfxo66xsfjib5srooccj2lwvju7uzfrbc6nrofvcp4ceq
{
  CREATE SCALAR TYPE default::Choice EXTENDING enum<Yes, Maybe, No>;
  ALTER TYPE default::Event {
      CREATE PROPERTY people: array<tuple<name: std::str, timezone: std::str, times: array<tuple<timeId: std::int64, vote: default::Choice>>>>;
  };
};
