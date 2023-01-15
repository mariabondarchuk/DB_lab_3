const { Recipe, Baker, Owner, Bakery, Sequelize: { Op } } = require('./models');

(async () => {
  //'Search the bakers who have salary greater than X'
  const salary = 800;
  const bakers = await Baker.findAll({
    where: {
      salary: {
        [Op.gt]: salary
      }
    }
  });
  console.table(bakers.map(({ dataValues }) => dataValues));

  //'Search the recipe which have the name like X',

  const recipes = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: '%Metal%'
      }
    }
  });

  console.table(recipes.map(({ dataValues }) => dataValues));

  // 'Search the owner who have more than X Bakeries'

  const owners = await Owner.findAll({ include: [{ model: Bakery }] })
    .then(o => o.filter(({ Bakeries }) => Bakeries.length > 2));

  console.table(owners.map(({ dataValues }) => dataValues));

})();