import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export const { policies } = Bouncer.registerPolicies({
  MediaPolicy: () => import('App/Policies/MediaPolicy'),
  CollectionPolicy: () => import('App/Policies/CollectionPolicy'),
  SingletonPolicy: () => import('App/Policies/SingletonPolicy'),
})
