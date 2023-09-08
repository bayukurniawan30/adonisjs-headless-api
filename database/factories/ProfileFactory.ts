import Profile from 'App/Models/Profile'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Profile, ({ faker }) => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }
}).build()
