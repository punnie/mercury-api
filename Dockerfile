FROM node:15.8.0-buster-slim

# install system tools/libs
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  git \
  && apt-get autoremove -y --force-yes \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# setup home directory
ENV APP_HOME /usr/src/app/
ENV PATH=$APP_HOME/bin:$PATH
WORKDIR $APP_HOME

COPY package.json yarn.lock $APP_HOME
RUN yarn

COPY . $APP_HOME
