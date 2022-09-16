import { Router, urlencoded } from "express";
import { controller } from "../controllers/linkController.js";

const router = Router();

router.get("/linkready", (req, res) => res.render("pages/linkready"));

router.get("/all", async (req, res) => {
  controller.allLinks(req, res);
});

router.get("/:title", async (req, res) => {
  controller.redirect(req, res);
});

router.get("/", async (req, res) => {
  controller.latestLinks(req, res);
});

router.get("/edit/:linkId", async (req, res) => {
  controller.editLink(req, res);
});

router.post("/edit/", urlencoded({ extended: true }), async (req, res) => {
  controller.saveEditedLink(req, res);
});

router.post("/", urlencoded({ extended: true }), async (req, res) => {
  controller.addLink(req, res);
});

router.delete("/:id", async (req, res) => {
  controller.deleteLink(req, res);
});

export default router;
