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
                res.send({message:"done, activity created and related with the countries"})
            }
            else {
                res.send({message:"done, olny the activity was created"})
            }
        }
        else { res.status(400).send({ message: "activity already exist" }) }
    } catch (error) {
       
        next(error);
    }
})

//rel act and country
router.post("/activity", async (req, res, next) => {

    try {
        let params = req.body;
        let cnt = await Country.findOne({ where: { id: params.countryId } });
        let act = await Activity.findOne({ where: { id: params.activityId } });
        res.send(await cnt.addActivity(act));
    } catch (error) {
        next(error);
    }
});

// router.post("/activity", (req, res, next) => {

//     //let params = req.body
//     let promises = [];
//     let countries = [];
//     req.boycountriesId.forEach(element => {
//        Country.findOne({ where: { id: element }}).then(res=>promises.push(res))
//     });
//     Promise.all(promises).then(value=> countries.push(value)).catch(err=>next(err))

//     res.send(promises)
//     // let cnt = await Country.findOne({ where: { id: paraycountriesId } });
//     // let act = await Activity.findOne({ where: { id: params.activityId } });
//     // res.send(await cnt.addActivity(act));

// });


// get activity by id
router.get("/activity/:id", async (req, res, next) => {
    let { id } = req.params;
    try {
        let cnt = await Country.findOne({ where: { id: id } });
        let acts = await cnt.getActivities();
        res.send(acts.length ? acts : "no related activities found");
    } catch (error) {
        next(error);
    }
});



router.get("/", (req, res, next) => {
    Activity.findAll().then((response) => res.send(response)).catch((err) => { next(err); })
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

//filter by any
router.get("/:NameActivity", async (req, res, next) => {
    let { NameActivity } = req.params;
    let { order, name, continent } = req.query;
    let continents = ["Europe", "Asia", "Americas", "Africa", "Oceania", "Antarctic"]
    try {
        console.log(NameActivity)
        let activity = await Activity.findOne({ where: { name: NameActivity } });
        let countries = await activity.getCountries({ order: [["name", "ASC"]] });

        if (!name && !order) res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent) : countries)
        else if (name) {
            countries = await activity.getCountries({ order: [["name", "ASC"]], where: { name: { [Op.substring]: `%${name}%` } } });
            if (!order) res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent) : countries)
            else if (order) {
                order.includes("A") ? countries : countries = await activity.getCountries({ order: [["population", "ASC"]], where: { name: { [Op.substring]: `%${name}%` } } })
                //res.send("si")
                if (order === "A-Z") res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent) : countries)
                else if (order === "Z-A") res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent).reverse() : countries.reverse())
                else if (order === "lower population") res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent) : countries)
                else if (order === "higher population") res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent).reverse() : countries.reverse())
            }
        } else if (!name) {
            order.includes("A") ? countries : countries = await activity.getCountries({ order: [["population", "ASC"]] })
            //res.send("si")
            if (order === "A-Z") res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent) : countries)
            else if (order === "Z-A") res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent).reverse() : countries.reverse())
            else if (order === "lower population") res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent) : countries)
            else if (order === "higher population") res.send(continents.includes(continent) ? countries.filter(e => e.continent === continent).reverse() : countries.reverse())
        }

    } catch (error) {
        next(error);
    }
});

module.exports = router;