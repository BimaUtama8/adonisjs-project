import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({response, request}) {
    const payload = await request.validate(CreateUserValidator)
    await User.create(payload);
    return response.redirect("/");
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
