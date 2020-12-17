import faker from "faker";
import bcrypt from "bcryptjs";
import db from "../../models/index.js";

const University = db.university;

const Club = db.club;

const User = db.user;

const Role = db.role;

const userSeeder = () => {
  console.log("Begin seeding user to collection");

  const max = 6;

  User.estimatedDocumentCount((err, count) => {
    if (!err && count < max) {
      // Seed super admin user
      const super_admin = new User({
        username: "super_admin",
        email: "super_admin@super_admin.com",
        password: bcrypt.hashSync("123456789", 8),
        avatar:
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      });

      Role.find().exec((err, roles) => {
        if (err) {
          console.log("error: ", err);
          process.exit();
        }

        super_admin.roles = roles.map((role) => role._id);

        super_admin.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(
            `\nSuper Admin with username: ${super_admin.username} is added to collections`
          );
        });

        // University.findOne({
        //   name: db.UNIVERSITIES[0],
        // }).exec((error, university) => {
        //   admin.university = university._id;

        //   Club.findOne({
        //     name: db.CLUBS[0],
        //     university: university._id,
        //   }).exec((error, club) => {
        //     admin.club = club._id;

        //     admin.save((err) => {
        //       if (err) {
        //         console.log("error: ", err);
        //       }

        //       console.log(
        //         `\nAdmin with username: ${admin.username} is added to collections`
        //       );
        //     });
        //   });
        // });
      });

      const admin = new User({
        username: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync("123456789", 8),
        avatar:
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      });

      Role.findOne({
        name: "admin",
      }).exec((err, role) => {
        if (err) {
          console.log("error: ", err);

          process.exit();
        }

        admin.roles = [role._id];

        admin.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(
            `\nAdmin with username: ${admin.username} is added to collections`
          );
        });
      });

      const moderator = new User({
        username: "moderator",
        email: "moderator@moderator.com",
        password: bcrypt.hashSync("123456789", 8),
        avatar:
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      });

      Role.findOne({
        name: "moderator",
      }).exec((err, role) => {
        if (err) {
          console.log("error: ", err);

          process.exit();
        }

        moderator.roles = [role._id];

        moderator.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(
            `\nAuthor with username: ${moderator.username} is added to collections`
          );
        });
      });

      const author = new User({
        username: "author",
        email: "author@author.com",
        password: bcrypt.hashSync("123456789", 8),
        avatar:
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      });

      Role.findOne({
        name: "author",
      }).exec((err, role) => {
        if (err) {
          console.log("error: ", err);
          
          process.exit();
        }

        author.roles = [role._id];

        author.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(
            `\nAuthor with username: ${author.username} is added to collections`
          );
        });
      });

      const member = new User({
        username: "member",
        email: "member@member.com",
        password: bcrypt.hashSync("123456789", 8),
        avatar:
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      });

      Role.findOne({
        name: "member",
      }).exec((err, role) => {
        if (err) {
          console.log("error: ", err);

          process.exit();
        }

        member.roles = [role._id];

        member.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(
            `\nMember with username: ${member.username} is added to collections`
          );
        });
      });

      const user = new User({
        username: "user",
        email: "user@user.com",
        password: bcrypt.hashSync("123456789", 8),
        avatar:
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      });

      Role.findOne({
        name: "user",
      }).exec((err, role) => {
        if (err) {
          console.log("error: ", err);

          process.exit();
        }

        user.roles = [role._id];

        user.save((err) => {
          if (err) {
            console.log("error: ", err);
          }

          console.log(
            `\nUser with username: ${user.username} is added to collections`
          );
        });
      });

      // Seed normal user
      // for (let index = 1; index < max; index++) {
      //   const user = new User({
      //     username: faker.internet.userName(),
      //     email: faker.internet.email(),
      //     password: bcrypt.hashSync("123456789", 8),
      //     avatar:
      //       "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_avatar_child_kid-512.png",
      //   });

      //   Role.find(
      //     {
      //       name: {
      //         $in: db.ROLES[Math.floor(Math.random() * db.ROLES.length)],
      //       },
      //     },
      //     (err, roles) => {
      //       if (err) {
      //         console.log("error: ", err);
      //       }

      //       user.roles = roles.map((role) => role._id);

      //       user.save((err) => {
      //         if (err) {
      //           console.log("error: ", err);
      //         }

      //         console.log(
      //           `\nUser with username: ${user.username} is added to collections`
      //         );
      //       });

      //       // University.findOne({
      //       //   name: db.UNIVERSITIES[0],
      //       // }).exec((error, university) => {
      //       //   user.university = university._id;

      //       //   Club.findOne({
      //       //     name: db.CLUBS[0],
      //       //     university: university._id,
      //       //   }).exec((error, club) => {
      //       //     user.club = club._id;

      //       //     user.save((err) => {
      //       //       if (err) {
      //       //         console.log("error: ", err);
      //       //       }

      //       //       console.log(
      //       //         `\nUser with username: ${user.username} is added to collections`
      //       //       );
      //       //     });
      //       //   });
      //       // });
      //     }
      //   );
      // }
    }

    console.log(`\nEnd user seeding`);
  });
};

export default userSeeder;
