export const setBan = async (app, connection) => {
    app.post("/setBan", async (req, res, next) => {
        const {id,ban} = req.body;
        await connection.query(
            "UPDATE users SET ban = ? WHERE id = ?",
            [ban,id],
            (error, data) => {
            if (error) console.log(error);
            const result = data;
            return res.send(result);
            }
        );
    });
};
export const releaseBan = async (app, connection) => {
    app.post("/releaseBan", async (req, res, next) => {
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
export const checkBan = async (app, connection) => {
    app.post("/checkBan", async (req, res, next) => {
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
