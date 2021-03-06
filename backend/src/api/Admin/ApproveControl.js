export const setApproved = async (app, connection) => {
    app.post("/setApproved", async (req, res, next) => {
        const {id,approved} = req.body;
        await connection.query(
            "UPDATE admins SET isApproved = ? WHERE id = ?",
            [approved,id],
            (error, data) => {
                if (error) console.log(error);
                const result = data;
                return res.send(result);
            }
        );
    });
};
export const releaseApproved = async (app, connection) => {
    app.post("/releaseAppoved", async (req, res, next) => {
        const {id} = req.body;
        await connection.query(
            "UPDATE admins SET isApproved = false WHERE id = ?",
            [id],
            (error, data) => {
            if (error) console.log(error);
            const result = data;
            return res.send(result);
            }
        );
    });
};
export const checkApproved = async (app, connection) => {
    app.post("/checkApproved", async (req, res, next) => {
        const {id} = req.body;
        await connection.query(
            "UPDATE admins SET isApproved = true WHERE id = ?",
            [id],
            (error, data) => {
            if (error) console.log(error);
            const result = data;
            return res.send(result);
            }
        );
    });
};

export const delAdmin = async (app, connection) => {
    app.post("/delAdmin", async (req, res, next) => {
        const {id} = req.body;
        await connection.query(
            "DELETE admins WHERE id = ?",
            [id],
            (error, data) => {
            if (error) console.log(error);
            const result = data;
            return res.send(result);
            }
        );
    });
};
