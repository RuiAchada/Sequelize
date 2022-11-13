"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      // queryInterface is not like the model instance, it doesn't generate the auto fields (id, uuid, etc)
      "users",
      [
        {
          name: "John Doe",
          email: "john@email.com",
          uuid: "8cf1d850-0446-4057-aa56-1847d19386d0",
          role: "admin",
          createdAt: "2022-11-13T20:35:54.532Z",
          updatedAt: "2022-11-13T20:35:54.532Z"
        },
        {
          name: "Jane Doe",
          email: "jane@email.com",
          uuid: "8cf1d850-0446-4057-aa56-1227d14386e1",
          role: "admin",
          createdAt: "2022-11-13T20:35:54.532Z",
          updatedAt: "2022-11-13T20:35:54.532Z"
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // deletes all users
    await queryInterface.bulkDelete("users", null, {})
  }
}
