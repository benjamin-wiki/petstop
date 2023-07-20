/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex('comments').insert([
    { id: 1, authorId: 'auth0|1234', petId: 1, content: 'That tail wag! ❤️‍🔥' },
    {
      id: 2,
      authorId: 'auth0|1234',
      petId: 2,
      content: 'Best smile award! 🏆😁',
    },
    {
      id: 3,
      authorId: 'auth0|4567',
      petId: 2,
      content: 'Adorable fur baby! 😍',
    },
    {
      id: 4,
      authorId: 'auth0|1234',
      petId: 3,
      content: 'Aww, what a sweetheart! 😊',
    },
  ])
}
