import {Express} from "express";

export default (server: Express, services: { storeService: any }) => {
    server.get('/api/stores', (req, res) => {
        let body = req.body;
        services.storeService.runService('GetAll', {

        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                return res.status(500).json({error: e.toString(), data: body})
            }
            return res.json(resp);
        });
    });
}
