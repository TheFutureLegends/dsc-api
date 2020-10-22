import authJwt from "./authJwt.js";
import verifySignUp from "./verifySignUp.js";

const middleware = {
  authJwt,
  verifySignUp,
};

export default middleware;
