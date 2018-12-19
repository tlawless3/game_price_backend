import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schemas/schema';
import {
  db
} from './db/db'

const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
  return response.json({
    msg: 'Hello World'
  })
})

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  context: {
    userId: 1
  }
}));


app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

db.sync()