const express= require("express")
const router = express.Router()
const slugify = require("slugify")
const Article = require("../models/article")
const Category = require("../models/category")



router.get("/", (req,res)=>{
    Article.findAll()
        .then((data)=>{
            res.render("admin/articles/home", {
                data
            })
        })
})

router.get("/admin/", (req,res)=>{
    Article.findAll({
        include: [{model: Category}]
    })
        .then((data)=>{
            res.render("admin/articles/admin", {
                data
            })
        })
})

router.get("/new", (req,res)=>{
    Category.findAll().then((data)=>{
        res.render("admin/articles/new", {
            data
        })
    })
})

router.post("/save", (req,res)=>{
    let {title, category, body} = req.body
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect("/article/admin")
    })
})

router.post("/delete", (req,res)=>{
    let {id}= req.body
    Article.destroy({
        where: {id:id}
    }).then(()=>{
        res.redirect("/article/admin")
    })
})

router.get("/edit/:id", (req,res)=>{
    let {id} = req.params
    Article.findByPk(id)
        .then((data)=>{
            res.render("admin/articles/edit", {
                data
            })
        })
})

router.post("/edit", (req,res)=>{
    let {id, title, body} = req.body
    Article.update({title: title, slug: slugify(title), body: body},{where:{id:id}})
        .then(()=>{
            res.redirect("/article/admin")
        })
})

module.exports = router