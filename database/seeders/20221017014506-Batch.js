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
          sku: 12343275,
          productId: 10,
          batchNumber: 123,
          productionDate: new Date('10/10/2022'),
          state: 'PARA_LIBERAR',
          shatterLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:21,
          sku: 67843212,
          productId: 11,
          batchNumber: 546,
          productionDate: new Date('10/15/2022'),
          state: 'PROCESANDO',
          shatterLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:22,
          sku: 45645323,
          productId: 12,
          batchNumber: 765,
          productionDate: new Date('10/12/2022'),
          state: 'PROCESANDO',
          shatterLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:23,
          sku: 43241765,
          productId: 13,
          batchNumber: 234,
          productionDate: new Date('10/18/2022'),
          state: 'PROCESANDO',
          shatterLevel: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:24,
          sku: 98741456,
          productId: 14,
          batchNumber: 987,
          productionDate: new Date('10/19/2022'),
          state: 'PROCESANDO',
          shatterLevel: 0,
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

    await queryInterface.bulkDelete('Batches', null, {});

  }
};
