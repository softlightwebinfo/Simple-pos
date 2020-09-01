import {Express} from "express";
import {SitemapStream, streamToPromise} from 'sitemap';
import fs from 'fs';
import moment from 'moment';
import {slugify} from "../Framework/libs/slug";

export default function generate(server: Express, services: { streamService, studioService }) {
    server.get("/api/sitemap", async (req, res) => {
        try {
            const smStream = new SitemapStream({
                hostname: `https://www.mallorcaliverecordingstudio.com`,
            });
            // List of posts
            // const posts = [];
            smStream.write({url: `/`, changefreq: 'weekly', priority: 1});
            smStream.write({url: `/contact`, changefreq: 'weekly', priority: 0.9});
            smStream.write({url: `/live`, changefreq: 'daily', priority: 0.9});
            smStream.write({url: `/studios`, changefreq: 'daily', priority: 0.9});
            smStream.write({url: `/recording`, changefreq: 'daily', priority: 0.9});
            smStream.write({url: `/rates`, changefreq: 'daily', priority: 0.9});
            smStream.write({url: `/streams`, changefreq: 'daily', priority: 0.9});
            services.streamService.runService('GetAll', {
                token: req.cookies.token,
            }, async (err, reqs) => {
                if (err) {

                } else {
                    let post = reqs.streams;
                    post.forEach((post) => {
                        smStream.write({
                            url: `/stream/${moment(post.createdAt).format("DD-MM-YYYY")}/${slugify(post.title)}/${post.id}`,
                            changefreq: 'weekly',
                            priority: 0.8
                        });
                    });
                }
                services.studioService.runService('GetAll', {
                    token: req.cookies.token,
                }, async (e, resp) => {
                    // @ts-ignore
                    if (e) {

                    } else {
                        resp.Result.forEach((post) => {
                            smStream.write({
                                url: `/studio/${slugify(post.title)}/${post.id}`,
                                changefreq: 'weekly',
                                priority: 0.8
                            });
                        });
                    }
                    // End sitemap stream
                    smStream.end();

                    // XML sitemap string
                    const sitemapOutput = (await streamToPromise(smStream)).toString();

                    // Change headers
                    res.writeHead(200, {
                        'Content-Type': 'application/xml'
                    });
                    fs.writeFile("public/sitemap.xml", sitemapOutput, () => {

                    });
                    // Display output to user
                    res.end(sitemapOutput);
                });
            });
            // // Create each URL row
            // posts.forEach(post => {
            //     smStream.write({
            //         url: `/post/${post.slug}`,
            //         changefreq: 'daily',
            //         priority: 0.9
            //     });
            // });
        } catch (e) {
            console.log(e)
            res.send(JSON.stringify(e))
        }

    })
}