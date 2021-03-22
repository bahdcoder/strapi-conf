import Fs from 'fs'
import Http from 'http'

const handler = ({ url }, response) => {
    switch (url) {
        case '/':
            // response.setHeader('cache-control', 'no-store')
            response.end(page('home'))

            break;

        case '/about':
            response.end(page('about'))

            break;

        case '/blog':
            response.end(page('blog'))

            break;
    }
}

const server = Http.createServer(handler)

server.listen(9488)








































const page = (name) => Fs.readFileSync(new URL(`pages/${name}.html`, import.meta.url))
