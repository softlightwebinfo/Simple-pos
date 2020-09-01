import {Express} from "express";
import * as path from "path";
import * as fs from "fs";

const sharp = require('sharp');

export default (server: Express, services: { bannerService: any, upload: any }) => {
    server.post('/api/banner', services.upload, async (req, res) => {
        // @ts-ignore
        const imageName = req.filename;
        let body = req.body;
        // @ts-ignore
        const {filename: image} = req.file;
        // @ts-ignore
        await sharp(req.file.path)
            .resize(1920)
            .png({quality: 50})
            .toFile(
                // @ts-ignore
                path.resolve(req.file.destination, 'banners', image)
            );
        // @ts-ignore
        fs.unlinkSync(req.file.path);
        services.bannerService.runService('Create', {
            token: req.cookies.token,
            title: body.title,
            subtitle: body.subtitle,
            route: body.route,
            page: body.page,
            button: body.button,
            image: imageName,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString(), data: body})
            }
            return res.json(resp);
        });
    });
    server.put('/api/banner/:id', services.upload, async (req, res) => {
        let body = req.body;
        let imageName = undefined;
        // @ts-ignore
        if (req.file) {
            // @ts-ignore
            imageName = req.filename;
            // @ts-ignore
            const {filename: image} = req.file;
            // @ts-ignore
            await sharp(req.file.path)
                .resize(1920)
                .png({quality: 50})
                .toFile(
                    // @ts-ignore
                    path.resolve(req.file.destination, 'banners', image)
                );
            // @ts-ignore
            fs.unlinkSync(req.file.path);
        }
        services.bannerService.runService('Update', {
            id: req.params.id,
            token: req.cookies.token,
            title: body.title,
            subtitle: body.subtitle,
            route: body.route,
            page: body.page,
            button: body.button,
            image: imageName,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString(), data: body})
            }
            return res.json(resp);
        });
    });
    server.get('/api/banner', (req, res) => {
        // @ts-ignore
        services.bannerService.runService('GetAll', {
            token: req.cookies.token,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString()})
            }
            return res.json(resp);
        });
    });
    server.delete('/api/banner/:id', (req, res) => {
        // @ts-ignore
        services.bannerService.runService('Delete', {
            token: req.cookies.token,
            id: req.params.id,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString()})
            }

            fs.unlink(`./public/images/banners/${req.body.image}`, err => {
                if (err) {
                    return res.status(500).json({error: err.toString()})
                }
                return res.json(resp);
            });
        });
    });
    server.put('/api/banner/:id/inactive', (req, res) => {
        // @ts-ignore
        services.bannerService.runService('active', {
            token: req.cookies.token,
            id: req.params.id,
            active: false,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString()})
            }
            return res.json(resp);
        });
    });
    server.put('/api/banner/:id/active', (req, res) => {
        // @ts-ignore
        services.bannerService.runService('active', {
            token: req.cookies.token,
            id: req.params.id,
            active: true,
        }, (e, resp) => {
            // @ts-ignore
            if (e) {
                // TODO Eliminar imagen cuando falla
                return res.status(500).json({error: e.toString()})
            }
            return res.json(resp);
        });
    });
}
