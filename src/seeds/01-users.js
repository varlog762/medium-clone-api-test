const bcrypt = require("bcryptjs")
const faker = require("faker")

const users = [
  {
    name: "noname",
    id: "345ae4d0-f2c3-4342-91a2-5b45cb8db57f",
  },
  {
    name: "greg.p",
    id: "16c1ef84-df72-4be1-ad46-1168ee53cd60",
  },
  {
    name: "jack-london",
    id: "b8d2586f-4746-418c-82b2-db9eff7a7f42",
  },
  {
    name: "some_user",
    email: "john@jacob.com",
    id: "52e1cc10-20b9-4cf2-ad94-3b0c135d35a5",
  },
]

function getUsers() {
  return users.map(u => {
    return {
      id: u.id,
      email: u.email || `${u.name}@demo.com`,
      username: u.name,
      password: bcrypt.hashSync("X12345678", 10),
      bio: faker.lorem.sentences(),
      image: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  })
}

exports.getUsers = getUsers

exports.seed = async function(knex) {
  if (process.env.NODE_ENV === "production") {
    await knex("users")
      .whereIn(
        "email",
        users.map(u => u.email || `${u.name}@demo.com`),
      )
      .del()
  } else {
    await knex("users").del()
  }

  return knex("users").insert(getUsers())
}
