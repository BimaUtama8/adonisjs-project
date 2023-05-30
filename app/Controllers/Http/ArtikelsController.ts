// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Artikel from "App/Models/Artikel";
import CreateArtikelValidator from "App/Validators/CreateArtikelValidator";


export default class ArtikelsController {

    public async index({ view }){
        const articles = await Artikel.all();
        return view.render("artikel/view", {articles});
    }

    public async create({view}){
        return view.render("artikel/create");
    }

    public async store({response, request}){
        const payload = await request.validate(CreateArtikelValidator);
        await Artikel.create(payload);
        return response.redirect("/news");
    }

    public async show({view, params}){
        const artikel = await Database.from("artikels").where("slug", params.slug).first();
        return view.render("artikel/show", {artikel});
    }

    public async edit({view, params}){
        const {slug} = params;
        const artikel = await Database.from("artikels").where("slug", slug).first();
        return view.render("artikel/edit", {artikel});
    }

    public async update({request, response, params}){
        const payload = await request.validate(CreateArtikelValidator);
        await Artikel.query().where('slug', params.slug).update(payload);
        return response.redirect("/news");
    }

    public async destroy({response, params}){
        const article = await Artikel.findBy("slug", params.slug);
        if(article){
            article.delete();
            return response.redirect().back();
        }
    }
}
