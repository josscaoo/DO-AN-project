const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = 4000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Đăng ký người dùng
// server.post("/register", (req, res) => {
//   const { name, email, password } = req.body;
//   const users = router.db.get("users").value();
//   const id = users.length + 1;
//   const newUser = { id, name, email, password };
//   router.db.get("users").push(newUser).write();
//   res.status(200).jsonp({ message: "Registered successfully" });
// });

// // Đăng nhập người dùng
// server.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const user = router.db.get("users").find({ email, password }).value();
//   if (user) {
//     res.status(200).jsonp({ message: "Login successful", user });
//   } else {
//     res.status(401).jsonp({ message: "Invalid email or password" });
//   }
// });

// server.use(router);
// server.listen(PORT, () => {
//   console.log(`JSON Server is running on port ${PORT}`);
// });
