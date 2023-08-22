const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const townRoute = require('./town.js')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); 
router.use('/town', townRoute);
//router.use('/activities', ActivityRoute);

module.exports = router;
