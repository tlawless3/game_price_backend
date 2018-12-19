export const resolvers = {
  Query: {
    name(root, args, context, info) {
      return 'Rajat S';
    },
    alias(root, {
      heroName
    }, context, info) {
      return heroName;
    }
  },
};