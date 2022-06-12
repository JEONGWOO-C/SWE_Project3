export const setBan = async (app, connection) => {
    app.post("/setBan", async (req, res, next) => {
        const {id} = req.body;
        await connection.query(
            "UPDATE users SET ban = true WHERE id = ?",
            [id],
            (error, data) => {
            if (error) console.log(error);
            const result = data;
            return res.send(result);
            }
        );
    });
};
export const releasetBan = async (app, connection) => {
    app.post("/releasetBan", async (req, res, next) => {
        const {id} = req.body;
        await connection.query(
            "UPDATE users SET ban = false WHERE id = ?",
            [id],
            (error, data) => {
            if (error) console.log(error);
            const result = data;
            return res.send(result);
            }
        );
    });
};
