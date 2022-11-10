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
          id:1,
          state: 'NO_SAMPLE',
          packingDate: new Date('1/1/1800'),
          createdAt: new Date('1/1/1800'),
          updatedAt: new Date('1/1/1800'),
        },
        {
          id:30,
          state: 'trizado',
          packingDate: new Date('11/02/2022'),
          createdAt: new Date('11/08/2022'),
          updatedAt: new Date('11/08/2022'),
        },
        {
          id:37,
          state: 'visual',
          packingDate: new Date('11/02/2022'),
          createdAt: new Date('11/04/2022'),
          updatedAt: new Date('11/04/2022'),
        },
        {
          id:38,
          state: 'cargado',
          packingDate: new Date('11/02/2022'),
          createdAt: new Date('11/02/2022'),
          updatedAt: new Date('11/02/2022'),
        },
        {
          id:31,
          state: 'visual',
          packingDate: new Date('11/03/2022'),
          createdAt: new Date('11/05/2022'),
          updatedAt: new Date('11/05/2022'),
        },
        {
          id:36,
          state: 'cargado',
          packingDate: new Date('11/03/2022'),
          createdAt: new Date('11/03/2022'),
          updatedAt: new Date('11/03/2022'),
        },
        {
          id:32,
          packingDate: new Date('11/05/2022'),
          state: 'visual',
          createdAt: new Date('11/07/2022'),
          updatedAt: new Date('11/07/2022'),
        },
        {
          id:35,
          packingDate: new Date('11/05/2022'),
          state: 'cargado',
          createdAt: new Date('11/05/2022'),
          updatedAt: new Date('11/05/2022'),
        },
        {
          id:33,
          packingDate: new Date('11/06/2022'),
          state: 'cargado',
          createdAt: new Date('11/06/2022'),
          updatedAt: new Date('11/06/2022'),
        },
        {
          id:34,
          packingDate: new Date('11/08/2022'),
          state: 'cargado',
          createdAt: new Date('11/08/2022'),
          updatedAt: new Date('11/08/2022'),
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
