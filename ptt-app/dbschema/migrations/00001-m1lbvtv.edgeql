CREATE MIGRATION m1lbvtv2c7abmvak4c76lcckhwalsa4qyakerg5zergxeyka7torja
    ONTO initial
{
  CREATE TYPE default::Event {
      CREATE PROPERTY createdAt: std::datetime;
      CREATE PROPERTY eventDate: cal::local_date;
      CREATE PROPERTY eventTime: cal::local_time;
      CREATE REQUIRED PROPERTY title: std::str {
          CREATE CONSTRAINT std::min_len_value(100);
          CREATE CONSTRAINT std::regexp('^[A-Za-z0-9 ]+$');
      };
  };
};
