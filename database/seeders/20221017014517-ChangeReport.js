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
          lastSampleId: 1,
          newSampleId: 38,
          shatterLevel: 0,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 41,
          type: 'creation',
          date: new Date('10/14/2022'),
          lastSampleId: 1,
          newSampleId: 36,
          shatterLevel: 0,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 42,
          type: 'creation',
          date: new Date('10/18/2022'),
          lastSampleId: 1,
          newSampleId: 35,
          shatterLevel: 0,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 43,
          type: 'creation',
          date: new Date('10/20/2022'),
          lastSampleId: 1,
          newSampleId: 33,
          shatterLevel: 0,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 44,
          type: 'creation',
          date: new Date('10/21/2022'),
          lastSampleId: 1,
          newSampleId: 34,
          shatterLevel: 0,
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
          shatterLevel: 22,
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
          shatterLevel: 14,
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
          shatterLevel: 7,
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
          shatterLevel: 11,
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
