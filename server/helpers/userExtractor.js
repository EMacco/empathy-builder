/**
 * @param {user} user object from the database
 * @param {token} token gotten from payload
 */

const userExtractor = (user, token) => {
  const {
    email,
    id,
    firstname,
    lastname,
    phone
  } = user;
  return {
    id,
    firstname,
    lastname,
    phone,
    email,
    token,
  };
};

export default userExtractor;
