import {Express} from "express";

export default (server: Express, services: { userService: any }) => {
    server.post('/api/user/login', (req, res) => {
        let body = req.body;
        services.userService.runService('Login', {
            email: body.email,
            password: body.password,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                return res.status(500).json({error: e.toString(), data: body})
            }
            res.cookie("token", resp.token);
            res.cookie("user", resp.user.id);
            return res.json(resp);
        });
    });
    server.post('/api/user/register', (req, res) => {
        let body = req.body.data;
        services.userService.runService('Create', {
            email: body.email,
            password: body.password,
            active: true,
            name: body.name,
            phone: [body.phone],
        }, (e, resp) => {
            if (e) {
                return res.status(500).json({error: e.toString(), data: body})
            }
            res.cookie("token", resp.token);
            res.cookie("user", resp.user.id);
            return res.json(resp);
        });
    });
    server.post('/api/user/initial', (req, res) => {
        // @ts-ignore
        if (!req.cookies.user) {
            return res.status(500).json({error: "El usuario no esta logeado"})
        }
        services.userService.runService('Start', {
            // @ts-ignore
            id: req.cookies.user,
            token: req.cookies.token,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                return res.status(500).json({error: e.toString()})
            }
            //res.setHeader('Set-Cookie', serialize('token', resp.token, { path: '/' }));
            //res.setHeader('Set-Cookie', serialize('user', resp.user.id, { path: '/' }));

            res.cookie("token", resp.token);
            res.cookie("user", resp.user.id);
            return res.json(resp);
        });
    });
    server.get('/api/users', (req, res) => {
        // @ts-ignore
        if (!req.cookies.user) {
            return res.status(500).json({error: "El usuario no esta logeado"})
        }
        services.userService.runService('GetAll', {
            token: req.cookies.token,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                return res.status(500).json({error: e.toString()})
            }
            return res.json(resp);
        });
    });
}
