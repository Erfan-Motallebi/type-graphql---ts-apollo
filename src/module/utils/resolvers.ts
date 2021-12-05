export const resolverMutation = `
  mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      addUser(first_name: $firstName, last_name: $lastName, email: $email, password: $password) {
          id
          first_name
          last_name
          email
          created_at
          updated_at
          fullName
  }
}
 `;
