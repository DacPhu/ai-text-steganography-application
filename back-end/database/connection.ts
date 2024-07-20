import db from '../models';

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
