import db from "../../models/index.js";

const Role = db.role;

const roleSeeder = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count < db.ROLES.length) {
      db.ROLES.forEach((role) => {
        new Role({
          name: role,
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log(`added ${role} to roles collection`);
        });
      });
    }
  });
};

export default roleSeeder;
