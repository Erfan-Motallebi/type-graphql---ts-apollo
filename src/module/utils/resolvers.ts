export const resolverMutation = `
  mutation UserRegistration($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
      addUser(first_name: $first_name, last_name: $last_name, email: $email, password: $password) {
        id
        first_name
        last_name
        email
        created_at
        updated_at
      }
  }
 `;
