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

    await queryInterface.bulkDelete('Samples', null, {});

    await queryInterface.bulkInsert(
      'Samples',
      [
        {
          id:30,
          state: 'trizado',
          packingDate: new Date('10/10/2022'),
          createdAt: new Date('10/17/2022'),
          updatedAt: new Date('10/17/2022'),
        },
        {
          id:37,
          state: 'visual',
          packingDate: new Date('10/10/2022'),
          createdAt: new Date('10/12/2022'),
          updatedAt: new Date('10/12/2022'),
        },
        {
          id:38,
          state: 'cargado',
          packingDate: new Date('10/10/2022'),
          createdAt: new Date('10/10/2022'),
          updatedAt: new Date('10/10/2022'),
        },
        {
          id:31,
          state: 'visual',
          packingDate: new Date('10/14/2022'),
          createdAt: new Date('10/16/2022'),
          updatedAt: new Date('10/16/2022'),
        },
        {
          id:36,
          state: 'cargado',
          packingDate: new Date('10/14/2022'),
          createdAt: new Date('10/14/2022'),
          updatedAt: new Date('10/14/2022'),
        },
        {
          id:32,
          packingDate: new Date('10/18/2022'),
          state: 'visual',
          createdAt: new Date('10/20/2022'),
          updatedAt: new Date('10/20/2022'),
        },
        {
          id:35,
          packingDate: new Date('10/18/2022'),
          state: 'cargado',
          createdAt: new Date('10/18/2022'),
          updatedAt: new Date('10/18/2022'),
        },
        {
          id:33,
          packingDate: new Date('10/20/2022'),
          state: 'cargado',
          createdAt: new Date('10/20/2022'),
          updatedAt: new Date('10/20/2022'),
        },
        {
          id:34,
          packingDate: new Date('10/21/2022'),
          state: 'cargado',
          createdAt: new Date('10/21/2022'),
          updatedAt: new Date('10/21/2022'),
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
    await queryInterface.bulkDelete('Samples', null, {});
  }
};
