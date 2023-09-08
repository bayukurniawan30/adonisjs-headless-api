import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import ProfileFactory from './ProfileFactory'

export default Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('profile', () => ProfileFactory)
  .build()
