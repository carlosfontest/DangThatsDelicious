const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers')

// Do work here
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.get('/stores', catchErrors(storeController.getStores));

router.post('/add', 
  storeController.upload, 
  catchErrors(storeController.resize), 
  catchErrors(storeController.createStore)
);

router.post('/add/:id',
  storeController.upload, 
  catchErrors(storeController.resize),  
  catchErrors(storeController.updateStore)
);

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);

// 1. Validate data
// 2. Register the user
// 3. Log in the user
router.post('/register', userController.validateRegister);


module.exports = router;
