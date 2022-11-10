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
    await queryInterface.bulkDelete('Batches', null, {});

    await queryInterface.bulkInsert(
      'Batches',
      [
        {
          id:20,
          productId: 10,
          batchNumber: 1234567891,
          productionDate: new Date('11/02/2022'),
          state: 'PARA LIBERAR',
          shatterLevel: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:21,
          productId: 11,
          batchNumber: 5466784321,
          productionDate: new Date('11/03/2022'),
          state: 'PROCESANDO',
          shatterLevel: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:22,
          productId: 12,
          batchNumber: 7645645323,
          productionDate: new Date('11/05/2022'),
          state: 'PROCESANDO',
          shatterLevel: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:23,
          productId: 13,
          batchNumber: 2343241765,
          productionDate: new Date('11/06/2022'),
          state: 'PROCESANDO',
          shatterLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:24,
          productId: 14,
          batchNumber: 9898741456,
          productionDate: new Date('11/08/2022'),
          state: 'PROCESANDO',
          shatterLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
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

    await queryInterface.bulkDelete('Batches', null, {});

  }
};
