import { Request, Response } from '@adonisjs/core/build/standalone';
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database';
import ArtikelsController from 'App/Controllers/Http/ArtikelsController';

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})


Route.get("/news", 'ArtikelsController.view').as("news_view");
Route.get('/news/create', 'ArtikelsController.create').as("news_create");
Route.post('/news', 'ArtikelsController.store').as('news_store');


Route.patch("/news/:id", ({ params }) => {
  return {params};
}).where('id', {
  match: /^[0-9]+$/,
  cast: (id) => Number(id),
}).as('news.update');


Route.delete("/news/:id", ({ params }) => {
  return {params};
}).where('id',{
  match: /^[0-9]+$/,
  cast: (id) => Number(id),
}).as('news.delete');