CREATE MIGRATION m1vqsnprarx6q7ga4jomlnarow3nkbzqjsa3buly6hvlqmmef6geva
    ONTO m1q7lfugwp3zatvxcrbxo4xeajnbuzrdralvtptua67ofioj56cjoa
{
  ALTER TYPE default::Event {
      ALTER PROPERTY createdAt {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      CREATE PROPERTY data: array<std::json>;
      CREATE PROPERTY modifiedAt: std::datetime {
          SET default := (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
};
