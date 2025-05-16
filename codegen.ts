import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
import type { CodegenConfig } from '@graphql-codegen/cli'
 
// (1)
const config: CodegenConfig = {
  schema: 'src/graphql/**/schema.graphql', // (2)
  generates: {
    'src/graphql': defineConfig({
      // (3)
      resolverGeneration: 'minimal', // (4)
      typesPluginsConfig: {
        contextType: '../context#GraphQLContext' // (5)
      }
    })
  }
}
export default config