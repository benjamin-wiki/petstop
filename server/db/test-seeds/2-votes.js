/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  return knex('votes').insert([
    {
      petId: 2,
      userId: 'auth0|1234',
    },
    {
      petId: 2,
      userId: 'auth0|5678',
    },
    {
      petId: 2,
      userId: 'auth0|9101',
    },
    {
      petId: 2,
      userId: 'auth0|4312',
    },
    {
      petId: 2,
      userId: 'auth0|1802',
    },
    {
      petId: 2,
      userId: 'auth0|4321',
    },
    {
      petId: 2,
      userId: 'auth0|8911',
    },
  ])
}
