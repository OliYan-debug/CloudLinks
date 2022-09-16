import Link from "../models/Link.js";

export const controller = {
  redirect: async (req, res) => {
    let title = req.params.title;
    let search = await Link.findOneAndUpdate({ title }, { $inc: { views: 1 } });
    if (search) {
      res.redirect(search.url);
    } else {
      res.status(404).send(`
      We don't have any url with ${title}
    `);
    }
  },

  allLinks: async (req, res) => {
    let data = await Link.find().sort({ views: "desc" });
    res.render("pages/all", { data });
  },

  editLink: async (req, res) => {
    let id = req.params.linkId;
    try {
      let data = await Link.findOne({ _id: id });
      res.render("pages/edit", { error: false, link: data });
    } catch (error) {
      res.render("pages/edit", { error: error, link: {} });
    }
  },

  saveEditedLink: async (req, res) => {
    let body = {};
    let id = req.body.id;
    body.title = req.body.title;
    body.url = req.body.url;
    body.description = req.body.description;
    try {
      let link = await Link.findOneAndUpdate({ _id: id }, body);
      res.redirect("/all");
    } catch (error) {
      res.render("pages/edit", {
        error: "Os campos Título e url são obrigatórios",
        link: {},
      });
    }
  },

  latestLinks: async (req, res) => {
    let data = await Link.find().sort({ _id: -1 }).limit(5);
    res.render("pages/index", { data, error: false });
  },

  addLink: async (req, res) => {
    let link = new Link(req.body);
    try {
      await link.save();
      res.render("pages/linkready");
    } catch (error) {
      let data = await Link.find().sort({ _id: -1 }).limit(5);
      res.render("pages/index", {
        data,
        error:
          "Os campos Título e Url devem ser preenchidos para salvar o link",
      });
    }
  },

  deleteLink: async (req, res) => {
    let id = req.params.id;
    try {
      const deletedLink = await Link.findByIdAndDelete(id);
      res.send(deletedLink);
    } catch (error) {
      res.send(error);
    }
  },
};
