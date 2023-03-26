const express = require("express");
const cors = require("cors");
const Events = require("./eventsConfig");
const Admin = require('./adminConfig');
const app = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(cors());

// CRUD API for Events
app.post('/createEvents', upload.single('file'), async (req, res) => {
  try {
    const data = req.body;

    // Upload file to Firebase Storage
    let fileUrl;
    if (req.file) {
      const fileRef = storageRef.child(req.file.originalname);
      await fileRef.put(req.file.buffer);
      fileUrl = await fileRef.getDownloadURL();
      data.fileUrl = fileUrl;
    }

    await Events.add(data);
    res.send({ msg: 'Event Added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});
// OLD READ EVENTS API "DONT DELETE"
// app.get("/readEvents", async (req, res) => {
//   const viewData = await Events.get();
//   const list = viewData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   res.send(list);
// });
app.post("/updateEvents", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  await Events.doc(id).update(req.body);
  res.send({ msg: "Event Updated" });
});
app.post("/deleteEvents", async (req, res) => {
  const id = req.body.id;
  await Events.doc(id).delete();
  res.send({ msg: "Event Deleted" });
});
// READ Events API with SEARCH FUNCTIONALITY
app.get("/readEvents", async (req, res) => {
  const queryParams = req.query; // Retrieve the query parameters from the request
  const eventsRef = require('./eventsConfig');
  let query = eventsRef;

  if (queryParams.startDate) {
    console.log("startDate:", queryParams.startDate);
    query = query.where("startDate", ">=", queryParams.startDate);
  }
  if (queryParams.endDate) {
    console.log("endDate:", queryParams.endDate);
    query = query.where("endDate", "<=", queryParams.endDate);
  }
  if (queryParams.status) {
    console.log("status:", queryParams.status);
    query = query.where("status", "==", queryParams.status);
  }
  if (queryParams.location) {
    console.log("location:", queryParams.location);
    query = query.where("location", "==", queryParams.location);
  }

  console.log("query:", query.toString());

  const viewData = await query.get();
  const list = viewData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

// CRUD API for Admin Accounts
app.post("/createAdmin", async (req, res) => {
  const data = req.body;
  await Admin.add(data);
  res.send({ msg: "Admin Account Added" });
});
app.get("/readAdmin", async (req, res) => {
  const viewData = await Admin.get();
  const list = viewData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});
app.post("/updateAdmin", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  await Admin.doc(id).update(req.body);
  res.send({ msg: "Admin Account Updated" });
});
app.post("/deleteAdmin", async (req, res) => {
  const id = req.body.id;
  await Admin.doc(id).delete();
  res.send({ msg: "Admin Account Deleted" });
});

// Admin login route
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  const adminData = await Admin.where("username", "==", username)
    .where("password", "==", password)
    .get();

  if (adminData.empty) {
    res.status(200).send({ success: false, msg: "Invalid credentials" });
  } else {
    const admin = adminData.docs[0].data();
    res.send({ success: true, msg: "Login successful", admin });
  }
});


app.listen(4000, () => console.log("Server running in localhost:4000"));
