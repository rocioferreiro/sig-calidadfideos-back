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

    await queryInterface.bulkDelete('Products', null, {});

    await queryInterface.bulkInsert(
      'Products',
      [
        {
          id:10,
          SKU: 12345,
          type: 'Moños',
          brand: 'Matarazzo',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:11,
          SKU: 34567,
          type: 'Moños',
          brand: 'Lucchetti',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:12,
          SKU: 98765,
          type: 'Moños',
          brand: 'Terrabusi',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:13,
          SKU: 56789,
          type: 'Codito',
          brand: 'Matarazzo',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:14,
          SKU: 29384,
          type: 'Codito',
          brand: 'Lucchetti',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:15,
          SKU: 73645,
          type: 'Codito',
          brand: 'Favorita',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:16,
          SKU: 10923,
          type: 'Codito',
          brand: 'Canale',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:17,
          SKU: 80684,
          type: 'Tirabuzón',
          brand: 'Matarazzo',
          weight: 500,
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
    await queryInterface.bulkDelete('Products', null, {});
  }
};
