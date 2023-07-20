/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('comments').del()
  await knex('votes').del()
  await knex('pets').del()
}
