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

    await queryInterface.bulkDelete('ChangeReports', null, {});

    await queryInterface.bulkInsert(
      'ChangeReports',
      [
        {
          id: 40,
          type: 'creation',
          date: new Date('10/10/2022'),
          lastSampleId: 37,
          newSampleId: 30,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 41,
          type: 'creation',
          date: new Date('10/14/2022'),
          lastSampleId: null,
          newSampleId: 36,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 42,
          type: 'creation',
          date: new Date('10/18/2022'),
          lastSampleId: null,
          newSampleId: 35,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 43,
          type: 'creation',
          date: new Date('10/20/2022'),
          lastSampleId: null,
          newSampleId: 33,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 44,
          type: 'creation',
          date: new Date('10/21/2022'),
          lastSampleId: null,
          newSampleId: 34,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 45,
          type: 'visual',
          date: new Date('10/20/2022'),
          lastSampleId: 35,
          newSampleId: 32,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 46,
          type: 'visual',
          date: new Date('10/16/2022'),
          lastSampleId: 36,
          newSampleId: 31,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 47,
          type: 'visual',
          date: new Date('10/12/2022'),
          lastSampleId: 38,
          newSampleId: 37,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 48,
          type: 'coccion',
          date: new Date('10/17/2022'),
          lastSampleId: 37,
          newSampleId: 30,
          userId: 3,
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
    await queryInterface.bulkDelete('ChangeReports', null, {});
  }
};
