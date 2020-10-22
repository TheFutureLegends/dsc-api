var authConfig = {
  expiresIn: process.env.expiresIn || 86400, // 24 hours
  secret: process.env.secret || "rrmit-developer-student-club",
};

export default authConfig;
