import express from "express";

const router = express.Router();

router.get('/send', (req, res) => {
    res.send("Send message endpoint");
});

// router.post('/recive', (req, res) => {
//     res.send("Recive message endpoint");
// });

export default router;
