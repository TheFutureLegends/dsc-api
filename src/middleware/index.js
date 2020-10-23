import authJwt from "./authJwt.js";
import verifySignUp from "./verifySignUp.js";
import fileUpload from "./fileUpload.js"

const middleware = {
  authJwt,
  verifySignUp,
  fileUpload,
};

export default middleware;
