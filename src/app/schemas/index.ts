import { mergeSchemas } from '@graphql-tools/schema';
import { schema as userSchema } from '../modules/user/schema';
import { schema as pixkeySchema } from '../modules/pixkey/schema';
import { schema as authSchema } from '../modules/auth/schema';
import { schema as tokenSchema } from '../modules/token/schema';

const graphqlSchemas = mergeSchemas({
    schemas: [
        userSchema,
        pixkeySchema,
        authSchema,        
        tokenSchema
    ],
});

export { graphqlSchemas }


