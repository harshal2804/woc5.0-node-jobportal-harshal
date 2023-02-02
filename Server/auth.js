const router = require('express').Router()

router.get("/login/success", (req, res) => {
    if (req.query.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.query.user,
            accessToken: req.query.accessToken    
        });
    }
    else{
        res.json({ status:'error'})
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

module.exports = router