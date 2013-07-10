#Copyright Jon Berg , turtlemeat.com

import string,cgi,time
from os import curdir, sep
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import urlparse
import urllib
import os
#import pri

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):
	try:
	    o = urlparse.urlparse(self.path)
	    print o.path
	    if o.path == '/nbm.html':
		params = urlparse.parse_qs(o.query)
		if params['title'] and params['url']:
		    print urllib.unquote(params['title'][0]) + " " + urllib.unquote(params['url'][0])
		    os.system("/home/mer/bin/nbm \"" + urllib.unquote(params['title'][0]) + "\" \"" + urllib.unquote(params['url'][0]) + "\"")
		    self.send_response(200)
		    self.send_header('Content-type',	'text/html')
		    self.end_headers()
		    self.wfile.write("<b>ok</b>")
	    elif o.path == '/youtube.html':
		params = urlparse.parse_qs(o.query)
		if params['url']:
		    print urllib.unquote(params['url'][0])
		    os.system("/usr/bin/smplayer \"" + urllib.unquote(params['url'][0]) + "\"")
		    self.send_response(200)
		    self.send_header('Content-type',	'text/html')
		    self.end_headers()
		    self.wfile.write("<b>ok</b>")
	    elif o.path == '/firefox.html':
		params = urlparse.parse_qs(o.query)
		if params['url']:
		    print urllib.unquote(params['url'][0])
		    os.system("/home/mer/noindex/fennec/run-mozilla.sh /home/mer/noindex/fennec/fennec \"" + urllib.unquote(params['url'][0]) + "\"")
		    self.send_response(200)
		    self.send_header('Content-type',	'text/html')
		    self.end_headers()
		    self.wfile.write("<b>ok</b>")
	    return
	    #if self.path.endswith(".nbm"):
		#f = open(curdir + sep + self.path) #self.path has /test.html
##note that this potentially makes every file on your computer readable by the internet

		#self.send_response(200)
		#self.send_header('Content-type',	'text/html')
		#self.end_headers()
		#self.wfile.write(f.read())
		#f.close()
		#return
	    #if self.path.endswith(".esp"):   #our dynamic content
		#self.send_response(200)
		#self.send_header('Content-type',	'text/html')
		#self.end_headers()
		#self.wfile.write("hey, today is the" + str(time.localtime()[7]))
		#self.wfile.write(" day in the year " + str(time.localtime()[0]))
		#return
		
	    #return
		
	except IOError:
	    self.send_error(404,'File Not Found: %s' % self.path)
    

    def do_POST(self):
	global rootnode
	try:
	    ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
	    if ctype == 'multipart/form-data':
		query=cgi.parse_multipart(self.rfile, pdict)
	    self.send_response(301)
	    
	    self.end_headers()
	    upfilecontent = query.get('upfile')
	    print "filecontent", upfilecontent[0]
	    self.wfile.write("<HTML>POST OK.<BR><BR>");
	    self.wfile.write(upfilecontent[0]);
	    
	except :
	    pass

def main():
    try:
	server = HTTPServer(('', 1080), MyHandler)
	print 'started httpserver...'
	server.serve_forever()
    except KeyboardInterrupt:
	print '^C received, shutting down server'
	server.socket.close()

if __name__ == '__main__':
    main()

