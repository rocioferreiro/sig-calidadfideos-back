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
          type: 'Mostachol Liso',
          brand: 'Marolio',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:11,
          type: 'Rigatti',
          brand: 'Marolio',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:12,
          type: 'Tirabuzon',
          brand: 'Marolio',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:13,
          type: 'Tallarines',
          brand: 'Marolio',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:14,
          type: 'Codito',
          brand: 'Marolio',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:15,
          type: 'Mostachol',
          brand: 'Lucchetti',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:16,
          type: 'Moños',
          brand: 'Lucchetti',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:17,
          type: 'Tirabuzon',
          brand: 'Lucchetti',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:18,
          type: 'Tallarines',
          brand: 'Lucchetti',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:19,
          type: 'Codito',
          brand: 'Lucchetti',
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
