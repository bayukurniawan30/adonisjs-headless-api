import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export const { policies } = Bouncer.registerPolicies({
  MediaPolicy: () => import('App/Policies/MediaPolicy'),
})
