/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('pets', (table) => {
    table.increments('id').primary()
    table.string('ownerId').notNullable()
    table.string('name').notNullable()
    table.string('bio')
    table
      .string('imageUrl')
      .defaultTo('https://wallpaperaccess.com/full/2378663.jpg')
    table.string('animal')
    table.integer('points')
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('pets')
}
