const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

// Create
router.post("/api/soccerplayers", async (req, res) => {
  try {
    await db
      .collection("soccerplayers")
      .doc("/" + req.body.id + "/")
      .create({ 
        name: req.body.name ,
        age: req.body.age ,
        soccerfan: req.body.soccerfan 
      });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/api/soccerplayers/:product_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("soccerplayers").doc(req.params.product_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

router.get("/api/soccerplayers", async (req, res) => {
  try {
    let query = db.collection("soccerplayers");
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/api/soccerplayers/:product_id", async (req, res) => {
  try {
    const document = db.collection("soccerplayers").doc(req.params.product_id);
    await document.update({
      name: req.body.name,
      
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

router.delete("/api/soccerplayers/:product_id", async (req, res) => {
  try {
    const doc = db.collection("soccerplayers").doc(req.params.product_id);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
