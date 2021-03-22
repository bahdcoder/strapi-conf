import { page, generateEtag, nothingHasChanged } from './helpers.mjs'


import Http from 'http'

const handler = (request, response) => {
    switch (request.url) {
        case '/':
            response.setHeader('cache-control', 'no-store')
            response.end(page('home'))

            break;

        case '/about':
            const about = page('about')
            const etag = generateEtag(about)

            if (nothingHasChanged(request, etag)) {
                response.statusCode = 304

                response.end()
            } else {

                response.setHeader('cache-control', 'max-age: 0, must-revalidate')
                response.setHeader('etag', generateEtag(about))
                response.end(about)
            }

            break;

        case '/blog':
            response.end(page('blog'))

            break;
    }
}

const server = Http.createServer(handler)

server.listen(9488)
