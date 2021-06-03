const express= require("express")
const router = express.Router()
const Category = require("../models/category")
const slugify = require("slugify")

router.get("/new", (req,res)=>{
    res.render("admin/categories/new")
})

router.post("/save", (req,res)=>{
    let {title} = req.body
    if(title != ""){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/categories")
        })
    }else{
        res.redirect("/categories/now")
    }
})

router.post("/delete", (req,res)=>{
    let {id} = req.body
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/categories")
            })
        }else{
            res.redirect("/categories")
        }
    }else{
        res.redirect("/categories")
    }
})

router.post("/updated", (req,res)=>{
    let {id, title} = req.body
    Category.update({title: title, slug: slugify(title)},{
        where: {id:id}
    })
        .then(()=>{
            res.redirect("/categories")
        })
        .catch(()=>{
            res.redirect("/categories")
        })
})

router.get("/edit/:id", (req,res)=>{
    let {id} = req.params
    Category.findByPk(id).then((result)=>{
        res.render("admin/categories/edit", {
            result
        })
    })
})

router.get("/", (req,res)=>{
    Category.findAll()
        .then((category)=>{
            res.render("admin/categories/home", {
                category
            })
        })
})

module.exports = router