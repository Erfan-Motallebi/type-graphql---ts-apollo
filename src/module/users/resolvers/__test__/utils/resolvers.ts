export const resolverMutation = `
  mutation UserRegistration($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
      addUser(first_name: $firstname, lastname: $lastname, email: $email, password: $password) {
        id
        first_name
        last_name
        email
        conformity
        created_at
        updated_at
      }

  }
 `;
