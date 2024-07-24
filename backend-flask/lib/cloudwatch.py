import watchtower
import logging
from flask import request
from time import strftime

# Configuring Logger to Use CloudWatch
# logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
# console_handler = logging.StreamHandler()
# cw_handler = watchtower.CloudWatchLogHandler(log_group='cruddur')
# logger.addHandler(console_handler)
# logger.addHandler(cw_handler)
# logger.info("test log")

def init_cloudwatch(response):
  timestamp = strftime('[%Y-%b-%d %H:%M]')
  logger.error('%s %s %s %s %s %s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, response.status)
  return response

  #@app.after_request
  #def after_request(response):
  #  init_cloudwatch(response)