import {Express} from "express";
import path from "path";
import fs from "fs";

const sharp = require('sharp');

export default (server: Express, services: { studioService: any, upload: any, uploadMultiple: any }) => {
    server.post('/api/studio', services.upload, async (req, res) => {
        const body = req.body;
        services.studioService.runService('Create', {
            token: req.cookies.token,
            title: body.title,
            description: body.description,
            capacity: body.capacity,
            isPrice: body.isPrice,
            priceFrom: body.priceFrom,
            size: body.size,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString(), data: body})
            }
            return res.json(resp);
        });
    });
    server.put('/api/studio/:id/prices', async (req, res) => {
        const body = req.body;
        services.studioService.runService('UpdatePrices', {
            token: req.cookies.token,
            id: req.params.id,
            prices: req.body.prices,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString(), data: body})
            }
            return res.json(resp);
        });
    });
    server.get('/api/studios', async (req, res) => {
        const body = req.body;
        services.studioService.runService('GetAll', {
            token: req.cookies.token,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString(), data: body})
            }
            return res.json(resp);
        });
    });
    server.get('/api/studios/prices', async (req, res) => {
        const body = req.body;
        services.studioService.runService('GetAllPrices', {
            token: req.cookies.token,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString(), data: body})
            }
            return res.json(resp);
        });
    });
    server.put('/api/studio/:id/images', services.uploadMultiple, async (req, res) => {
        // @ts-ignore
        for (const item of req.files) {
            const {filename: image} = item;
            await sharp(item.path)
                .resize(1024)
                .png({quality: 50})
                .toFile(
                    path.resolve(item.destination, 'studios', image)
                );
            services.studioService.runService('UpdateImages', {
                token: req.cookies.token,
                image: image,
                id: req.params.id,
            }, (req, err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(req);
                }
            });
            fs.unlinkSync(item.path);
        }
        return res.json({});
    });
}
