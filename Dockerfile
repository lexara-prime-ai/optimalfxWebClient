FROM rust:latest AS builder

EXPOSE 5500

LABEL Name=optimalfx_webclient Version=0.0.1

COPY . .

CMD [ "cargo", "watch", "--why", "-x", "run" ]

