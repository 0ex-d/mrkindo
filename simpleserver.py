import sys
import time
import logging

import http.server
import socketserver

from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler

logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
path = sys.argv[1] if len(sys.argv) > 1 else '.'
event_handler = LoggingEventHandler()
observer = Observer()
observer.schedule(event_handler, path, recursive=True)
observer.start()

try:
	while True:
		time.sleep(1)
	httpd.serve_forever()
except KeyboardInterrupt:
	observer.stop()
	observer.join()

PORT = 7000

Handler = http.server.SimpleHTTPRequestHandler

httpd = socketserver.TCPServer(("", PORT), Handler)

print("Server started at port ", PORT)
httpd.serve_forever()