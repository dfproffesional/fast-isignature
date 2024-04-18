FROM pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-ubuntu-20.04-x86_64 as builder
FROM node:21-bullseye

RUN apt-get update &&\
    apt-get install -yq --no-install-recommends \
    sudo neovim curl git \
    libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi-dev libxtst-dev \
    libnss3 libcups2 libxss1 libxrandr2 libasound2 libatk1.0-0 libatk-bridge2.0-0  \
    libpangocairo-1.0-0 libgtk-3-0 libgbm1 chromium &&\ 
    rm -rf /var/lib/apt/lists/*

ARG USERNAME=node

COPY --from=builder /usr/local/share/pdf2htmlEX /usr/local/share/pdf2htmlEX
COPY --from=builder /usr/local/bin/pdf2htmlEX /usr/local/bin/pdf2htmlEX
COPY --from=builder /usr/lib/x86_64-linux-gnu/libjpeg.so.8.2.2 /usr/lib/x86_64-linux-gnu/libjpeg.so.8

RUN echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
RUN mkdir /app; chown $USERNAME:$USERNAME /app

USER $USERNAME

RUN sudo npm install -g pnpm tsc typescript
