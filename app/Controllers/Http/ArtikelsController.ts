// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import { schema } from '@ioc:Adonis/Core/Validator';
import CreateArtikelValidator from "App/Validators/CreateArtikelValidator";
import { Response } from "@adonisjs/core/build/standalone";

export default class ArtikelsController {
    public async index({ view }){
        const articles = await Database.from("artikel").select("*");
        return view.render("artikel/view", {articles});
    }

    public async create({view}){
        return view.render("artikel/create");
    }

    public async store({response, request}){
        const payload = await request.validate(CreateArtikelValidator);
        await Database.table('artikel').insert({
            ...payload,
            slug:payload.judul.replace(" ","-")+ +new Date(),
        });
        return response.redirect("/news");
    }

    public async show({view, params}){
        const artikel = await Database.from("artikel").where("slug", params.slug).first();
        return view.render("artikel/show", {artikel});
    }

    public async edit({view, params}){
        const {slug} = params;
        const artikel = await Database.from("artikel").where("slug", slug).first();
        return view.render("artikel/edit", {artikel});
    }

    public async update({request, response, params}){
        const payload = await request.validate(CreateArtikelValidator);
        await Database.from('artikel').where('slug', params.slug).update(payload);
        return response.redirect("/news");
    }

    public async destroy({response, params}){
        await Database.from('artikel').where('slug', params.slug).delete();
        return response.redirect().back();
    }
}
