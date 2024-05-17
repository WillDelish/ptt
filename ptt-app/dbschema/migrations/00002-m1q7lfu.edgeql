CREATE MIGRATION m1q7lfugwp3zatvxcrbxo4xeajnbuzrdralvtptua67ofioj56cjoa
    ONTO m1lbvtv2c7abmvak4c76lcckhwalsa4qyakerg5zergxeyka7torja
{
  ALTER TYPE default::Event {
      ALTER PROPERTY title {
          CREATE CONSTRAINT std::max_len_value(100);
      };
  };
  ALTER TYPE default::Event {
      ALTER PROPERTY title {
          DROP CONSTRAINT std::min_len_value(100);
      };
  };
};
