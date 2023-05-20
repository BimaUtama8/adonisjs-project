// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import { schema } from '@ioc:Adonis/Core/Validator';
import CreateArtikelValidator from "App/Validators/CreateArtikelValidator";

export default class ArtikelsController {
    public async view({ view }){
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
            slug:payload.judul,
        });
        return response.redirect().back();
    }
}
