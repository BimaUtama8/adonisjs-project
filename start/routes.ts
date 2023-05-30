import { Request, Response } from '@adonisjs/core/build/standalone';
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database';
import ArtikelsController from 'App/Controllers/Http/ArtikelsController';


Route.on('/').render('welcome').as("welcome");

Route.resource("news", "ArtikelsController").paramFor('news', 'slug').middleware({
    edit: ['auth'],
    create: ['auth'],
    store: ['auth'],
    destroy: ['auth'],
});

Route.on('/login').render("auth.login").as("auth.login");

Route.post('/login', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')
  
    await auth.use('web').attempt(email, password);
    return response.redirect("/");
});

Route.post('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    response.redirect('/login')
}).as("auth.logout");