const express = require( 'express' );
const router = express.Router();
const {
    createRecord,
    getRecords,
    getRecord,
    updateRecord,
    deleteRecord,
} = require('../controller/recordController')
// const {userAuth} = require('../middleware/authMiddleware')
const auth = require('../controller/authorization')
    
router.post( "/records/:id", auth, createRecord );
router.get( "/records", auth, getRecords );
router.get( "/records/:id", auth, getRecord );
router.put( "/records/:id", auth, updateRecord );
router.delete( "/records/:id", auth, deleteRecord );



module.exports = router;