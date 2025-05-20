const express = require("express");
const app = express();
const usersRouter = require("./src/userTable");

app.use(express.json());
app.use("/users", usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
