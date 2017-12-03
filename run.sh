#!/usr/bin/env bash

NAME="${1%.*}"

nim compile --hints:off -o:"$NAME.out" "$NAME.nim" \
  && "$NAME.out"
