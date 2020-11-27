import faker from "faker";
import bcrypt from "bcryptjs";
import db from "../../models/index.js";

const University = db.university;

const Club = db.club;

const User = db.user;

const Role = db.role;

const userSeeder = () => {
  console.log("Begin seeding user to collection");

  const max = 20;

  User.estimatedDocumentCount((err, count) => {
    if (!err && count < max) {
      // Seed admin user
      const admin = new User({
        username: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync("123456789", 8),
        avatar: faker.image.avatar(),
      });

      Role.find().exec((err, roles) => {
        if (err) {
          console.log("error: ", err);
          process.exit();
        }

        admin.roles = roles.map((role) => role._id);

        University.findOne({
          name: db.UNIVERSITIES[0],
        }).exec((error, university) => {
          admin.university = university._id;

          Club.findOne({
            name: db.CLUBS[0],
            university: university._id,
          }).exec((error, club) => {
            admin.club = club._id;

            admin.save((err) => {
              if (err) {
                console.log("error: ", err);
              }

              console.log(
                `\nAdmin with username: ${admin.username} is added to collections`
              );
            });
          });
        });
      });

      // Seed normal user
      for (let index = 1; index < max; index++) {
        const user = new User({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync("123456789", 8),
          avatar: faker.image.avatar(),
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

            University.findOne({
              name: db.UNIVERSITIES[0],
            }).exec((error, university) => {
              user.university = university._id;

              Club.findOne({
                name: db.CLUBS[0],
                university: university._id,
              }).exec((error, club) => {
                user.club = club._id;

                user.save((err) => {
                  if (err) {
                    console.log("error: ", err);
                  }

                  console.log(
                    `\nUser with username: ${user.username} is added to collections`
                  );
                });
              });
            });
          }
        );
      }
    }

    console.log(`\nEnd user seeding`);
  });
};

export default userSeeder;
