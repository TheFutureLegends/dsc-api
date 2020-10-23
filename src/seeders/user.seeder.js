import faker from "faker";
import bcrypt from "bcryptjs";
import db from "../models/index.js";

const User = db.user;

const Role = db.role;

const userSeeder = () => {
  console.log("Begin seeding user to collection");

  User.estimatedDocumentCount((err, count) => {
    if (!err && count < 150) {
      for (let index = 0; index < 150; index++) {
        const user = new User({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync("123456789", 8),
        });

        Role.find(
          {
            name: {
              $in: db.ROLES[Math.floor(Math.random() * db.ROLES.length)],
            },
          },
          (err, roles) => {
            if (err) {
              console.log("error: ", err);
            }

            user.roles = roles.map((role) => role._id);

            user.save((err) => {
              if (err) {
                console.log("error: ", err);
              }

              console.log(
                `User with username: ${user.username} is added to collections\n`
              );
            });
          }
        );
      }
    }

    console.log(`\nEnd user seeding`);
  });
};

export default userSeeder;
