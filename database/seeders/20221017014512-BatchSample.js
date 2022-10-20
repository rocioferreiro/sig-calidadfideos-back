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

    await queryInterface.bulkDelete('BatchSamples', null, {});

    await queryInterface.bulkInsert(
      'BatchSamples',
      [
        {
          BatchId: 20,
          SampleId: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BatchId: 20,
          SampleId: 37,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BatchId: 20,
          SampleId: 38,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BatchId: 21,
          SampleId: 31,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BatchId: 21,
          SampleId: 36,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BatchId: 22,
          SampleId: 32,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BatchId: 22,
          SampleId: 35,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BatchId: 23,
          SampleId: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          BatchId: 24,
          SampleId: 34,
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
  }
};
