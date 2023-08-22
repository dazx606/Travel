const { response } = require('express');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Activity, Country, Op } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//create activity
router.post("/", async (req, res, next) => {
    let { name, length, difficulty, season, countries } = req.body

    try {
        if (!name) { res.status(400).send({ message: "missing data" }) }
        let newActivity = await Activity.findOrCreate(
            {
                where: { name: name },
                defaults: {
                    length,
                    difficulty,
                    season
                }
            })
        if (newActivity[1]) {
            if (countries) {
                countries.forEach(async (e) => {
                    let country = await Country.findOne({ where: { id: e } });
                    country.addActivity(newActivity[0]);
                });
                res.send({ message: "done, activity created and related with the countries" })
            }
            else {
                res.send({ message: "done, olny the activity was created" })
            }
        }
        else { res.status(400).send({ message: "activity already exist" }) }
    } catch (error) {

        next(error);
    }
})



router.get("/", (req, res, next) => {
    res.status(201).json({ status: 200, message: 'si' })

});


router.delete("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        await Activity.destroy({ where: { id: id } });
        res.send("done")
    } catch (error) {
        next(error)
    }
});


module.exports = router;