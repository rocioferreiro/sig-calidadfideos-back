'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkDelete('Users', null, {});

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id:1,
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:2,
          name: 'Jon Doe',
          email: 'jondoe@example.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:3,
          name: 'Marc Sam',
          email: 'ms@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:4,
          name: 'Alice John',
          email: 'aj@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:5,
          name: 'Peter Parker',
          email: 'pp@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
