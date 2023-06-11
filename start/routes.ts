// import { Request, Response } from '@adonisjs/core/build/standalone';
import Route from '@ioc:Adonis/Core/Route'
// import Database from '@ioc:Adonis/Lucid/Database';
// import ArtikelsController from 'App/Controllers/Http/ArtikelsController';

//Login
Route.on('/').render('auth/login').as("auth.login");
Route.post('/', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')
  
    await auth.use('web').attempt(email, password);
    return response.redirect("/dashboard");
});

//Register
Route.on('/register').render('auth/register').as("auth.register");
Route.post('/register', 'UsersController.store').as("register.store");

//Dashboard
Route.on('/dashboard').render("home/dashboard").as("home.dashboard");
Route.resource("news", "ArtikelsController").paramFor('news', 'slug').middleware({
    edit: ['auth'],
    create: ['auth'],
    store: ['auth'],
    destroy: ['auth'],
});

//Logout
Route.post('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    response.redirect('/')
}).as("auth.logout");