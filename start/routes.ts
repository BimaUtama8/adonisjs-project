import { Request, Response } from '@adonisjs/core/build/standalone';
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database';
import ArtikelsController from 'App/Controllers/Http/ArtikelsController';

Route.on('/').render('welcome').as("welcome");

Route.resource("news", "ArtikelsController").paramFor('news', 'slug');