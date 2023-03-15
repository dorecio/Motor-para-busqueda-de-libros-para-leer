const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Number
    saveBooks: [Book]
  }

  type Book{
    bookId:String!
    authors:[String]
    description:String!
    title:String!
    image:String
    link:String 
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
  #  getSingleUser(_Id: ID!): User
    me:User
  }

  type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(
        title:String!,
        link:String,
        image:String,
        bookId:String!,
        description:String!,
        authors:[String]:Book
   
    removeBook(userId:ID!, bookId: ID!): Book
  }
`;

module.exports = typeDefs;
