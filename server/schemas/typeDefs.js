const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    userName: String!
    email: String!
    password: String!
    saveBooks: [Book]
  }

  type Book{
     title:String!
     link:String
     image:String
     bookId:String!
     description:String!
     authors:[String]

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser(_Id: ID!): User
    me:User
  }

  type Mutation {
    createUser(userName: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth

    saveBook(
        title:String!,
        link:String,
        image:String,
        bookId:String!,
        description:String!,
        authors:[String]): Profile
        )
   
    deleteBook(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
