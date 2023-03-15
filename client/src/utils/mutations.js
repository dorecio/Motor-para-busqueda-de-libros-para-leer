import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user{
        _id
        username
      }
    }
  }
`;
 
export const ADD_USER = gql`
   mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user{
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId:ID!, $bookId!:String!,$authors:[String],description:String!,$title:String!,$image:String,$link:String) {
    saveBook(username: $username, email: $email, password: $password,bookId: $bookId,authors:$authors,description:$description,title:$title,image:$image,link:$link) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
 mutation  removeBook($userId:ID!, $bookId!:String!){
    removeBook(userId:$userId,bookId:$bookId){
     token
      user {
        _id
        username
      }
    }
 }
 `;