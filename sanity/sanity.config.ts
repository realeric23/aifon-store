import {visionTool} from '@sanity/vision'
import {account, user} from 'next-auth-sanity/schemas'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'aifon-store',

  projectId: 'xcbou3bl',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes.concat([user, account]),
  },
})
