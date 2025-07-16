#!/bin/bash
cd /home/kavia/workspace/code-generation/flashcard-manager-90d271fd/flashcard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

