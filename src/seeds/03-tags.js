const uuid = require("uuid")

const tags = [
  {
    id: uuid(),
    name: "lorem",
  },
]

exports.seed = async function(knex) {
  await knex("tags").del()

  return knex("tags").insert(tags)
}
