import authJwt from "./authJwt.js";
import verifySignUp from "./verifySignUp.js";
import permission from "./permission.js";
import checkFileAndUpload from "./checkFileAndUpload.js";

const middleware = {
  authJwt,
  verifySignUp,
  permission,
  checkFileAndUpload,
};

export default middleware;
