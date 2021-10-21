import "dotenv/config";
import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastMessagesController } from "./controllers/GetLastMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

router.get("/messages/list", new GetLastMessagesController().handle);
router.get("/user/info", ensureAuthenticated, new ProfileUserController().handle);

router.get("/", (req, res) => {
  return res.json("Parabens , sua primeira aplicacao com node");
});

router.get("/github", (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

router.get("/signin/callback", (req, res) => {
  const { code } = req.query;
  return res.json(code);
});

export { router };
