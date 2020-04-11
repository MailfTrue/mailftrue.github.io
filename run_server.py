from http.server import HTTPServer, SimpleHTTPRequestHandler


class RequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        """Serve a GET request."""
        if any(k in ['/about/', '/verse/'] for k in [self.path, self.path+'/']):
            self.path = '/'
        f = self.send_head()
        if f:
            try:
                self.copyfile(f, self.wfile)
            finally:
                f.close()


if __name__ == '__main__':
    server = HTTPServer(('', 8000), RequestHandler)
    print('Run server on 127.0.0.1:8000')
    server.serve_forever()
