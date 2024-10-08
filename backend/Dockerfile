# Use the official lightweight Ruby image.
# https://hub.docker.com/_/ruby
FROM ruby:3.3.1 AS rails-toolbox

RUN (curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | apt-key add -) && \
    echo "deb https://deb.nodesource.com/node_14.x buster main"      > /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && apt-get install -y nodejs lsb-release

RUN (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -) && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Install production dependencies.
WORKDIR /app

ARG MASTER_KEY
ENV RAILS_MASTER_KEY=${MASTER_KEY}

COPY Gemfile Gemfile.lock ./

RUN apt-get update -qq && apt-get install -y python3-distutils && apt-get install -y libpq-dev && apt-get install -y tesseract-ocr

ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/5/tessdata/

# Download and install all Tesseract language data files
RUN wget -O ${TESSDATA_PREFIX}/ara.traineddata https://github.com/tesseract-ocr/tessdata_best/raw/main/ara.traineddata \
  && wget -O ${TESSDATA_PREFIX}/msa.traineddata https://github.com/tesseract-ocr/tessdata_best/raw/main/msa.traineddata \
  && wget -O ${TESSDATA_PREFIX}/mya.traineddata https://github.com/tesseract-ocr/tessdata_best/raw/main/mya.traineddata 

# Verify installed Tesseract languages
RUN tesseract --list-langs
    
RUN gem install bundler && \
    bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle install

# Copy local code to the container image.
COPY . /app

# COPY config/master.key config/master.key

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
# Redirect Rails log to STDOUT for Cloud Run to capture
ENV RAILS_LOG_TO_STDOUT=true

# pre-compile Rails assets with master key
# RUN bundle exec rake assets:precompile


ENV RAILS_ENV=production

RUN bundle exec rake db:create
RUN bundle exec rake db:migrate
# RUN bundle exec rake db:seed

EXPOSE 8080
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "8080"]